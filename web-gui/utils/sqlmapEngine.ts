export const extractSqlmapFindings = (rawOutput: string) => {
  const lines = rawOutput.split('\n');
  
  // Look for the critical "payload" and "type" lines in sqlmap output
  const vulnerablePoints = lines.filter(l => l.includes('Payload:') || l.includes('Type:'));
  const dbmsInfo = lines.find(l => l.includes('back-end DBMS:')) || 'Unknown';
  
  return {
    tool: 'sqlmap',
    dbms: dbmsInfo.trim(),
    findings: vulnerablePoints.slice(0, 20),
    isVulnerable: vulnerablePoints.length > 0
  };
};