window.AIAnalysisEngine = (() => {
  const severityWeights = { Critical: 100, High: 78, Medium: 52, Low: 28 };
  const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)));
  const getAsset = (id) => CYBER_DATA.assets.find((asset) => asset.id === id);
  const getFinding = (id) => CYBER_DATA.findings.find((finding) => finding.id === id);
  const getNode = (id) => CYBER_DATA.nodes.find((node) => node.id === id);
  const getEdge = (id) => CYBER_DATA.edges.find((edge) => edge.id === id);

  function scoreFinding(finding) {
    const asset = getAsset(finding.assetId);
    const exposure = asset.exposure === 'Internet' ? 100 : asset.exposure === 'Internal' ? 62 : 38;
    const privilege = { None: 100, Low: 88, User: 65, Admin: 35 }[finding.privilegeRequired] || 55;
    return clamp(severityWeights[finding.severity] * .24 + finding.exploitability * .22 + asset.criticality * .2 + exposure * .12 + finding.impact * .12 + finding.confidence * .1 - finding.existingControls * .08 + (100 - privilege) * .04);
  }

  function findPaths() {
    const paths = [];
    const visit = (current, nodeIds, edgeIds) => {
      const node = getNode(current);
      if (node?.type === 'Target' && nodeIds.length > 2) {
        const nodes = nodeIds.map(getNode);
        const edges = edgeIds.map(getEdge);
        const findings = nodes.filter((item) => item.findingId).map((item) => getFinding(item.findingId));
        const asset = node.assetId ? getAsset(node.assetId) : null;
        const score = clamp(nodes.reduce((sum, item) => sum + item.risk, 0) / nodes.length * .56 + edges.reduce((sum, item) => sum + item.riskContribution, 0) * .7 + (asset?.criticality || 50) * .22 - findings.reduce((sum, item) => sum + item.existingControls, 0) * .15);
        const confidence = clamp(nodes.reduce((sum, item) => sum + item.confidence, 0) / nodes.length * .6 + edges.reduce((sum, item) => sum + item.confidence, 0) / Math.max(edges.length, 1) * .4);
        paths.push({ id: `AP-${String(paths.length + 1).padStart(3, '0')}`, nodeIds, edgeIds, source: nodes[0].name, target: node.name, riskScore: score, confidence, impact: score >= 85 ? 'Critical' : score >= 65 ? 'High' : 'Medium', findings, affectedAssets: [...new Set(nodes.map((item) => item.assetId).filter(Boolean))], status: 'Active' });
        return;
      }
      CYBER_DATA.edges.filter((edge) => edge.source === current).forEach((edge) => { if (!nodeIds.includes(edge.target)) visit(edge.target, [...nodeIds, edge.target], [...edgeIds, edge.id]); });
    };
    visit('node-internet', ['node-internet'], []);
    return paths.sort((a, b) => b.riskScore - a.riskScore);
  }

  function prioritizeFindings() { return CYBER_DATA.findings.map((finding) => ({ ...finding, priorityScore: scoreFinding(finding), affectedPaths: paths().filter((path) => path.findings.some((item) => item.id === finding.id)).length })).sort((a, b) => b.priorityScore - a.priorityScore); }
  function paths() { return findPaths(); }
  function explainFinding(finding) { const scored = scoreFinding(finding); const pathCount = paths().filter((path) => path.findings.some((item) => item.id === finding.id)).length; return `${finding.title} is prioritized at ${scored}/100 because it affects ${pathCount || 'no current'} predicted attack path${pathCount === 1 ? '' : 's'}, has ${finding.exploitability}% exploitability, and targets an asset with ${getAsset(finding.assetId).criticality}% criticality.`; }
  function simulateFix(findingId) { const finding = getFinding(findingId); const before = paths(); const affected = before.filter((path) => path.findings.some((item) => item.id === findingId)); const after = before.filter((path) => !path.findings.some((item) => item.id === findingId)).map((path) => ({ ...path, riskScore: clamp(path.riskScore - 24) })); const beforeRisk = before.length ? Math.max(...before.map((path) => path.riskScore)) : 0; const afterRisk = after.length ? Math.max(...after.map((path) => path.riskScore)) : 0; return { id: `SIM-${Date.now()}`, selectedFinding: finding, beforeRisk, afterRisk, affectedPaths: affected.length, remainingPaths: after.length, residualRisk: afterRisk >= 75 ? 'High' : afterRisk >= 40 ? 'Medium' : 'Low', reduction: clamp(((beforeRisk - afterRisk) / Math.max(beforeRisk, 1)) * 100), protectedAssets: [...new Set(affected.flatMap((path) => path.affectedAssets))].map(getAsset) }; }
  function dashboardMetrics() { const ranked = prioritizeFindings(); const attackPaths = paths(); const criticalPaths = attackPaths.filter((path) => path.impact === 'Critical').length; const highValue = new Set(attackPaths.flatMap((path) => path.affectedAssets).filter((id) => getAsset(id)?.highValue)); const controlCoverage = CYBER_DATA.controls.reduce((sum, control) => sum + control.strength, 0) / Math.max(CYBER_DATA.controls.length, 1); return { criticalPaths, predictedPaths: attackPaths.length, highValueAssets: highValue.size, residualRisk: attackPaths.some((path) => path.riskScore >= 85) ? 'High' : 'Medium', attackPathReduction: clamp(controlCoverage * .5), topFinding: ranked[0], topPath: attackPaths[0] }; }
  return { paths, scoreFinding, prioritizeFindings, explainFinding, simulateFix, dashboardMetrics, getNode, getEdge, getAsset, getFinding };
})();
