// utils/niktoEngine.ts
export const extractNiktoFindings = (rawOutput: string) => {
  // Clean ANSI codes and timestamps common in Nikto output
  const lines = rawOutput.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  // Nikto findings usually start with '+ '
  const findings = lines.filter(l => l.startsWith('+'));
  
  const total = findings.length;
  
  // Identify high-priority vulnerabilities for the AI to focus on
  const criticalKeywords = [    
    'vulnerability', 'outdated', 'xss', 'sensitive', 
    'directory listing', 'remote code', 'injection', 
    'cve-', 'osvdb-', 'dangerous', 'missing'];
  const criticals = findings.filter(f => 
    criticalKeywords.some(key => f.toLowerCase().includes(key))
  );

  return {
    tool: 'nikto',
    total,
    findings: findings.slice(0, 40), // Sample for AI context window
    criticalCount: criticals.length
  };
};