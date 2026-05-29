/**
 * ha-gauge  –  HACS custom gauge card entry point.
 *
 * Registers the card with Home Assistant's custom card registry so it appears
 * in the card picker with a proper name and preview icon.
 */

import "./ha-gauge-card";
import "./ha-gauge-card-editor";
import "./ha-gauge-element";

// Register card with Home Assistant's custom card registry
(window as Window & { customCards?: Array<Record<string, unknown>> }).customCards =
  (window as Window & { customCards?: Array<Record<string, unknown>> }).customCards || [];

(window as Window & { customCards?: Array<Record<string, unknown>> }).customCards!.push({
  type: "ha-gauge-card",
  name: "HA Gauge",
  description:
    "A gauge card – functionally identical to the built-in gauge card, ready for visual customisation.",
  preview: true,
  documentationURL: "https://github.com/YOUR_GITHUB_USERNAME/ha-gauge",
});

console.info(
  "%c HA-GAUGE-CARD %c Loaded ",
  "color: #fff; background: #3498db; font-weight: bold; padding: 2px 6px; border-radius: 3px 0 0 3px;",
  "color: #3498db; background: #ecf0f1; font-weight: bold; padding: 2px 6px; border-radius: 0 3px 3px 0;"
);
