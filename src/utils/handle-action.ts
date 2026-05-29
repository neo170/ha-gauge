/**
 * Handle Lovelace card actions – ported and simplified from HA frontend.
 */

import type { ActionConfig, HomeAssistant } from "../types";
import { fireEvent } from "./helpers";

export interface ActionConfigParams {
  entity?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// ---------------------------------------------------------------------------
// Helpers that mirror HA internals
// ---------------------------------------------------------------------------

const forwardHaptic = (element: HTMLElement, type: string): void => {
  fireEvent(element, "haptic", type);
};

const navigate = (path: string, options?: { replace?: boolean }): void => {
  if (options?.replace) {
    window.history.replaceState(null, "", path);
  } else {
    window.history.pushState(null, "", path);
  }
  fireEvent(window, "location-changed", { replace: options?.replace });
};

const showConfirmationDialog = async (
  element: HTMLElement,
  hass: HomeAssistant,
  confirmation: boolean | { text?: string; title?: string; dismissText?: string; confirmText?: string; exemptions?: Array<{ user: string }> },
  userId?: string
): Promise<boolean> => {
  if (typeof confirmation === "object") {
    // Check exemptions
    if (
      confirmation.exemptions?.some((e) => e.user === userId)
    ) {
      return true;
    }
    // Try HA dialog first, fall back to window.confirm
    return new Promise<boolean>((resolve) => {
      try {
        fireEvent(element, "show-dialog", {
          dialogTag: "ha-dialog-box",
          dialogImport: () => Promise.resolve(),
          dialogParams: {
            text: confirmation.text,
            title: confirmation.title,
            dismissText: confirmation.dismissText,
            confirmText: confirmation.confirmText,
            confirm: () => resolve(true),
            cancel: () => resolve(false),
          },
        });
      } catch {
        resolve(window.confirm(confirmation.text ?? "Are you sure?"));
      }
    });
  }
  return true;
};

// ---------------------------------------------------------------------------
// Main handler (mirrors HA's handleAction)
// ---------------------------------------------------------------------------

export const handleAction = async (
  node: HTMLElement,
  hass: HomeAssistant,
  config: ActionConfigParams,
  action: string
): Promise<void> => {
  let actionConfig: ActionConfig | undefined;

  if (action === "double_tap" && config.double_tap_action) {
    actionConfig = config.double_tap_action;
  } else if (action === "hold" && config.hold_action) {
    actionConfig = config.hold_action;
  } else if (action === "tap" && config.tap_action) {
    actionConfig = config.tap_action;
  }

  if (!actionConfig) {
    actionConfig = { action: "more-info" };
  }

  // Confirmation dialog
  if (actionConfig.confirmation) {
    forwardHaptic(node, "warning");
    const confirmed = await showConfirmationDialog(
      node,
      hass,
      actionConfig.confirmation,
      hass.user?.id
    );
    if (!confirmed) return;
  }

  switch (actionConfig.action) {
    case "more-info": {
      const entityId = actionConfig.entity ?? config.entity;
      if (entityId) {
        fireEvent(node, "hass-more-info", { entityId });
      }
      break;
    }
    case "navigate":
      if (actionConfig.navigation_path) {
        navigate(actionConfig.navigation_path, {
          replace: actionConfig.navigation_replace,
        });
      }
      break;
    case "url":
      if (actionConfig.url_path) {
        window.open(actionConfig.url_path);
      }
      break;
    case "toggle":
      if (config.entity) {
        hass.callService("homeassistant", "toggle", {
          entity_id: config.entity,
        });
        forwardHaptic(node, "light");
      }
      break;
    case "perform-action":
    case "call-service": {
      const performAction =
        actionConfig.perform_action ?? actionConfig.service;
      if (!performAction) break;
      const [domain, service] = performAction.split(".", 2);
      hass.callService(
        domain,
        service,
        actionConfig.data ?? actionConfig.service_data,
        actionConfig.target
      );
      forwardHaptic(node, "light");
      break;
    }
    case "assist":
      fireEvent(node, "show-voice-command-dialog", {
        pipeline_id: actionConfig.pipeline_id ?? "last_used",
        start_listening: actionConfig.start_listening ?? false,
      });
      break;
    case "fire-dom-event":
      fireEvent(node, "ll-custom", actionConfig);
      break;
    default:
      break;
  }
};
