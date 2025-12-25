// utils/subfinderEngine.ts

export const analyzeSubdomains = (rawOutput: string) => {
  // Clean ANSI codes and split into lines
  const lines = rawOutput.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0 && l.includes('.')); // Ensure they look like domains

  const total = lines.length;

  // Keywords that usually indicate higher risk/interest
  const highInterestKeywords = ['api', 'dev', 'staging', 'test', 'vpn', 'admin', 'git', 'jenkins', 'portal', 'internal', 'db', 'ssh'];
  
  const highInterest = lines.filter(sub => 
    highInterestKeywords.some(key => sub.toLowerCase().includes(key))
  );

  // Take the first 30 high interest and a sample of 20 others to keep the AI prompt focused
  const sampleForAi = [
    ...highInterest.slice(0, 30),
    ...lines.filter(l => !highInterest.includes(l)).slice(0, 20)
  ];

  return {
    total,
    highInterestCount: highInterest.length,
    listForAi: sampleForAi.join('\n'),
    fullList: lines.join('\n')
  };
};