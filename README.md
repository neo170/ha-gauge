# ha-gauge

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

A HACS Lovelace custom card that is functionally **identical** to the built-in Home Assistant gauge card.  
It serves as a starting point for visual customisation without touching the HA core.

## Installation via HACS

1. Open HACS in your Home Assistant instance.
2. Go to **Frontend** → **⋮** → **Custom repositories**.
3. Add `https://github.com/neo170/ha-gauge` as a **Lovelace** repository.
4. Install **HA Gauge** from HACS.
5. Add the resource (HACS does this automatically for most setups).

## Manual installation

1. Download `dist/ha-gauge.js` from the [latest release](https://github.com/neo170/ha-gauge/releases/latest).
2. Copy it to `config/www/ha-gauge.js`.
3. Add a resource entry in your Lovelace configuration:

```yaml
resources:
  - url: /local/ha-gauge.js
    type: module
```

## Usage

```yaml
type: custom:ha-gauge-card
entity: sensor.temperature
```

## Configuration

All options are identical to the [built-in gauge card](https://www.home-assistant.io/dashboards/gauge/).

| Option            | Type                | Default  | Description                                         |
| ----------------- | ------------------- | -------- | --------------------------------------------------- |
| `entity`          | string              | Required | Entity ID to display                                |
| `attribute`       | string              | –        | Attribute of the entity to display                  |
| `name`            | string              | –        | Card title (defaults to entity friendly name)       |
| `unit`            | string              | –        | Unit of measurement override                        |
| `min`             | number              | `0`      | Minimum value of the gauge                          |
| `max`             | number              | `100`    | Maximum value of the gauge                          |
| `needle`          | boolean             | `false`  | Show a needle instead of a filled arc               |
| `severity`        | map                 | –        | Legacy severity colour thresholds (green/yellow/red)|
| `segments`        | list                | –        | Colour segments with `from`, `color`, `label`       |
| `theme`           | string              | –        | HA theme name to apply                              |
| `tap_action`      | action              | more-info| Action on tap                                       |
| `hold_action`     | action              | –        | Action on hold                                      |
| `double_tap_action` | action            | –        | Action on double-tap                                |

### Severity example

```yaml
type: custom:ha-gauge-card
entity: sensor.cpu_percent
min: 0
max: 100
severity:
  green: 0
  yellow: 50
  red: 80
```

### Segments example

```yaml
type: custom:ha-gauge-card
entity: sensor.air_quality_index
min: 0
max: 500
needle: true
segments:
  - from: 0
    color: "#00e400"
    label: Good
  - from: 51
    color: "#ffff00"
    label: Moderate
  - from: 101
    color: "#ff7e00"
    label: Unhealthy (Sensitive)
  - from: 151
    color: "#ff0000"
    label: Unhealthy
  - from: 201
    color: "#8f3f97"
    label: Very Unhealthy
  - from: 301
    color: "#7e0023"
    label: Hazardous
```

## Development

```bash
# Install dependencies
npm install

# Build once
npm run build

# Build and watch for changes
npm run watch
```

The compiled file is written to `dist/ha-gauge.js`.

## Licence

MIT
