/**
 * ha-gauge-card  –  HACS custom gauge card.
 *
 * Functionally identical to the built-in Home Assistant gauge card.
 * Card type: custom:ha-gauge-card
 */

import type { PropertyValues } from "lit";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";

import type {
  GaugeCardConfig,
  HassEntity,
  HomeAssistant,
  LevelDefinition,
  LovelaceCard,
  LovelaceCardEditor,
} from "./types";
import { actionHandler } from "./utils/action-handler";
import { handleAction } from "./utils/handle-action";
import {
  applyThemesOnElement,
  computeEntityUnitDisplay,
  createEntityNotFoundWarning,
  findEntities,
  hasAction,
  hasAnyAction,
  hasConfigOrEntityChanged,
  isValidEntityId,
} from "./utils/helpers";

import { DEFAULT_MIN, DEFAULT_MAX } from "./constants";
// Re-export so the editor can import them from here without a circular dep
export { DEFAULT_MIN, DEFAULT_MAX } from "./constants";

// Make sure sub-elements are registered
import "./ha-gauge-element";
import "./ha-gauge-card-editor";

export const severityMap: Record<string, string> = {
  red: "var(--error-color)",
  green: "var(--success-color)",
  yellow: "var(--warning-color)",
  normal: "var(--info-color)",
};

const UNAVAILABLE = "unavailable";

// ---------------------------------------------------------------------------
// Card element
// ---------------------------------------------------------------------------

@customElement("ha-gauge-card")
export class HaGaugeCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("ha-gauge-card-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ): GaugeCardConfig {
    const includeDomains = ["counter", "input_number", "number", "sensor"];
    const entityFilter = (stateObj: HassEntity): boolean =>
      !isNaN(Number(stateObj.state));

    const foundEntities = findEntities(
      hass,
      1,
      entities,
      entitiesFallback,
      includeDomains,
      entityFilter
    );

    return { type: "custom:ha-gauge-card", entity: foundEntities[0] || "" };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GaugeCardConfig;

  public getCardSize(): number {
    return 4;
  }

  public setConfig(config: GaugeCardConfig): void {
    if (!config.entity) {
      throw new Error("Entity must be specified");
    }
    if (!isValidEntityId(config.entity)) {
      throw new Error("Invalid entity");
    }
    this._config = { min: DEFAULT_MIN, max: DEFAULT_MAX, ...config };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const stateObj = this.hass.states[this._config.entity];

    if (!stateObj) {
      return html`
        <hui-warning .hass=${this.hass}>
          ${createEntityNotFoundWarning(this.hass, this._config.entity)}
        </hui-warning>
      `;
    }

    if (stateObj.state === UNAVAILABLE) {
      return html`
        <hui-warning>
          ${this.hass.localize(
            "ui.panel.lovelace.warning.entity_unavailable",
            { entity: this._config.entity }
          )}
        </hui-warning>
      `;
    }

    let parts: Array<{ type: string; value: string }>;
    if (this._config.attribute) {
      parts = this.hass.formatEntityAttributeValueToParts(
        stateObj,
        this._config.attribute
      );
    } else {
      parts = this.hass.formatEntityStateToParts(stateObj);
    }

    const valueToDisplay = parts.find((part) => part.type === "value")?.value;
    const value = this._config.attribute
      ? stateObj.attributes[this._config.attribute]
      : stateObj.state;

    if (isNaN(Number(value))) {
      return html`
        <hui-warning>
          ${this.hass.localize(
            this._config.attribute
              ? "ui.panel.lovelace.warning.attribute_not_numeric"
              : "ui.panel.lovelace.warning.entity_non_numeric",
            {
              entity: this._config.entity,
              attribute: this._config.attribute,
            }
          )}
        </hui-warning>
      `;
    }

    const name = this.hass.formatEntityName(stateObj, this._config.name);
    const unit =
      computeEntityUnitDisplay(this.hass, stateObj, this._config) ?? "";

    return html`
      <ha-card
        class=${classMap({
          action: hasAnyAction(this._config),
        })}
        @action=${this._handleAction}
        .actionHandler=${actionHandler({
          hasHold: hasAction(this._config.hold_action),
          hasDoubleClick: hasAction(this._config.double_tap_action),
        })}
        tabindex=${ifDefined(
          !this._config.tap_action || hasAction(this._config.tap_action)
            ? "0"
            : undefined
        )}
      >
        <ha-gauge-element
          .min=${this._config.min!}
          .max=${this._config.max!}
          .value=${Number(value)}
          .valueText=${valueToDisplay}
          .locale=${this.hass!.locale}
          .label=${unit}
          style=${styleMap({
            "--gauge-color": this._computeSeverity(Number(value)),
          })}
          .needle=${this._config!.needle}
          .levels=${this._config!.needle ? this._severityLevels() : undefined}
        ></ha-gauge-element>
        <p class="title" .title=${name}>${name}</p>
      </ha-card>
    `;
  }

  protected shouldUpdate(changedProps: PropertyValues<this>): boolean {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (!this._config || !this.hass) return;

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    const oldConfig = changedProps.get("_config") as GaugeCardConfig | undefined;

    if (
      !oldHass ||
      !oldConfig ||
      oldHass.themes !== this.hass.themes ||
      oldConfig.theme !== this._config.theme
    ) {
      applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
  }

  private _computeSeverity(numberValue: number): string | undefined {
    if (this._config!.needle) return undefined;

    // New segments format
    const segments = this._config!.segments;
    if (segments) {
      const sorted = [...segments].sort((a, b) => a.from - b.from);
      for (let i = 0; i < sorted.length; i++) {
        const segment = sorted[i];
        if (
          segment &&
          numberValue >= segment.from &&
          (i + 1 === sorted.length || numberValue < sorted[i + 1]?.from)
        ) {
          return segment.color;
        }
      }
      return severityMap.normal;
    }

    // Legacy severity format
    const sections = this._config!.severity;
    if (!sections) return severityMap.normal;

    const sectionsArray = Object.keys(sections) as Array<keyof typeof sections>;
    const sortable = sectionsArray.map((severity) => [severity, sections[severity]]) as Array<
      [string, number]
    >;

    for (const severity of sortable) {
      if (severityMap[severity[0]] == null || isNaN(severity[1])) {
        return severityMap.normal;
      }
    }
    sortable.sort((a, b) => a[1] - b[1]);

    if (numberValue >= sortable[0][1] && numberValue < sortable[1][1]) {
      return severityMap[sortable[0][0]];
    }
    if (numberValue >= sortable[1][1] && numberValue < sortable[2][1]) {
      return severityMap[sortable[1][0]];
    }
    if (numberValue >= sortable[2][1]) {
      return severityMap[sortable[2][0]];
    }
    return severityMap.normal;
  }

  private _severityLevels(): LevelDefinition[] {
    // New segments format
    const segments = this._config!.segments;
    if (segments) {
      return segments.map((segment) => ({
        level: segment?.from,
        stroke: segment?.color,
        label: segment?.label,
      }));
    }

    // Legacy severity format
    const sections = this._config!.severity;
    if (!sections) {
      return [{ level: 0, stroke: severityMap.normal }];
    }

    const sectionsArray = Object.keys(sections) as Array<keyof typeof sections>;
    return sectionsArray.map((severity) => ({
      level: sections[severity]!,
      stroke: severityMap[severity],
    }));
  }

  private _handleAction(ev: CustomEvent): void {
    handleAction(this, this.hass!, this._config!, ev.detail.action!);
  }

  static styles = css`
    ha-card {
      height: 100%;
      overflow: hidden;
      padding: var(--ha-space-3, 12px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      box-sizing: border-box;
    }

    ha-card.action {
      cursor: pointer;
    }

    ha-card:focus {
      outline: none;
    }

    .title {
      width: 100%;
      font-size: var(--ha-font-size-m, 1rem);
      line-height: var(--ha-line-height-expanded, 1.5);
      margin: 0;
      text-align: center;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: none;
      color: var(--primary-text-color);
    }

    ha-gauge-element {
      width: 100%;
      max-width: 250px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-gauge-card": HaGaugeCard;
  }
}
