To use this in your GitHub repository or documentation, copy the raw code block below. I have preserved all the technical specifications, commands, and structural hierarchy from your Vue code while formatting it for high-impact Markdown readability.

```markdown
# C2_DOCS // Operational_Interface v3.0

> **EDUCATION_EDITION | RESTRICTED_ACCESS**
> The C2Toolkits Framework is a sophisticated wrapper for industry-standard security tools, augmented by local Large Language Models (LLM) for automated vulnerability interpretation.

---

## 00. System_Requirements

| Specification | Minimum_Spec | Recommended_Spec |
| :--- | :--- | :--- |
| **OS** | Linux (Ubuntu/Kali) | Kali Linux 2024+ |
| **RAM** | 8GB | 16GB+ |
| **GPU** | 4GB VRAM (or fast CPU) | 8GB+ VRAM (NVIDIA) |
| **Node.js** | v18.x | v20.x+ |
| **Storage** | 10GB | 20GB NVMe |

---

## 01. Logic_Architecture



The system operates on a three-tier operational data flow:

1.  **Frontend:** Reactive Vue 3 + Tailwind UI for real-time log streaming.
2.  **Nitro_Core:** Node.js server handling system-level tool integration.
3.  **Neural_API:** Ollama API bridge transforming raw logs into insights.

---

## 02. Host_Preparation

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

## 03. System_Deployment

1. **Clone Repository**
```bash
git clone [https://github.com/ch3sda/c2toolkits.git](https://github.com/ch3sda/c2toolkits.git) && cd c2toolkits

```


2. **Install Dependencies**
```bash
npm install

```


3. **Ignition**
```bash
sudo npm run dev

```


*(Note: sudo is required for Nmap raw socket access)*

---

## 04. Tool_Arsenal

| Module | Engine | Audit Capability |
| --- | --- | --- |
| **Nikto_Core** | Nikto 2.5 | Web server misconfigs & insecure files. |
| **SQLmap_Engine** | SQLmap 1.8 | Automated DB injection & takeover. |
| **Nmap_Uplink** | Nmap 7.9 | Service discovery & port vulnerability. |
| **Directory_Hose** | Gobuster | URI & DNS brute-forcing. |

---

## 05. Neural_Selection

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

## 06. Neural_Configuration

To adjust the logic engine, modify `/server/api/ai/analyze.post.ts`:

```typescript
// Modify the model parameter to switch between Qwen, DeepSeek, or Phi
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  body: JSON.stringify({
    model: "qwen2.5:7b", // Options: "deepseek-r1:8b" | "phi3.5"
    prompt: prompt,
    stream: true,
  })
});

```

> **PRO_TIP:** For advanced reasoning during CTF operations, swap to `deepseek-r1:8b`.

---

## 07. Tactical_Execution

1. Navigate to `/recon` and input your target IP or URL.
2. Initiate a **Quick Scan** to establish a baseline handshake.
3. Wait for **Standard_Output** to finalize the raw logs.
4. Trigger the **Neural Heuristic** button for AI-driven audit.

---

## 08. Debug_Protocols

* **Error: Permission Denied**
* Solution: Nmap requires raw socket access. Launch the server using `sudo npm run dev`.


* **Error: Ollama Connection Refused**
* Solution: Verify Ollama service is active. Run `systemctl status ollama`.


* **Scan Hangs / No Output**
* Solution: Check local firewall settings and ensure the target host is reachable via `ping`.



---

## Legal_Disclaimer

**Author assumes no liability for misuse.** Authorized auditing only. Misuse may result in legal action or network bans. Ensure all activities comply with local and international cyber laws.

```

Would you like me to help you create a specific `LICENSE` file or a `.gitignore` to accompany this README?

```