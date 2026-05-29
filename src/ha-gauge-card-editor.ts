/**
 * ha-gauge-card-editor  –  Visual config editor for ha-gauge-card.
 *
 * Rendered by HA's Lovelace UI when editing the card.
 * Uses <ha-form> (available at runtime in the HA frontend) to render the form.
 */

import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import {
  array,
  assert,
  assign,
  boolean,
  number,
  object,
  optional,
  string,
} from "superstruct";

import type {
  GaugeCardConfig,
  HomeAssistant,
  LovelaceCardEditor,
} from "./types";
import { DEFAULT_MAX, DEFAULT_MIN } from "./constants";
import { fireEvent } from "./utils/helpers";

// ---------------------------------------------------------------------------
// Struct validation
// ---------------------------------------------------------------------------

const gaugeSegmentStruct = object({
  from: number(),
  color: string(),
  label: optional(string()),
});

const baseLovelaceCardConfig = object({
  type: string(),
  view_layout: optional(object()),
});

const cardConfigStruct = assign(
  baseLovelaceCardConfig,
  object({
    name: optional(string()),
    entity: optional(string()),
    attribute: optional(string()),
    unit: optional(string()),
    min: optional(number()),
    max: optional(number()),
    severity: optional(object()),
    theme: optional(string()),
    needle: optional(boolean()),
    segments: optional(array(gaugeSegmentStruct)),
    tap_action: optional(object()),
    hold_action: optional(object()),
    double_tap_action: optional(object()),
  })
);

// ---------------------------------------------------------------------------
// Supported tap actions
// ---------------------------------------------------------------------------

const TAP_ACTIONS = [
  "more-info",
  "navigate",
  "url",
  "perform-action",
  "assist",
  "none",
] as const;

// ACTION_RELATED_CONTEXT tells ha-form to pass entity context into action selectors
const ACTION_RELATED_CONTEXT = { entity: "entity" } as const;

// Attribute names that are not numeric – excluded from the attribute dropdown
const NON_NUMERIC_ATTRIBUTES = [
  "fan_modes",
  "hvac_modes",
  "preset_modes",
  "source_list",
  "sound_mode_list",
  "effect_list",
  "entity_picture",
  "icon",
  "friendly_name",
  "supported_features",
  "rgb_color",
  "hs_color",
  "xy_color",
  "rgbw_color",
  "rgbww_color",
];

// ---------------------------------------------------------------------------
// Editor element
// ---------------------------------------------------------------------------

@customElement("ha-gauge-card-editor")
export class HaGaugeCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GaugeCardConfig;

  public setConfig(config: GaugeCardConfig): void {
    assert(config, cardConfigStruct);
    this._config = config;
  }

  private _schema = memoizeOne(
    (showSeverity: boolean, entityId?: string) =>
      [
        {
          name: "entity",
          selector: {
            entity: {
              domain: ["counter", "input_number", "number", "sensor"],
            },
          },
        },
        {
          name: "attribute",
          selector: {
            attribute: {
              entity_id: entityId,
              hide_attributes: NON_NUMERIC_ATTRIBUTES,
            },
          },
        },
        {
          name: "name",
          selector: { entity_name: {} },
          context: { entity: "entity" },
        },
        { name: "unit", selector: { text: {} } },
        { name: "theme", selector: { theme: {} } },
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: "min",
              default: DEFAULT_MIN,
              selector: { number: { mode: "box", step: "any" } },
            },
            {
              name: "max",
              default: DEFAULT_MAX,
              selector: { number: { mode: "box", step: "any" } },
            },
          ],
        },
        {
          name: "",
          type: "grid",
          schema: [
            { name: "needle", selector: { boolean: {} } },
            { name: "show_severity", selector: { boolean: {} } },
          ],
        },
        ...(showSeverity
          ? ([
              {
                name: "severity",
                type: "grid",
                schema: [
                  {
                    name: "green",
                    selector: { number: { mode: "box", step: "any" } },
                  },
                  {
                    name: "yellow",
                    selector: { number: { mode: "box", step: "any" } },
                  },
                  {
                    name: "red",
                    selector: { number: { mode: "box", step: "any" } },
                  },
                ],
              },
            ] as const)
          : []),
        {
          name: "interactions",
          type: "expandable",
          flatten: true,
          iconPath:
            // mdi:gesture-tap path
            "M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z",
          schema: [
            {
              name: "tap_action",
              selector: {
                ui_action: {
                  actions: TAP_ACTIONS,
                  default_action: "more-info",
                },
              },
              context: ACTION_RELATED_CONTEXT,
            },
            {
              name: "",
              type: "optional_actions",
              flatten: true,
              schema: (["hold_action", "double_tap_action"] as const).map(
                (action) => ({
                  name: action,
                  selector: {
                    ui_action: {
                      actions: TAP_ACTIONS,
                      default_action: "none" as const,
                    },
                  },
                  context: ACTION_RELATED_CONTEXT,
                })
              ),
            },
          ],
        },
      ] as const
  );

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const schema = this._schema(
      this._config!.severity !== undefined,
      this._config!.entity
    );

    const data = {
      show_severity: this._config!.severity !== undefined,
      ...this._config,
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    let config = ev.detail.value as Record<string, unknown>;

    if (config.show_severity) {
      const severity = config.severity as Record<string, number> | undefined;
      config = {
        ...config,
        severity: {
          green: (config.green as number) ?? severity?.green ?? 0,
          yellow: (config.yellow as number) ?? severity?.yellow ?? 0,
          red: (config.red as number) ?? severity?.red ?? 0,
        },
      };
    } else if (!config.show_severity && config.severity) {
      delete config.severity;
    }

    delete config.show_severity;
    delete config.green;
    delete config.yellow;
    delete config.red;

    fireEvent(this, "config-changed", { config });
  }

  private _computeLabelCallback = (schema: { name: string }): string => {
    if (!this.hass) return schema.name;

    switch (schema.name) {
      case "name":
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.generic.name"
        );
      case "entity":
        return `${this.hass.localize(
          "ui.panel.lovelace.editor.card.generic.entity"
        )} (${this.hass.localize(
          "ui.panel.lovelace.editor.card.config.required"
        )})`;
      case "max":
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.generic.maximum"
        );
      case "min":
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.generic.minimum"
        );
      case "show_severity":
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.gauge.severity.define"
        );
      case "needle":
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.gauge.needle_gauge"
        );
      case "theme":
        return `${this.hass.localize(
          "ui.panel.lovelace.editor.card.generic.theme"
        )} (${this.hass.localize(
          "ui.panel.lovelace.editor.card.config.optional"
        )})`;
      case "unit":
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.generic.unit"
        );
      case "interactions":
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.generic.interactions"
        );
      case "tap_action":
      case "hold_action":
      case "double_tap_action":
        return `${this.hass.localize(
          `ui.panel.lovelace.editor.card.generic.${schema.name}`
        )} (${this.hass.localize(
          "ui.panel.lovelace.editor.card.config.optional"
        )})`;
      case "attribute":
        return this.hass.localize(
          "ui.panel.lovelace.editor.card.generic.attribute"
        );
      default:
        // "green" | "yellow" | "red"
        return this.hass.localize(
          `ui.panel.lovelace.editor.card.gauge.severity.${schema.name}`
        );
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-gauge-card-editor": HaGaugeCardEditor;
  }
}
