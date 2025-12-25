// utils/gobusterAiEngine.ts

interface DirInsight {
  insight: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  recommendation: string;
}

const DIR_KNOWLEDGE: Record<string, DirInsight> = {
  "/.env": {
    insight: "Environment file detected. Likely contains API keys, DB credentials, or secrets.",
    severity: "CRITICAL",
    recommendation: "Action: Download immediately and check for 'AWS_SECRET', 'DB_PASSWORD', or 'JWT_SECRET'."
  },
  "/admin": {
    insight: "Administrative portal discovered.",
    severity: "HIGH",
    recommendation: "Action: Check for default credentials (admin:admin) or bypass techniques like SQL injection on login."
  },
  "/.git": {
    insight: "Git repository exposed. Entire source code can likely be reconstructed.",
    severity: "CRITICAL",
    recommendation: "Action: Use 'git-dumper' to extract the full repository and commit history."
  },
  "/config": {
    insight: "Configuration directory found. May leak system architecture or backend settings.",
    severity: "HIGH",
    recommendation: "Action: Enumerate files for .php.bak, .swp, or .old extensions."
  },
  "/phpmyadmin": {
    insight: "Database management interface detected.",
    severity: "MEDIUM",
    recommendation: "Action: Attempt common credentials and check the version for known RCE exploits."
  },
  "/backup": {
    insight: "Backup archive found. Often contains old versions of the site with known vulnerabilities.",
    severity: "HIGH",
    recommendation: "Action: Search for .zip, .tar.gz, or .sql files within this path."
  },
  "/cgi-bin": {
    insight: "CGI directory detected. Potential for Shellshock (CVE-2014-6271) or script injection.",
    severity: "HIGH",
    recommendation: "Action: Scan specifically for .sh, .pl, or .cgi files and test for command injection."
  },
  "/crossdomain.xml": {
    insight: "Flash Cross-domain policy file found.",
    severity: "MEDIUM",
    recommendation: "Action: Check if 'allow-access-from domain=\"*\"' is present; it allows cross-origin data theft."
  },
  "/CVS": {
    insight: "Concurrent Versions System (CVS) metadata found.",
    severity: "HIGH",
    recommendation: "Action: Check /CVS/Entries or /CVS/Root to map the internal repository structure."
  },
  "/secured": {
    insight: "Explicitly named 'secured' directory found. Usually hides sensitive dev tools or login portals.",
    severity: "MEDIUM",
    recommendation: "Action: Brute-force this specific subdirectory for deeper hidden paths."
  },
  "/favicon.ico": {
    insight: "Standard icon file. (Heuristic: Icon hashes can identify specific CMS versions).",
    severity: "INFO",
    recommendation: "Action: Compare md5 hash of this icon against known CMS databases."
  }
};

export const analyzeGobusterOutput = (rawOutput: string): string => {
  // Clean ANSI escape codes (like [2K) from the string
  const cleanOutput = rawOutput.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');
  
  const matches: string[] = [];
  
  for (const [path, data] of Object.entries(DIR_KNOWLEDGE)) {
    // Check for the path and ensure it wasn't a 404
    if (cleanOutput.includes(path) && !cleanOutput.includes(`${path} (Status: 404)`)) {
      matches.push(`[${data.severity}] DETECTED: ${path}\nINSIGHT: ${data.insight}\nREC: ${data.recommendation}`);
    }
  }

  return matches.length > 0 
    ? matches.join("\n\n---\n\n") 
    : "Analysis complete. No high-risk signatures matched in this buffer.";
};