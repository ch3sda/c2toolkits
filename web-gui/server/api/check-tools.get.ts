// server/api/check-tools.get.ts
import { execSync } from 'child_process';

export default defineEventHandler((event) => {
  // List of binary names to check (matching your shell script)
  const tools = [
    "nmap", "gobuster", "sqlmap", "nikto", "subfinder", "whois"
  ];

  const status: Record<string, boolean> = {};

  tools.forEach(tool => {
    try {
      // Runs 'which tool' on your machine
      execSync(`which ${tool}`);
      status[tool] = true;
    } catch {
      status[tool] = false;
    }
  });

  return status;
});