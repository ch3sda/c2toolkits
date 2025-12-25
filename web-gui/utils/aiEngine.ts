// utils/aiEngine.ts

interface AIInsight {
  insight: string;
  next_step: string;
  cve_ref: string;
  category?: 'Web' | 'Database' | 'Remote' | 'Admin' | 'Auth' | 'Dev'; // Added for future UI logic
}

const KNOWLEDGE_BASE: Record<string, AIInsight> = {
  // --- WEB SERVICES ---
  "80/tcp": {
    insight: "Standard HTTP Web Server detected.",
    next_step: "Action: Directory busting (ffuf/gobuster), check robots.txt, and scan for outdated CMS (WPScan/JoomScan).",
    cve_ref: "Reference: CVE-2021-41773 (Apache Path Traversal).",
    category: 'Web'
  },
  "443/tcp": {
    insight: "Encrypted HTTPS service active.",
    next_step: "Action: Check SSL/TLS cipher suites (testssl.sh), inspect SAN for subdomains, and check for certificate transparency logs.",
    cve_ref: "Reference: Heartbleed (CVE-2014-0160).",
    category: 'Web'
  },
  "8080/tcp": {
    insight: "Common HTTP Proxy/Dev port (Jenkins, Tomcat, etc).",
    next_step: "Action: Check for default credentials on management consoles or exposed /env /actuator endpoints.",
    cve_ref: "Reference: CVE-2019-1003000 (Jenkins RCE).",
    category: 'Dev'
  },

  // --- REMOTE ACCESS ---
  "22/tcp": {
    insight: "OpenSSH service (Secure Shell).",
    next_step: "Action: Verify banner version. Check for key-based auth. Look for 'libssh' auth bypass if version is old.",
    cve_ref: "Reference: CVE-2018-10933 (libssh Auth Bypass).",
    category: 'Remote'
  },
  "23/tcp": {
    insight: "CRITICAL: Telnet protocol (Unencrypted).",
    next_step: "Action: Sniff traffic for plaintext credentials. High risk of credential interception.",
    cve_ref: "Reference: Inherently insecure protocol.",
    category: 'Remote'
  },
  "3389/tcp": {
    insight: "Microsoft Remote Desktop (RDP).",
    next_step: "Action: Check for NLA (Network Level Authentication) and check for BlueKeep vulnerability.",
    cve_ref: "Reference: BlueKeep (CVE-2019-0708).",
    category: 'Remote'
  },
  "5900/tcp": {
    insight: "VNC (Virtual Network Computing).",
    next_step: "Action: Brute-force VNC passwords. Check for 'VNC Null Authentication' variants.",
    cve_ref: "Reference: CVE-2006-2369 (RealVNC Auth Bypass).",
    category: 'Remote'
  },

  // --- DATABASES ---
  "1433/tcp": {
    insight: "MSSQL (Microsoft SQL Server).",
    next_step: "Action: Use 'sqsh' to attempt login. Try default 'sa' account. Check for xp_cmdshell enabled.",
    cve_ref: "Reference: CVE-2019-1068 (MSSQL RCE).",
    category: 'Database'
  },
  "3306/tcp": {
    insight: "MySQL/MariaDB Database.",
    next_step: "Action: Check for root login with no password. Enumerate databases with 'nmap --script mysql-enum'.",
    cve_ref: "Reference: CVE-2012-2122 (MySQL Auth Bypass).",
    category: 'Database'
  },
  "5432/tcp": {
    insight: "PostgreSQL Database.",
    next_step: "Action: Check for 'postgres' user with default password or MD5 auth bypass.",
    cve_ref: "Reference: CVE-2019-9193 (Command Execution).",
    category: 'Database'
  },
  "6379/tcp": {
    insight: "Redis In-memory Database.",
    next_step: "Action: Check for password-less access. Attempt to write SSH public key to /root/.ssh/ via Redis-cli.",
    cve_ref: "Reference: Redis RCE (No CVE, architectural flaw).",
    category: 'Database'
  },
  "27017/tcp": {
    insight: "MongoDB NoSQL Database.",
    next_step: "Action: Check for unauthenticated remote access. Dump collections using 'mongo --host'.",
    cve_ref: "Reference: Global Mongo DB Ransomware attacks (Insecure defaults).",
    category: 'Database'
  },

  // --- INFRASTRUCTURE & AUTH ---
  "21/tcp": {
    insight: "FTP (File Transfer Protocol).",
    next_step: "Action: Check for Anonymous Login (anonymous:anonymous). Look for ProFTPd versions.",
    cve_ref: "Reference: CVE-2010-4221 (ProFTPd).",
    category: 'Auth'
  },
  "445/tcp": {
    insight: "SMB/Microsoft-DS (Active Directory/File Sharing).",
    next_step: "Action: Check for EternalBlue (MS17-010). Use 'smbclient -L' for null sessions.",
    cve_ref: "Reference: EternalBlue (CVE-2017-0144).",
    category: 'Auth'
  },
  "389/tcp": {
    insight: "LDAP (Lightweight Directory Access Protocol).",
    next_step: "Action: Attempt Null Bind to dump AD user lists and group memberships.",
    cve_ref: "Reference: CVE-2017-14602 (LDAP Auth Bypass).",
    category: 'Auth'
  },
  "161/udp": {
    insight: "SNMP (Simple Network Management Protocol).",
    next_step: "Action: Brute-force community strings (public, private, manager). Use 'snmp-check'.",
    cve_ref: "Reference: CVE-2017-5133 (SNMP Auth Bypass).",
    category: 'Admin'
  },

  // --- DEV TOOLS & MISC ---
  "2375/tcp": {
    insight: "Docker Remote API (Unencrypted).",
    next_step: "Action: Remote code execution. You can start a container and mount the host / root filesystem.",
    cve_ref: "Reference: Insecure Docker Configuration.",
    category: 'Dev'
  },
  "31337/tcp": {
    insight: "Backdoor signature / 'Elite' Port.",
    next_step: "Action: High probability of malware or rootkit. Perform full forensic audit of the host.",
    cve_ref: "Reference: Back Orifice / Legacy Malware port.",
    category: 'Admin'
  }
};

export const analyzeNmapOutput = (rawOutput: string): string => {
  const matches: string[] = [];
  
  // Use a cleaner regex to find open ports in the nmap table
  for (const [port, data] of Object.entries(KNOWLEDGE_BASE)) {
    // Escaping the slash in port name for regex
    const escapedPort = port.replace('/', '\\/');
    const portPattern = new RegExp(`${escapedPort}\\s+open`, 'i');
    
    if (portPattern.test(rawOutput)) {
      const categoryTag = data.category ? `[${data.category}] ` : '';
      matches.push(`${categoryTag}[TARGET: ${port}]\n${data.insight}\n${data.next_step}\n${data.cve_ref}`);
    }
  }

  return matches.length > 0 
    ? matches.join("\n\n---\n\n") 
    : "Buffer analysis complete. No high-risk signatures found in top 1000 ports. Suggesting aggressive -p- scan.";
};