# C2_DOCS // Operational_Interface v3.0

> **EDUCATION_EDITION | RESTRICTED_ACCESS**
> The C2Toolkits Framework is a sophisticated wrapper for industry-standard security tools, augmented by local Large Language Models (LLM) for automated vulnerability interpretation.

---

## 00. 🛠️ System_Requirements

| Specification | Minimum_Spec | Recommended_Spec |
| :--- | :--- | :--- |
| **OS** | Linux (Ubuntu/Kali) | Kali Linux 2024+ |
| **RAM** | 8GB | 16GB+ |
| **GPU** | 4GB VRAM (or fast CPU) | 8GB+ VRAM (NVIDIA) |
| **Node.js** | v18.x | v20.x+ |
| **Storage** | 10GB | 20GB NVMe |

---

## 01. 🏗️ Logic_Architecture

The system operates on a three-tier operational data flow:

1.  **Frontend:** Reactive Vue 3 + Tailwind UI for real-time log streaming.
2.  **Nitro_Core:** Node.js server handling system-level tool integration.
3.  **Neural_API:** Ollama API bridge transforming raw logs into insights.

---

## 02. 🚀 Host_Preparation

### A. Install Security Tools
The framework requires the following binary engines to be installed on the host system:
```bash
sudo apt update && sudo apt install -y nmap nikto sqlmap gobuster figlet

```

### B. AI Engine (Ollama)

Local LLM processing ensures zero-shot vulnerability assessment without external data leakage.

```bash
curl -fsSL [https://ollama.com/install.sh](https://ollama.com/install.sh) | sh

```

---

## 03. 📡 System_Deployment

1. **Clone Repository**

```bash
git clone https://github.com/ch3sda/c2toolkits && cd c2toolkits

```



2. **Install & Ignition**

```bash
npm install
sudo npm run dev

```

*(Note: sudo is required for Nmap raw socket access)*

---

## 04. ⚔️ Tool_Arsenal

| Module | Engine | Audit Capability |
| --- | --- | --- |
| **Nikto_Core** | Nikto 2.5 | Web server misconfigs & insecure files. |
| **SQLmap_Engine** | SQLmap 1.8 | Automated DB injection & takeover. |
| **Nmap_Uplink** | Nmap 7.9 | Service discovery & port vulnerability. |
| **Directory_Hose** | Gobuster | URI & DNS brute-forcing. |

---

## 05. 🧠 Neural_Selection

Select a model based on your hardware profile:

* **Lite_Auditor (`phi3.5`)** - *4GB VRAM*
* Fast real-time log parsing.


* **Standard_C2 (`qwen2.5:7b`)** - *8GB VRAM*
* Balanced reasoning & speed.


* **Researcher (`deepseek-r1:8b`)** - *12GB+ VRAM*
* Advanced reasoning logic for complex vulnerabilities.



```bash
ollama pull [model_tag]

```

---

## 06. 🧬 AI_Parsing_Examples

The Neural Engine converts raw terminal noise into structured attack vectors.

### Nmap Log Interpretation

**Raw Input:** `80/tcp open http Apache 2.4.41`
**AI Insight:** > ⚠️ **Critical:** Apache 2.4.41 is vulnerable to CVE-2021-41773 (Path Traversal). Recommendation: Test for `/cgi-bin/.%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd`.

### SQLmap Data Extraction

**Raw Input:** `[INFO] the back-end DBMS is MySQL >= 5.6`
**AI Insight:**

> 🔍 **Strategy:** Back-end confirmed as MySQL. Lateral movement possible via `FILE` privilege. Attempt `--os-shell` if user is `root@localhost`.

---

## 07. 🛡️ LLM_Prompt_Hardening

To prevent model hallucination and ensure strict security output, the following system prompt constraints are active:

### SYSTEM_PROMPT_PROTOCOL
- **Role:** Professional Cybersecurity Auditor.
- **Constraint:** Output MUST be in JSON format.
- **Safety:** Do not provide remediation advice unless requested.
- **Logic:** Rank vulnerabilities by CVSS v3 score only.
- **Verification:** Cross-reference port findings with known exploit-db entries.


---

## 08. 🕹️ Tactical_Execution

1. **Recon:** Navigate to `/recon` and input your target IP or URL.
2. **Handshake:** Initiate a Quick Scan to establish a baseline.
3. **Logs:** Wait for Standard_Output to finalize the raw logs.
4. **Audit:** Trigger the Neural Heuristic button for AI-driven audit.

---

## 09. 🛠️ Debug_Protocols

* **Error: Permission Denied**
* Solution: Nmap requires raw socket access. Launch the server using `sudo npm run dev`.


* **Error: Ollama Connection Refused**
* Solution: Verify Ollama service is active. Run `systemctl status ollama`.


* **Scan Hangs / No Output**
* Solution: Check local firewall settings and ensure the target host is reachable via `ping`.



---

## 🤝 Community_Contribution

Want to add a new tool?

1. Add the tool logic in `/server/utils/engines/`.
2. Define the AI parsing heuristic in `/server/api/ai/prompts/`.
3. Open a Pull Request.

---

## ⚖️ Legal_Disclaimer

**Author assumes no liability for misuse.** Authorized auditing only. Misuse may result in legal action or network bans. Ensure all activities comply with local and international cyber laws.