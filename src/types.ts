/**
 * Shared TypeScript type definitions for ha-gauge.
 * These mirror the relevant interfaces from the HA frontend.
 */

// ---------------------------------------------------------------------------
// HassEntity – defined locally to avoid a runtime dependency on
// home-assistant-js-websocket (which ships its own bundle in HA).
// ---------------------------------------------------------------------------

export interface HassEntityAttributes {
  friendly_name?: string;
  unit_of_measurement?: string;
  icon?: string;
  device_class?: string;
  state_class?: string;
  [key: string]: unknown;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributes;
  last_changed: string;
  last_updated: string;
  context: { id: string; user_id: string | null; parent_id: string | null };
}

// ---------------------------------------------------------------------------
// Locale / Translation
// ---------------------------------------------------------------------------

export interface FrontendLocaleData {
  language: string;
  number_format: string;
  time_format?: string;
  date_format?: string;
  first_weekday?: string;
  time_zone?: string;
}

// ---------------------------------------------------------------------------
// Action config
// ---------------------------------------------------------------------------

export interface ConfirmationRestrictionConfig {
  user: string;
}

export interface ConfirmationDialogParams {
  text?: string;
  title?: string;
  dismissText?: string;
  confirmText?: string;
  exemptions?: ConfirmationRestrictionConfig[];
}

export interface ActionConfig {
  action:
    | "more-info"
    | "toggle"
    | "call-service"
    | "perform-action"
    | "navigate"
    | "url"
    | "assist"
    | "fire-dom-event"
    | "none";
  [key: string]: unknown;
  entity?: string;
  navigation_path?: string;
  navigation_replace?: boolean;
  url_path?: string;
  perform_action?: string;
  /** @deprecated use perform_action */
  service?: string;
  /** @deprecated use data */
  service_data?: Record<string, unknown>;
  data?: Record<string, unknown>;
  target?: Record<string, unknown>;
  pipeline_id?: string;
  start_listening?: boolean;
  confirmation?: boolean | ConfirmationDialogParams;
}

// ---------------------------------------------------------------------------
// HomeAssistant object (minimal surface used by this card)
// ---------------------------------------------------------------------------

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  services: Record<string, Record<string, { name?: string; description?: string; description_placeholders?: Record<string, string> }>>;
  locale: FrontendLocaleData;
  localize: (key: string, values?: Record<string, unknown>) => string;
  themes: {
    default_theme: string;
    default_dark_theme: string | null;
    darkMode: boolean;
    themes: Record<string, Record<string, string>>;
  };
  user?: { id: string };
  config: { state: string };
  formatEntityStateToParts: (stateObj: HassEntity) => Array<{ type: string; value: string }>;
  formatEntityAttributeValueToParts: (stateObj: HassEntity, attribute: string) => Array<{ type: string; value: string }>;
  formatEntityName: (stateObj: HassEntity, name?: string | EntityNameItem | EntityNameItem[]) => string;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>
  ) => Promise<unknown>;
  loadBackendTranslation: (category: string) => Promise<(...args: unknown[]) => string>;
}

// ---------------------------------------------------------------------------
// Lovelace card / editor interfaces
// ---------------------------------------------------------------------------

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  getCardSize(): number;
  setConfig(config: LovelaceCardConfig): void;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

// ---------------------------------------------------------------------------
// Gauge card specific types
// ---------------------------------------------------------------------------

export type EntityNameItem =
  | { type: "name" }
  | { type: "area" }
  | { type: "device" }
  | { type: "floor" }
  | { type: "integration" };

export interface SeverityConfig {
  green?: number;
  yellow?: number;
  red?: number;
}

export interface GaugeSegment {
  from: number;
  color: string;
  label?: string;
}

export interface GaugeCardConfig extends LovelaceCardConfig {
  entity: string;
  attribute?: string;
  name?: string | EntityNameItem | EntityNameItem[];
  unit?: string;
  min?: number;
  max?: number;
  severity?: SeverityConfig;
  theme?: string;
  needle?: boolean;
  segments?: GaugeSegment[];
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// ---------------------------------------------------------------------------
// Action handler types
// ---------------------------------------------------------------------------

export interface ActionHandlerOptions {
  hasHold?: boolean;
  hasDoubleClick?: boolean;
  hasTap?: boolean;
  disabled?: boolean;
}

export interface ActionHandlerDetail {
  action: string;
}

// ---------------------------------------------------------------------------
// Level definition for the gauge element
// ---------------------------------------------------------------------------

export interface LevelDefinition {
  level: number;
  stroke: string;
  label?: string;
}
