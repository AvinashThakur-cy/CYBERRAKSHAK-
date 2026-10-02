# CYBERRAKSHAK | AI Security Copilot

## One-Line Description

CYBERRAKSHAK is an AI-driven defensive security assessment platform that helps security teams understand vulnerabilities, predict how weaknesses could combine into attack paths, simulate remediation outcomes, and prioritize the fixes that reduce the most risk.

## How To Explain It

> I built CYBERRAKSHAK, an AI security copilot and ethical-hacking assessment platform. It does more than list vulnerabilities: it connects assets, findings, privileges, accounts, and relationships to predict possible attack paths toward high-value systems. It uses an explainable risk engine to prioritize remediation and provides What-If simulations showing how fixing a weakness changes attack-path risk and residual exposure.

## The Problem

Traditional vulnerability dashboards often show isolated findings:

- A vulnerable web application
- A weak authentication setting
- An over-privileged account
- An exposed database service

The challenge is understanding how these weaknesses could combine. A medium or high finding may become extremely important when it participates in a path leading to a production database or identity system.

CYBERRAKSHAK solves this by connecting assessment data into an explainable security graph.

## Main Product Features

### 1. Security Overview

The dashboard summarizes the current security posture with:

- Security posture score
- Open findings
- Monitored assets
- Mean time to fix
- Critical attack paths
- Predicted attack paths
- High-value assets at risk
- Residual risk
- Attack-path reduction

The dashboard is connected to the local analysis engine so risk metrics are derived from assessment data.

### 2. Findings Management

The Findings workspace shows:

- Finding title
- Description
- Related asset
- Severity
- Detection time
- Priority score
- Severity filters

Findings are ranked using more than severity alone.

### 3. Attack Surface

The Attack Surface view inventories authorized assets such as:

- Web applications
- API services
- Databases
- Application services
- Identity systems

Each asset includes type, criticality, exposure, operational status, and monitored details.

### 4. Autonomous Operations

The Autonomous Ops view represents safe assessment workflows such as:

- External perimeter review
- Cloud configuration review
- Authenticated application testing

The interface shows progress and operational status. It is a frontend simulation and does not execute unauthorized scans or attacks.

### 5. Attack Path Intelligence

The Attack Paths workspace is the main differentiator.

It identifies chains such as:

```text
Internet
  -> External Web Application
  -> Authentication Weakness
  -> Standard User Account
  -> Privilege Escalation
  -> Production Administrator
  -> Production Database
```

Each path includes:

- Path ID
- Source
- Target
- Risk score
- Confidence
- Impact
- Number of steps
- Affected assets
- Associated findings
- Relationship explanations
- Remediation entry point

The graph supports:

- Path selection
- Node selection
- Relationship selection
- Risk severity styling
- Path filtering
- Node search
- Zoom
- Drag-to-pan
- Detailed path inspection

### 6. What-If Security Simulation

The simulation engine models the effect of fixing a vulnerability without touching production systems.

Example:

```text
Before:
Path risk: 100
Affected paths: 1

After fixing Authentication Weakness:
Path risk: 69
Remaining paths: 1
Residual risk: Medium
Risk reduction: 31%
```

The simulation shows:

- Selected finding
- Before risk
- After risk
- Affected paths before remediation
- Remaining paths after remediation
- Risk reduction
- Residual risk
- Recommended action
- Owner approval messaging

### 7. shrushti.ai Security Chatbot

`shrushti.ai` is the contextual security assistant inside the dashboard.

It answers using the current assessment data instead of generic chatbot responses.

Example questions:

- Which vulnerability should I fix first?
- How could an attacker potentially reach the database?
- What is the highest-risk attack path?
- What happens if I fix this vulnerability?
- Which asset has the highest exposure?
- What is the residual risk?

The assistant can guide the user to the relevant workspace view, such as Findings, Attack Paths, Assets, or Simulations.

## Technical Architecture

The current project is a static frontend prototype with a local explainable analysis layer.

```text
index.html
  -> Application shell, navigation, modals, containers

styles.css
  -> Dark enterprise cybersecurity UI, responsive layouts, graph, reports

script.js
  -> View routing, UI state, interaction handling, chatbot, report generation

data-models.js
  -> Assets, findings, attack nodes, attack edges, controls

analysis-engine.js
  -> Risk scoring, graph traversal, path ranking, explanations, simulations
```

### Technology Used

- HTML5
- CSS3
- JavaScript
- SVG graph rendering
- Lucide icons
- Local browser state with `localStorage`
- Browser Blob API for report downloads
- Deterministic rule-based intelligence engine

## Data Model

The project uses structured security objects rather than disconnected display values.

### Asset

```javascript
{
  id,
  name,
  type,
  criticality,
  exposure,
  highValue,
  status
}
```

### Finding

```javascript
{
  id,
  title,
  description,
  severity,
  assetId,
  exploitability,
  impact,
  confidence,
  privilegeRequired,
  existingControls,
  status
}
```

### Attack Node

```javascript
{
  id,
  name,
  type,
  risk,
  severity,
  description,
  findingId,
  assetId,
  confidence
}
```

### Attack Edge

```javascript
{
  id,
  source,
  target,
  relationshipType,
  riskContribution,
  confidence,
  explanation
}
```

### Attack Path

Attack paths are derived from the graph rather than stored as random static values.

```javascript
{
  id,
  source,
  target,
  nodeIds,
  edgeIds,
  riskScore,
  confidence,
  impact,
  findings,
  affectedAssets,
  status
}
```

## Risk Prioritization

A finding is not ranked only by severity.

The engine combines:

- Severity weight
- Exploitability
- Asset criticality
- Network exposure
- Potential impact
- Confidence
- Existing security controls
- Privilege requirements
- Number of affected attack paths

Conceptually:

```text
Priority score =
  severity contribution
  + exploitability contribution
  + asset criticality contribution
  + exposure contribution
  + impact contribution
  + confidence contribution
  - control coverage reduction
  - privilege difficulty adjustment
```

The result is normalized to a 0–100 score and explained in the UI.

## Attack-Path Analysis Flow

```text
Authorized scope
      -> Assessment findings
      -> Structured assets and vulnerabilities
      -> Graph nodes and relationships
      -> Path discovery
      -> Risk and confidence calculation
      -> Attack-path ranking
      -> Remediation recommendation
      -> What-If simulation
      -> Residual risk
      -> Report and dashboard update
```

## AI Design

The project currently uses a local explainable engine called `AIAnalysisEngine`.

It supports:

- Finding risk scoring
- Finding prioritization
- Attack-path generation
- Attack-path ranking
- Finding explanations
- What-If simulation
- Residual-risk calculation
- Dashboard intelligence metrics

This approach makes the prototype transparent and testable. The engine is structured so a future backend or machine-learning model can replace or enhance it.

A production version could connect through a backend API:

```text
Frontend
  -> Secure backend API
  -> AIAnalysisEngine
  -> Graph and assessment data
  -> LLM or machine-learning service
```

API keys must remain on the backend and must never be placed in frontend JavaScript.

## Security and Ethical Boundaries

CYBERRAKSHAK is designed for authorized defensive assessments.

The prototype:

- Uses approved assessment scope
- Shows guardrail status
- Supports excluded-scope concepts
- Performs graph-based simulation only
- Does not exploit systems
- Does not send payloads
- Does not perform destructive actions
- Does not scan unauthorized targets
- Does not modify production systems
- Marks remediation as simulated or pending approval

## Reports

The Reports workspace generates a security intelligence report containing:

- Current posture
- Attack-path count
- Critical-path count
- High-value asset exposure
- Residual risk
- Every predicted attack situation
- Path risk and confidence
- Related findings
- Recommended priority actions

Reports can be:

- Viewed in the browser
- Printed
- Downloaded as a text report

## Example Company Presentation

### Short Version

> CYBERRAKSHAK is an AI-driven ethical-hacking and security assessment platform. I designed it to help analysts understand not only which vulnerabilities exist, but how those vulnerabilities could combine into attack paths. The platform models assets, findings, accounts, privileges, and relationships, then calculates explainable risk and confidence scores. It also includes a What-If simulation engine that shows how fixing a vulnerability changes the attack graph and residual risk. The integrated `shrushti.ai` assistant answers security questions from the live assessment data and guides users to the correct workspace.

### Technical Version

> I built the frontend architecture using HTML, CSS, and JavaScript with structured assessment models in `data-models.js` and a deterministic graph-based analysis engine in `analysis-engine.js`. The engine traverses asset and vulnerability relationships, discovers paths to high-value targets, calculates risk using severity, exploitability, exposure, criticality, impact, confidence, controls, and privilege requirements, and ranks findings by path impact. I implemented interactive SVG graph visualization, simulations, reports, responsive UI, and a contextual security chatbot.

### Security Version

> The platform is intentionally defensive. It operates only on authorized assessment data and models potential attack chains without executing exploitation. Remediation is simulated, approval-aware, and designed to help security teams choose the action that breaks the most risky paths.

## Future Improvements

For a production deployment, the next steps would be:

- Backend API
- Persistent database
- Real asset inventory integration
- Vulnerability scanner integrations
- Identity and role-based access control
- Server-side scope enforcement
- Audit logs
- Real report storage
- Secure AI gateway
- Authentication and SSO
- Advanced graph library
- ML-based path prediction
- Human approval workflow
- SIEM and ticketing integrations

## How To Run

Open `index.html` directly in a browser. No build step is currently required.

This is a frontend simulation and should be connected to a secure backend before use with real company data.
