# CYBERRAKSHAK

A static frontend prototype for an AI security copilot and authorized autonomous assessment workspace.

For a complete company presentation, architecture explanation, data model, algorithm summary, and interview-ready description, see [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md).

## Run

Open `index.html` directly in a browser. No build step is required.

## Included workflows

- Overview, autonomous operations, findings, attack surface, reports, playbooks, and settings views
- Assessment configuration with authorized-scope guardrails
- Copilot prompt composer and suggested prompts
- Search command palette with `Ctrl/Cmd + K`
- Finding severity filters
- Persistent dark/light theme toggle
- Responsive sidebar and mobile layout
- Explainable Attack Path Intelligence graph
- Dynamic risk prioritization using severity, exploitability, asset criticality, exposure, impact, confidence, controls, and privilege requirements
- What-If Security Simulation with before/after risk and residual-risk calculations
- Data-aware Copilot answers for prioritization, database paths, exposure, remediation, and residual risk
- Local structured data and analysis engine in `data-models.js` and `analysis-engine.js`

This is a frontend simulation. It does not execute scans or security testing.
