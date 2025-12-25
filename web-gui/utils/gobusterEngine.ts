// utils/gobusterEngine.ts

interface DirInsight {
  insight: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  recommendation: string;
}

const DIR_KNOWLEDGE: Record<string, DirInsight> = {
  "/.env": { insight: "Environment file detected. Likely contains API keys or secrets.", severity: "CRITICAL", recommendation: "Action: Check for 'AWS_SECRET' or 'DB_PASSWORD'." },
  "/admin": { insight: "Administrative portal discovered.", severity: "HIGH", recommendation: "Action: Check for default credentials (admin:admin)." },
  "/.git": { insight: "Git repository exposed. Entire source code can likely be reconstructed.", severity: "CRITICAL", recommendation: "Action: Use 'git-dumper' to extract the full repository." },
  "/backup": { insight: "Backup archive found. Often contains old versions of the site.", severity: "HIGH", recommendation: "Action: Search for .zip, .tar.gz, or .sql files." }
};

export const analyzeGobusterOutput = (rawOutput: string): string => {
  const cleanOutput = rawOutput.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');
  const matches: string[] = [];
  
  for (const [path, data] of Object.entries(DIR_KNOWLEDGE)) {
    if (cleanOutput.includes(path) && !cleanOutput.includes(`${path} (Status: 404)`)) {
      matches.push(`[${data.severity}] DETECTED: ${path}\nINSIGHT: ${data.insight}\nREC: ${data.recommendation}`);
    }
  }

  return matches.length > 0 
    ? "--- INSTANT HEURISTIC MATCHES ---\n\n" + matches.join("\n\n---\n\n") 
    : "No high-risk signatures matched in instant scan. Proceeding to Deep AI Analysis...";
};