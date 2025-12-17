# C2Toolkits v2.0

> **C2Toolkits** is a curated collection of cybersecurity tools featuring both **CLI** and **Web GUI** interfaces, designed for educational purposes, laboratory research, and structured learning environments.

**Author:** `@ch3sda`  
**Repository:** https://github.com/ch3sda/c2toolkits

### Legal and Ethical Considerations

Users must obtain **explicit written permission** before conducting security assessments on any systems, networks, or applications they do not own. Unauthorized access to computer systems is illegal in most jurisdictions.

This toolkit should only be used in:

- Personal laboratory environments
- Authorized educational settings
- Professional engagements with proper contracts and permissions
- Bug bounty programs with defined scope

---

## 📌 Overview

C2Toolkits provides an organized framework for cybersecurity tooling through two complementary interfaces:

- **CLI (Bash-based):** Traditional terminal-driven tools for encoding, ciphers, and reconnaissance.
- **Web GUI (Nuxt + Vue 3):** A modern, neon-themed browser interface offering interactive workflows and visual feedback.

The project focuses on **learning and methodology**, not automation or exploitation.

---

## 🗂 Project Structure

| Directory  | Purpose                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| `encode/`  | Encoding utilities, cipher tools, and rotation algorithms                |
| `recon/`   | Recon frameworks: nmap, gobuster, ffuf, nuclei                            |
| `tools/`   | Auxiliary Linux utilities and helper scripts                              |
| `web-gui/` | Web-based graphical interface (Nuxt + Vue 3)                              |
| `docs/`    | Documentation, usage guides, and visual references                        |

---

## ✨ Key Features (v2.0)

- **Dual Interface:** Use tools via CLI or Web GUI
- **Interactive Web UI:** Floating cards, animated lighting, and real-time output
- **Preset Configurations:** Quick-start modes with sensible defaults
- **Advanced Parameters:** Full control for experienced users
- **Educational Design:** Emphasis on understanding tools, not blind execution
- **Kali Optimized:** Designed and tested primarily on Kali Linux

---

## 🎯 Educational Scope

### This Project IS:

- ✅ Educational and lab-focused
- ✅ Suitable for CTFs and learning environments
- ✅ Documentation-driven
- ✅ Methodology-oriented

### This Project IS NOT:

- ❌ An automated exploitation framework
- ❌ A one-click penetration testing solution
- ❌ Intended for unauthorized use
- ❌ A replacement for legal authorization

---

## ⚙️ System Requirements

### CLI Requirements

- **OS:** Kali Linux (recommended) or Debian-based distributions
- **Shell:** Bash
- **Privileges:** sudo / root access

### Web GUI Requirements

- **Node.js:** v18+ recommended
- **npm:** v9+

Verify installation:

```bash
node -v
npm -v
```
## 🌐 Web GUI Setup (v2.0)

```bash
cd web-gui
npm install
npm run dev
```
Access the GUI at `http://localhost:3000` in your web browser.
## ⚙️ System Requirements

### Prerequisites

- **Operating System:** Kali Linux (recommended) or Debian-based distribution
- **Privileges:** Root or sudo access for tool installation
- **Terminal:** Bash shell environment

### Installation

```bash
# Update package repositories
sudo apt update

# Install required dependencies
sudo apt install figlet nmap gobuster ffuf nuclei -y
```

### Verification

After installation, verify tools are accessible:

```bash
# Check tool versions
nmap --version
gobuster version
ffuf -V
nuclei -version
```

---

## 📚 Getting Started

1. **Clone the repository:**

```bash
   git clone https://github.com/ch3sda/c2toolkits.git
   cd c2toolkits
```

2. **navigate to tools (e.g. encode):**

```bash
   cd encode
```

3. **Launch the specific tool:**

```bash
    bash./cryptme.sh
```

4. **Review documentation:**

```bash
   cd docs/
   cat README.md
```

---

## 🔒 Responsible Disclosure

If you discover security vulnerabilities or have suggestions for improving the educational value of this toolkit, please report them through the GitHub repository's issue tracker.

---

## 📖 Additional Resources

- **Kali Linux Documentation:** https://www.kali.org/docs/
- **NMAP Reference Guide:** https://nmap.org/book/
- **OWASP Testing Guide:** https://owasp.org/www-project-web-security-testing-guide/

---

**Disclaimer:** The author and contributors assume no liability for misuse of this toolkit. Users are solely responsible for ensuring their activities comply with applicable laws and regulations.
