// utils/nmapEngine.ts

export const extractNmapFeatures = (rawOutput: string) => {
  // Regex to capture Port, Protocol, State, and Service/Version details
  const portRegex = /(\d+)\/(tcp|udp)\s+(\w+)\s+(.*)/g;
  const matches = [...rawOutput.matchAll(portRegex)];
  
  const findings = matches.map(m => ({
    port: m[1],
    protocol: m[2],
    state: m[3],
    service_info: m[4].trim()
  }));

  // Look for OS clues
  const osGuess = rawOutput.match(/Aggressive OS guesses: (.*)|OS details: (.*)/i);
  
  // Return structured data for the LLM
  return {
    tool: 'nmap',
    findings: {
      discovered_ports: findings,
      os_prediction: osGuess ? (osGuess[1] || osGuess[2]) : "Not detected",
      raw_snippet: rawOutput.length > 1000 ? rawOutput.substring(0, 1000) + "..." : rawOutput
    }
  };
};

// Keep this for compatibility with your component, but it now just acts as a pass-through
// The actual logic is handled by the server-side LLM call
export const analyzeNmapOutput = (rawOutput: string) => {
  return "FEATURE_EXTRACTION_COMPLETE. INITIALIZING LLM INFERENCE...";
};