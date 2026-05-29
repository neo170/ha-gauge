/**
 * Miscellaneous helper utilities – ported / simplified from the HA frontend.
 */

import type { HassEntity, ActionConfig, GaugeCardConfig, HomeAssistant, FrontendLocaleData } from "../types";

// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------

export const fireEvent = (
  node: EventTarget,
  type: string,
  detail?: unknown,
  options?: { bubbles?: boolean; cancelable?: boolean; composed?: boolean }
): CustomEvent => {
  const event = new CustomEvent(type, {
    bubbles: options?.bubbles ?? true,
    cancelable: options?.cancelable ?? false,
    composed: options?.composed ?? true,
    detail,
  });
  node.dispatchEvent(event);
  return event;
};

// ---------------------------------------------------------------------------
// Entity helpers
// ---------------------------------------------------------------------------

/** Simple domain.object_id validation that matches HA's implementation. */
export const isValidEntityId = (entityId: string): boolean =>
  /^(\w+)\.(\w+)$/.test(entityId);

/**
 * Computes the display unit for an entity (ported from HA frontend).
 * Returns config.unit if set, otherwise derives from entity state parts.
 */
export const computeEntityUnitDisplay = (
  hass: HomeAssistant,
  stateObj: HassEntity | undefined,
  config: { entity: string; attribute?: string; unit?: string }
): string => {
  if (!stateObj) return "";

  // Explicit unit in config takes precedence
  if (config.unit) return config.unit;

  const parts = config.attribute
    ? hass.formatEntityAttributeValueToParts(stateObj, config.attribute)
    : hass.formatEntityStateToParts(stateObj);

  return parts.find((part) => part.type === "unit")?.value ?? "";
};

/**
 * Find entities suitable as defaults for a card stub config.
 * Ported from HA frontend's findEntities utility.
 */
export const findEntities = (
  hass: HomeAssistant,
  maxEntities: number,
  entities: string[],
  entitiesFallback: string[],
  includeDomains?: string[],
  entityFilter?: (stateObj: HassEntity) => boolean
): string[] => {
  const result: string[] = [];
  const candidates = [...entities, ...entitiesFallback];

  for (const entityId of candidates) {
    if (result.length >= maxEntities) break;
    const stateObj = hass.states[entityId];
    if (!stateObj) continue;
    if (includeDomains) {
      const domain = entityId.split(".")[0];
      if (!includeDomains.includes(domain)) continue;
    }
    if (entityFilter && !entityFilter(stateObj)) continue;
    result.push(entityId);
  }

  if (result.length < maxEntities) {
    for (const [entityId, stateObj] of Object.entries(hass.states)) {
      if (result.length >= maxEntities) break;
      if (result.includes(entityId)) continue;
      if (includeDomains) {
        const domain = entityId.split(".")[0];
        if (!includeDomains.includes(domain)) continue;
      }
      if (entityFilter && !entityFilter(stateObj)) continue;
      result.push(entityId);
    }
  }

  return result;
};

/**
 * Creates the entity-not-found warning message.
 * Tries to use hass.localize; falls back to a plain English string.
 */
export const createEntityNotFoundWarning = (
  hass: HomeAssistant,
  entityId: string
): string =>
  hass.localize
    ? hass.localize("ui.panel.lovelace.warning.entity_not_found", {
        entity: entityId,
      })
    : `Entity not found: ${entityId}`;

// ---------------------------------------------------------------------------
// shouldUpdate helper
// ---------------------------------------------------------------------------

import type { PropertyValues } from "lit";

export const hasConfigOrEntityChanged = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: any,
  changedProps: PropertyValues
): boolean => {
  if (changedProps.has("_config")) return true;

  const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
  if (!oldHass || !element.hass || !element._config) return true;

  const entityId = element._config.entity;
  return (
    oldHass.states[entityId] !== element.hass.states[entityId] ||
    oldHass.localize !== element.hass.localize ||
    oldHass.locale !== element.hass.locale ||
    oldHass.themes !== element.hass.themes
  );
};

// ---------------------------------------------------------------------------
// Action helpers
// ---------------------------------------------------------------------------

export const hasAction = (config?: ActionConfig): boolean =>
  config !== undefined && config.action !== "none";

export const hasAnyAction = (config: {
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}): boolean =>
  hasAction(config.tap_action) ||
  hasAction(config.hold_action) ||
  hasAction(config.double_tap_action);

// ---------------------------------------------------------------------------
// Theming
// ---------------------------------------------------------------------------

/**
 * Simplified port of HA's applyThemesOnElement.
 * Applies CSS custom properties from the named theme onto the element.
 */
export const applyThemesOnElement = (
  element: HTMLElement,
  themes: HomeAssistant["themes"],
  themeName?: string
): void => {
  if (!themeName || !themes?.themes?.[themeName]) return;
  const theme = themes.themes[themeName];
  for (const [key, value] of Object.entries(theme)) {
    element.style.setProperty(`--${key}`, value);
  }
};

// ---------------------------------------------------------------------------
// Number formatting (ported from HA frontend)
// ---------------------------------------------------------------------------

export enum NumberFormat {
  language = "language",
  system = "system",
  comma_decimal = "comma_decimal",
  decimal_comma = "decimal_comma",
  space_comma = "space_comma",
  quote_decimal = "quote_decimal",
  none = "none",
}

const numberFormatToLocale = (
  localeOptions: FrontendLocaleData
): string | string[] | undefined => {
  switch (localeOptions.number_format) {
    case NumberFormat.comma_decimal:
      return ["en-US", "en"];
    case NumberFormat.decimal_comma:
      return ["de", "es", "it"];
    case NumberFormat.space_comma:
      return ["fr", "sv", "cs"];
    case NumberFormat.quote_decimal:
      return ["de-CH"];
    case NumberFormat.system:
      return undefined;
    default:
      return localeOptions.language;
  }
};

const getDefaultFormatOptions = (
  num: string | number,
  options?: Intl.NumberFormatOptions
): Intl.NumberFormatOptions => {
  const defaultOptions: Intl.NumberFormatOptions = {
    maximumFractionDigits: 2,
    ...options,
  };
  if (typeof num !== "string") return defaultOptions;
  if (
    !options ||
    (options.minimumFractionDigits === undefined &&
      options.maximumFractionDigits === undefined)
  ) {
    const digits = num.indexOf(".") > -1 ? num.split(".")[1].length : 0;
    defaultOptions.minimumFractionDigits = digits;
    defaultOptions.maximumFractionDigits = digits;
  }
  return defaultOptions;
};

export const formatNumber = (
  num: string | number,
  localeOptions?: FrontendLocaleData,
  options?: Intl.NumberFormatOptions
): string => {
  const locale = localeOptions ? numberFormatToLocale(localeOptions) : undefined;
  if (
    localeOptions?.number_format !== NumberFormat.none &&
    !Number.isNaN(Number(num))
  ) {
    return new Intl.NumberFormat(
      locale,
      getDefaultFormatOptions(num, options)
    ).format(Number(num));
  }
  if (
    !Number.isNaN(Number(num)) &&
    num !== "" &&
    localeOptions?.number_format === NumberFormat.none
  ) {
    return new Intl.NumberFormat(
      "en-US",
      getDefaultFormatOptions(num, { ...options, useGrouping: false })
    ).format(Number(num));
  }
  return String(num);
};

/** Whether to insert a non-breaking space before the % sign (locale-aware). */
export const blankBeforePercent = (localeOptions: FrontendLocaleData): string => {
  switch (localeOptions.language) {
    case "cs":
    case "de":
    case "fi":
    case "fr":
    case "sk":
    case "sv":
      return "\u00a0";
    default:
      return "";
  }
};

// ---------------------------------------------------------------------------
// Render utilities
// ---------------------------------------------------------------------------

/** Runs a callback after the next browser render frame. */
export const afterNextRender = (cb: () => void): void => {
  setTimeout(() => requestAnimationFrame(() => cb()), 0);
};

// ---------------------------------------------------------------------------
// Gauge math (ported from HA frontend src/util/calculate.ts)
// ---------------------------------------------------------------------------

export const normalize = (value: number, min: number, max: number): number => {
  if (isNaN(value) || isNaN(min) || isNaN(max)) return 0;
  if (value > max) return max;
  if (value < min) return min;
  return value;
};

export const getValueInPercentage = (
  value: number,
  min: number,
  max: number
): number => {
  const newMax = max - min;
  const newVal = value - min;
  return (100 * newVal) / newMax;
};
