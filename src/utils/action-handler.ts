/**
 * Action handler directive – ported from HA frontend.
 * Provides tap / hold / double-tap gesture recognition on Lovelace cards.
 */

import type { AttributePart } from "lit";
import { noChange } from "lit";
import { customElement } from "lit/decorators.js";
import type { DirectiveParameters } from "lit/directive.js";
import { directive, Directive } from "lit/directive.js";
import type { ActionHandlerOptions } from "../types";
import { fireEvent } from "./helpers";

// ---------------------------------------------------------------------------
// Deep-equal helper (avoids re-binding when options haven't changed)
// ---------------------------------------------------------------------------

const deepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object" || a === null || b === null) return false;
  const ka = Object.keys(a as object);
  const kb = Object.keys(b as object);
  if (ka.length !== kb.length) return false;
  return ka.every((k) =>
    deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k])
  );
};

// ---------------------------------------------------------------------------
// Touch detection
// ---------------------------------------------------------------------------

const isTouch =
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

// ---------------------------------------------------------------------------
// ActionHandler element
// ---------------------------------------------------------------------------

interface ActionHandlerType extends HTMLElement {
  holdTime: number;
  bind(element: Element, options?: ActionHandlerOptions): void;
}

interface ActionHandlerElement extends HTMLElement {
  actionHandler?: {
    options: ActionHandlerOptions;
    start?: (ev: Event) => void;
    end?: (ev: Event) => void;
    handleKeyDown?: (ev: KeyboardEvent) => void;
  };
}

@customElement("ha-gauge-action-handler")
class ActionHandler extends HTMLElement implements ActionHandlerType {
  public holdTime = 500;

  protected timer?: number;
  protected held = false;
  private cancelled = false;
  private dblClickTimeout?: number;

  public connectedCallback() {
    Object.assign(this.style, {
      position: "fixed",
      width: isTouch ? "100px" : "50px",
      height: isTouch ? "100px" : "50px",
      transform: "translate(-50%, -50%) scale(0)",
      pointerEvents: "none",
      zIndex: "999",
      background: "var(--primary-color)",
      opacity: "0.2",
      borderRadius: "50%",
      transition: "transform 180ms ease-in-out",
    });

    [
      "touchcancel",
      "mouseout",
      "mouseup",
      "touchmove",
      "mousewheel",
      "wheel",
      "scroll",
    ].forEach((ev) => {
      document.addEventListener(
        ev,
        () => {
          this.cancelled = true;
          if (this.timer) {
            this._stopAnimation();
            clearTimeout(this.timer);
            this.timer = undefined;
          }
        },
        { passive: true }
      );
    });
  }

  public bind(element: ActionHandlerElement, options: ActionHandlerOptions = {}) {
    if (element.actionHandler && deepEqual(options, element.actionHandler.options)) {
      return;
    }

    if (element.actionHandler) {
      element.removeEventListener("touchstart", element.actionHandler.start!);
      element.removeEventListener("touchend", element.actionHandler.end!);
      element.removeEventListener("touchcancel", element.actionHandler.end!);
      element.removeEventListener("mousedown", element.actionHandler.start!);
      element.removeEventListener("click", element.actionHandler.end!);
      element.removeEventListener("keydown", element.actionHandler.handleKeyDown!);
    } else {
      element.addEventListener("contextmenu", (ev: Event) => {
        ev.preventDefault?.();
        ev.stopPropagation?.();
        return false;
      });
    }

    element.actionHandler = { options };

    if (options.disabled) return;

    element.actionHandler.start = (ev: Event) => {
      this.cancelled = false;
      let x: number;
      let y: number;
      if ((ev as TouchEvent).touches) {
        x = (ev as TouchEvent).touches[0].clientX;
        y = (ev as TouchEvent).touches[0].clientY;
      } else {
        x = (ev as MouseEvent).clientX;
        y = (ev as MouseEvent).clientY;
      }
      if (options.hasHold) {
        this.held = false;
        this.timer = window.setTimeout(() => {
          this._startAnimation(x, y);
          this.held = true;
        }, this.holdTime);
      }
    };

    element.actionHandler.end = (ev: Event) => {
      if (
        ev.type === "touchcancel" ||
        (ev.type === "touchend" && this.cancelled)
      ) {
        return;
      }
      const target = ev.target as HTMLElement;
      if (ev.cancelable) ev.preventDefault();
      if (options.hasHold) {
        clearTimeout(this.timer);
        this._stopAnimation();
        this.timer = undefined;
      }
      if (options.hasHold && this.held) {
        fireEvent(target, "action", { action: "hold" });
      } else if (options.hasDoubleClick) {
        if (
          (ev.type === "click" && (ev as MouseEvent).detail < 2) ||
          !this.dblClickTimeout
        ) {
          this.dblClickTimeout = window.setTimeout(() => {
            this.dblClickTimeout = undefined;
            if (options.hasTap !== false) {
              fireEvent(target, "action", { action: "tap" });
            }
          }, 250);
        } else {
          clearTimeout(this.dblClickTimeout);
          this.dblClickTimeout = undefined;
          fireEvent(target, "action", { action: "double_tap" });
        }
      } else if (options.hasTap !== false) {
        fireEvent(target, "action", { action: "tap" });
      }
    };

    element.actionHandler.handleKeyDown = (ev: KeyboardEvent) => {
      if (!["Enter", " "].includes(ev.key)) return;
      (ev.currentTarget as ActionHandlerElement).actionHandler!.end!(ev);
    };

    element.addEventListener("touchstart", element.actionHandler.start, {
      passive: true,
    });
    element.addEventListener("touchend", element.actionHandler.end);
    element.addEventListener("touchcancel", element.actionHandler.end);
    element.addEventListener("mousedown", element.actionHandler.start, {
      passive: true,
    });
    element.addEventListener("click", element.actionHandler.end);
    element.addEventListener("keydown", element.actionHandler.handleKeyDown);
  }

  private _startAnimation(x: number, y: number) {
    Object.assign(this.style, {
      left: `${x}px`,
      top: `${y}px`,
      transform: "translate(-50%, -50%) scale(1)",
    });
  }

  private _stopAnimation() {
    Object.assign(this.style, {
      left: "",
      top: "",
      transform: "translate(-50%, -50%) scale(0)",
    });
  }
}

// ---------------------------------------------------------------------------
// Singleton getter
// ---------------------------------------------------------------------------

const getActionHandler = (): ActionHandlerType => {
  const body = document.body;
  const existing = body.querySelector("ha-gauge-action-handler");
  if (existing) return existing as ActionHandlerType;
  const handler = document.createElement("ha-gauge-action-handler");
  body.appendChild(handler);
  return handler as ActionHandlerType;
};

export const actionHandlerBind = (
  element: Element,
  options?: ActionHandlerOptions
): void => {
  const handler = getActionHandler();
  if (!handler) return;
  handler.bind(element, options);
};

// ---------------------------------------------------------------------------
// Lit directive
// ---------------------------------------------------------------------------

export const actionHandler = directive(
  class extends Directive {
    update(part: AttributePart, [options]: DirectiveParameters<this>) {
      actionHandlerBind(part.element as Element, options);
      return noChange;
    }
    render(_options?: ActionHandlerOptions) {}
  }
);
