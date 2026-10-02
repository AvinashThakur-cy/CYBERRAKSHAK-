window.CYBER_DATA = {
  assets: [
    { id: 'asset-api', name: 'api.northstar.dev', type: 'Web application', criticality: 82, exposure: 'Internet', highValue: false, status: 'Healthy' },
    { id: 'asset-portal', name: 'portal.northstar.dev', type: 'Web application', criticality: 74, exposure: 'Internet', highValue: false, status: 'Healthy' },
    { id: 'asset-db', name: 'db-prod-02', type: 'Production database', criticality: 100, exposure: 'Private network', highValue: true, status: 'Needs review' },
    { id: 'asset-checkout', name: 'checkout-service', type: 'Application service', criticality: 88, exposure: 'Internal', highValue: false, status: 'Healthy' },
    { id: 'asset-iam', name: 'Northstar IAM', type: 'Identity provider', criticality: 95, exposure: 'Internet', highValue: true, status: 'Healthy' }
  ],
  findings: [
    { id: 'finding-auth', title: 'Authentication weakness', description: 'Weak authentication configuration could enable session abuse and account takeover.', severity: 'Critical', assetId: 'asset-api', exploitability: 88, impact: 92, confidence: 87, privilegeRequired: 'Low', existingControls: 28, status: 'Open' },
    { id: 'finding-db', title: 'Exposed database service', description: 'A database service is reachable from an overly broad internal network segment.', severity: 'Critical', assetId: 'asset-db', exploitability: 76, impact: 98, confidence: 91, privilegeRequired: 'Low', existingControls: 18, status: 'Open' },
    { id: 'finding-priv', title: 'Privilege escalation path', description: 'A service account has excessive permissions across production workloads.', severity: 'High', assetId: 'asset-checkout', exploitability: 73, impact: 90, confidence: 84, privilegeRequired: 'User', existingControls: 34, status: 'Open' },
    { id: 'finding-access', title: 'Broken access control', description: 'Authorization checks can be bypassed on selected API resources.', severity: 'High', assetId: 'asset-api', exploitability: 81, impact: 83, confidence: 89, privilegeRequired: 'Low', existingControls: 40, status: 'Open' },
    { id: 'finding-cookie', title: 'Weak session cookies', description: 'Session cookies are missing recommended security flags.', severity: 'Medium', assetId: 'asset-portal', exploitability: 58, impact: 61, confidence: 93, privilegeRequired: 'None', existingControls: 52, status: 'Open' }
  ],
  nodes: [
    { id: 'node-internet', name: 'Internet', type: 'Source', risk: 72, severity: 'High', description: 'External attacker entry point.', confidence: 98 },
    { id: 'node-api', name: 'External Web Application', type: 'Asset', assetId: 'asset-api', risk: 78, severity: 'High', description: 'Internet-facing Northstar API.', confidence: 96 },
    { id: 'node-auth', name: 'Authentication Weakness', type: 'Vulnerability', findingId: 'finding-auth', assetId: 'asset-api', risk: 91, severity: 'Critical', description: 'Weak authentication can provide an initial foothold.', confidence: 87 },
    { id: 'node-account', name: 'Standard User Account', type: 'Account', risk: 65, severity: 'Medium', description: 'A compromised user session with limited privileges.', confidence: 82 },
    { id: 'node-priv', name: 'Privilege Escalation', type: 'Privilege', findingId: 'finding-priv', assetId: 'asset-checkout', risk: 88, severity: 'High', description: 'Excessive service-account permissions can expand access.', confidence: 84 },
    { id: 'node-admin', name: 'Production Administrator', type: 'Account', risk: 93, severity: 'Critical', description: 'Administrative identity with production access.', confidence: 86 },
    { id: 'node-db', name: 'Production Database', type: 'Target', assetId: 'asset-db', findingId: 'finding-db', risk: 98, severity: 'Critical', description: 'High-value database containing production records.', confidence: 95 },
    { id: 'node-iam', name: 'Northstar IAM', type: 'Target', assetId: 'asset-iam', risk: 94, severity: 'Critical', description: 'Identity system controlling privileged access.', confidence: 90 }
  ],
  edges: [
    { id: 'edge-internet-api', source: 'node-internet', target: 'node-api', relationshipType: 'exposes', riskContribution: 18, confidence: 97, explanation: 'The API is publicly reachable and can be profiled from the internet.' },
    { id: 'edge-api-auth', source: 'node-api', target: 'node-auth', relationshipType: 'contains', riskContribution: 22, confidence: 90, explanation: 'The authentication weakness is present on the exposed API.' },
    { id: 'edge-auth-account', source: 'node-auth', target: 'node-account', relationshipType: 'enables', riskContribution: 24, confidence: 86, explanation: 'Weak authentication could provide a valid user session.' },
    { id: 'edge-account-priv', source: 'node-account', target: 'node-priv', relationshipType: 'enables', riskContribution: 21, confidence: 81, explanation: 'A standard session can reach a service workflow with excessive permissions.' },
    { id: 'edge-priv-admin', source: 'node-priv', target: 'node-admin', relationshipType: 'escalates to', riskContribution: 28, confidence: 83, explanation: 'The service account has a route to a production administrator role.' },
    { id: 'edge-admin-db', source: 'node-admin', target: 'node-db', relationshipType: 'accesses', riskContribution: 30, confidence: 92, explanation: 'Production administrators can access the high-value database.' },
    { id: 'edge-api-iam', source: 'node-api', target: 'node-iam', relationshipType: 'trusts', riskContribution: 20, confidence: 78, explanation: 'The API delegates identity decisions to the central IAM service.' }
  ],
  controls: [
    { id: 'control-mfa', name: 'Phishing-resistant MFA', protects: ['finding-auth', 'finding-access'], strength: 68 },
    { id: 'control-network', name: 'Database network segmentation', protects: ['finding-db'], strength: 42 },
    { id: 'control-least-privilege', name: 'Least privilege review', protects: ['finding-priv'], strength: 54 }
  ]
};
