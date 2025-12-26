<template>
  <div class="min-h-screen bg-[#0d0d12] text-white font-mono relative overflow-x-hidden selection:bg-purple-500/40">
    
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-[#1a1025] via-[#0d0d12] to-[#150e20]" />
      <div class="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.1)_1px,transparent_1px)] bg-[size:45px_45px] opacity-30" />
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] animate-pulse" />
      <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px]" />
    </div>

    <header class="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div class="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
      
      <div class="max-w-[1540px] mx-auto px-8 h-20 flex items-center justify-between relative">
        <NuxtLink to="/" class="flex items-center gap-5 group">
          <div class="relative">
            <div class="absolute inset-0 bg-purple-500 blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
            <div class="relative bg-black border border-purple-500/50 p-2.5 rounded-lg transform group-hover:rotate-90 transition-transform duration-500">
              <Terminal :size="24" class="text-purple-400" />
            </div>
          </div>
          <div class="flex flex-col">
            <span class="text-lg font-black tracking-[0.35em] uppercase italic bg-gradient-to-r from-white via-purple-200 to-white/50 bg-clip-text text-transparent">
              C2_DOCS
            </span>
            <div class="flex items-center gap-2">
              <span class="text-[9px] text-purple-500 font-bold tracking-[0.5em] uppercase">Operational_Interface</span>
              <div class="h-[1px] w-8 bg-purple-500/30"></div>
              <span class="text-[9px] text-gray-500 font-bold uppercase tracking-widest">v3.0</span>
            </div>
          </div>
        </NuxtLink>

        <div class="flex items-center gap-10">
          <nav class="hidden md:flex items-center gap-8">
            <a href="https://github.com/ch3sda/c2toolkits" target="_blank" class="group flex flex-col items-end">
              <span class="text-[10px] font-black text-gray-400 group-hover:text-purple-400 uppercase tracking-[0.2em] transition-colors">Source_Protocol</span>
              <span class="text-[8px] text-gray-600 font-bold group-hover:text-purple-500 transition-colors uppercase italic">GITHUB.IO</span>
            </a>
          </nav>

          <div class="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

          <div class="relative group cursor-help">
            <div class="flex flex-col items-end px-5 py-2 rounded-lg bg-red-500/5 border border-red-500/20 group-hover:bg-red-500/10 transition-all">
              <div class="flex items-center gap-2">
                <span class="text-[10px] text-red-400 font-black uppercase tracking-tighter">Education_Edition</span>
                <div class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              </div>
              <span class="text-[8px] text-red-500/50 font-bold uppercase italic">Restricted_Access</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse"></div>
    </header>

    <div class="relative z-10 max-w-[1540px] mx-auto flex pt-20">
      
      <aside class="hidden lg:block w-80 fixed top-20 bottom-0 border-r border-white/5 bg-black/30 backdrop-blur-sm overflow-y-auto custom-scrollbar">
        <div class="p-10 space-y-12">
          <div v-for="section in navLinks" :key="section.title">
            <div class="flex items-center gap-3 mb-6">
              <div class="h-[2px] w-6 bg-purple-500/40"></div>
              <h4 class="text-[10px] font-black text-purple-400 uppercase tracking-[0.5em] italic">{{ section.title }}</h4>
            </div>
            <ul class="space-y-1.5 ml-2 border-l border-white/5">
              <li v-for="link in section.links" :key="link.name">
                <a :href="`#${link.id}`" class="group flex items-center justify-between px-5 py-2.5 text-[11px] text-gray-500 hover:text-white transition-all duration-300 rounded-r-xl hover:bg-purple-500/10 border-l-2 border-transparent hover:border-purple-500">
                  <span class="tracking-[0.2em] uppercase font-bold">{{ link.name }}</span>
                  <span class="opacity-0 group-hover:opacity-100 transition-opacity text-purple-500 font-black">>></span>
                </a>
              </li>
            </ul>
          </div>
          
          <div class="pt-10 pb-20">
            <div class="p-5 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent border border-white/5 relative overflow-hidden group">
              <p class="text-[9px] text-gray-400 uppercase font-black mb-3 tracking-[0.3em]">System_Status</p>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                <span class="text-[10px] text-green-400 font-black uppercase tracking-widest">All_Systems_Nominal</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1 lg:ml-80 px-8 py-16 lg:px-24 max-w-5xl animate-reveal">
        
        <section id="prologue" class="mb-20">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/20 border border-purple-500/30 mb-6">
            <ShieldCheck :size="14" class="text-purple-300" />
            <span class="text-[10px] font-black text-purple-300 uppercase tracking-widest">Secure_Protocol_Active</span>
          </div>
          <h1 class="text-6xl font-black italic tracking-tighter uppercase mb-6 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
            System_Documentation
          </h1>
          <p class="text-gray-300 leading-relaxed text-lg font-medium">
            The C2Toolkits Framework is a sophisticated wrapper for industry-standard security tools, augmented by local Large Language Models (LLM) for automated vulnerability interpretation.
          </p>
        </section>

        

        <section id="specs" class="mb-20 scroll-mt-28">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Activity :size="20" class="text-purple-400" /> 00. System_Requirements
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
              <h4 class="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Minimum_Spec</h4>
              <ul class="space-y-3 text-xs font-bold text-gray-300">
                <li class="flex justify-between border-b border-white/5 pb-2"><span>OS:</span> <span class="text-white">Linux (Ubuntu/Kali)</span></li>
                <li class="flex justify-between border-b border-white/5 pb-2"><span>RAM:</span> <span class="text-white">8GB</span></li>
                <li class="flex justify-between border-b border-white/5 pb-2"><span>GPU:</span> <span class="text-white">4GB VRAM (or fast CPU)</span></li>
                <li class="flex justify-between border-b border-white/5 pb-2"><span>NODE:</span> <span class="text-white">v18.x</span></li>
              </ul>
            </div>
            <div class="p-6 bg-purple-500/5 border border-purple-500/20 rounded-2xl shadow-lg shadow-purple-500/5">
              <h4 class="text-[10px] font-black text-purple-400 uppercase mb-4 tracking-widest">Recommended_Spec</h4>
              <ul class="space-y-3 text-xs font-bold text-gray-300">
                <li class="flex justify-between border-b border-white/5 pb-2"><span>OS:</span> <span class="text-white">Kali Linux 2024+</span></li>
                <li class="flex justify-between border-b border-white/5 pb-2"><span>RAM:</span> <span class="text-white">16GB+</span></li>
                <li class="flex justify-between border-b border-white/5 pb-2"><span>GPU:</span> <span class="text-white">8GB+ VRAM (NVIDIA)</span></li>
                <li class="flex justify-between border-b border-white/5 pb-2"><span>STORAGE:</span> <span class="text-white">20GB NVMe</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section id="architecture" class="mb-20 scroll-mt-28">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Network :size="20" class="text-purple-400" /> 01. Logic_Architecture
          </h2>
          
          <div class="p-8 bg-black/40 border border-white/10 rounded-3xl overflow-hidden relative group mb-8">
            <div class="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p class="text-[10px] text-purple-400 font-black uppercase mb-8 tracking-widest">// Operational Data Flow</p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div class="p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                <h5 class="text-[10px] font-black text-white uppercase mb-2">Frontend</h5>
                <p class="text-[9px] text-gray-400">Reactive Vue 3 + Tailwind UI for real-time log streaming.</p>
              </div>
              <div class="p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                <h5 class="text-[10px] font-black text-white uppercase mb-2">Nitro_Core</h5>
                <p class="text-[9px] text-gray-400">Node.js server handling system-level tool integration.</p>
              </div>
              <div class="p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                <h5 class="text-[10px] font-black text-white uppercase mb-2">Neural_API</h5>
                <p class="text-[9px] text-gray-400">Ollama API bridge transforming logs into insights.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="env-prep" class="mb-20 scroll-mt-28">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Settings :size="20" class="text-purple-400" /> 02. Host_Preparation
          </h2>
          <div class="space-y-6">
            <p class="text-gray-400 text-xs uppercase font-bold tracking-widest">A. Install Security Tools</p>
            <div class="bg-black/60 border border-white/10 p-5 rounded-xl">
              <code class="text-sm text-gray-200">sudo apt update && sudo apt install -y nmap nikto sqlmap gobuster figlet</code>
            </div>

            <p class="text-gray-400 text-xs uppercase font-bold tracking-widest">B. AI Engine (Ollama)</p>
            <div class="bg-purple-900/10 border border-purple-500/20 p-6 rounded-2xl">
              <div class="bg-black/40 p-4 rounded-lg border border-purple-500/30 flex justify-between items-center group">
                <code class="text-purple-300 text-xs">curl -fsSL https://ollama.com/install.sh | sh</code>
                <Copy :size="14" class="text-white/20 group-hover:text-purple-400 cursor-pointer" />
              </div>
            </div>
          </div>
        </section>

        <section id="deployment" class="mb-20 scroll-mt-28">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Cpu :size="20" class="text-purple-400" /> 03. System_Deployment
          </h2>
          <div class="relative border-l-2 border-purple-500/20 ml-4 pl-8 space-y-12">
            <div class="relative">
              <div class="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div>
              <h4 class="text-xs font-black text-white uppercase mb-2 italic tracking-widest">1. Clone Repository</h4>
              <div class="bg-white/[0.03] border border-white/10 p-4 rounded-xl">
                <code class="text-purple-300 text-xs font-bold">git clone https://github.com/ch3sda/c2toolkits.git && cd c2toolkits</code>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
              <h4 class="text-xs font-black text-white uppercase mb-2 italic tracking-widest">2. Dependencies</h4>
              <div class="bg-white/[0.03] border border-white/10 p-4 rounded-xl">
                <code class="text-purple-300 text-xs font-bold">npm install</code>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-purple-500 animate-pulse"></div>
              <h4 class="text-xs font-black text-white uppercase mb-2 italic tracking-widest">3. Ignition</h4>
              <div class="bg-black border border-purple-500/50 p-4 rounded-xl shadow-lg shadow-purple-500/10">
                <code class="text-green-400 text-xs font-bold">sudo npm run dev</code>
              </div>
            </div>
          </div>
        </section>

        <section id="arsenal" class="mb-20 scroll-mt-28">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <ShieldCheck :size="20" class="text-purple-400" /> 04. Tool_Arsenal
          </h2>
          <div class="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
            <table class="w-full text-left text-[10px] uppercase tracking-tighter">
              <thead class="bg-white/5 text-purple-400">
                <tr>
                  <th class="p-4 font-black">Module</th>
                  <th class="p-4 font-black">Engine</th>
                  <th class="p-4 font-black">Audit Capability</th>
                </tr>
              </thead>
              <tbody class="text-gray-300">
                <tr v-for="tool in arsenal" :key="tool.name" class="border-b border-white/5 hover:bg-white/[0.02]">
                  <td class="p-4 font-bold italic text-white">{{ tool.name }}</td>
                  <td class="p-4 font-mono">{{ tool.engine }}</td>
                  <td class="p-4">{{ tool.audit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="ai-strategy" class="mb-20 scroll-mt-28">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Brain :size="20" class="text-purple-400" /> 05. Neural_Selection
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="model in modelRecommendations" :key="model.name" class="p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-purple-500/40 transition-all">
              <component :is="model.icon" :size="20" class="text-purple-400 mb-4" />
              <h5 class="text-xs font-black text-white uppercase mb-1">{{ model.name }}</h5>
              <p class="text-[9px] text-purple-400 font-bold mb-4">{{ model.spec }}</p>
              <div class="bg-black/40 p-2 rounded text-[10px] text-gray-400 font-mono mb-4">ollama pull {{ model.tag }}</div>
              <p class="text-[10px] text-gray-400 italic">{{ model.desc }}</p>
            </div>
          </div>
        </section>

        <section id="neural-logic" class="mb-20 scroll-mt-28">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Code :size="20" class="text-purple-400" /> 06. Neural_Heuristics
          </h2>
          <div class="bg-black/40 border border-white/10 p-6 rounded-2xl">
            <p class="text-[10px] text-gray-400 uppercase font-bold mb-4 tracking-widest">// AI analysis prompt template</p>
            <div class="bg-black/80 p-4 rounded-lg border border-purple-500/20 text-[11px] text-purple-300/80 leading-relaxed italic">
              "Analyze the following raw scan logs from Nmap/Nikto. Identify high-risk CVEs, misconfigured headers, and potential lateral movement paths. Provide a structured JSON response with severity levels."
            </div>
            <p class="mt-4 text-[10px] text-gray-500 italic">This heuristic engine allows for zero-shot vulnerability assessment without sending data to external cloud providers.</p>
          </div>
        </section>

<section id="technical" class="mb-20 scroll-mt-28">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Brain :size="20" class="text-purple-400" /> 07. Neural_Configuration
          </h2>
          <div class="space-y-6">
            <p class="text-gray-400 text-xs uppercase font-bold tracking-widest">Adjusting the Logic Engine</p>
            
            <div class="p-6 bg-white/[0.02] border border-white/10 rounded-2xl font-mono text-[11px] relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-3 text-[9px] text-purple-500/50 font-black tracking-tighter uppercase">/server/api/ai/analyze.post.ts</div>
              
              <p class="text-gray-500 mb-4">// Modify the model parameter to switch between Qwen, DeepSeek, or Phi</p>
              
              <div class="text-purple-300 leading-relaxed">
                <span class="text-gray-500">const</span> response = <span class="text-gray-500">await</span> fetch(<span class="text-green-400">'http://localhost:11434/api/generate'</span>, {<br/>
                &nbsp;&nbsp;method: <span class="text-green-400">'POST'</span>,<br/>
                &nbsp;&nbsp;body: JSON.stringify({<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-white font-bold italic">model: "qwen2.5:7b",</span> <span class="text-gray-600">// Options: "deepseek-r1:8b" | "phi3.5"</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;prompt: prompt,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;stream: <span class="text-blue-400">true</span>,<br/>
                &nbsp;&nbsp;})<br/>
                });
              </div>
            </div>

            <div class="flex items-start gap-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <Info :size="16" class="text-blue-400 shrink-0 mt-1" />
              <p class="text-[10px] text-gray-400 leading-relaxed uppercase font-bold">
                PRO_TIP: For advanced reasoning during CTF operations, swap to <span class="text-white">deepseek-r1:8b</span>. Ensure you have executed <code class="text-blue-300">ollama pull [model]</code> before updating the code.
              </p>
            </div>
          </div>
        </section>

        <section id="usage" class="mb-20 scroll-mt-28">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Zap :size="20" class="text-purple-400" /> 08. Tactical_Execution
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="(step, index) in steps" :key="index" class="flex gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
              <div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-xs font-black text-purple-400 border border-purple-500/40 shrink-0">{{ index + 1 }}</div>
              <p class="text-xs text-gray-300 leading-relaxed uppercase font-bold pt-1">{{ step }}</p>
            </div>
          </div>
        </section>

        <section id="troubleshoot" class="mb-20 scroll-mt-28">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Info :size="20" class="text-blue-400" /> 09. Debug_Protocols
          </h2>
          <div class="space-y-4">
            <div v-for="error in debugLogs" :key="error.title" class="p-6 bg-blue-500/[0.03] border border-blue-500/20 rounded-2xl">
              <h4 class="text-[10px] font-black text-blue-300 uppercase mb-2 tracking-widest">{{ error.title }}</h4>
              <p class="text-[10px] text-gray-400 uppercase font-bold leading-relaxed">{{ error.solution }}</p>
            </div>
          </div>
        </section>

        <section id="legal" class="mt-40 mb-20 pt-20 border-t border-white/10">
          <div class="flex items-start gap-6 bg-red-500/[0.08] border border-red-500/20 p-8 rounded-2xl">
            <ShieldAlert :size="32" class="text-red-400 shrink-0" />
            <div>
              <h4 class="text-red-400 font-black uppercase tracking-[0.3em] mb-2">Legal_Disclaimer</h4>
              <p class="text-xs text-gray-300 font-bold uppercase tracking-widest">Author assumes no liability for misuse. Authorized auditing only. Misuse may result in legal action or network bans.</p>
            </div>
          </div>
        </section>

      </main>
    </div>

    <div class="fixed bottom-10 right-10 z-[1] pointer-events-none opacity-20">
       <Radar class="text-purple-500 animate-spin-slow" :size="300" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Terminal, Cpu, ShieldCheck, Settings, Activity,
  Copy, ShieldAlert, Radar, Brain, Zap,
  MonitorCheck, Database, Network, Info, Code
} from 'lucide-vue-next';

const navLinks = [
  {
    title: 'Framework',
    links: [
      { name: 'System Specs', id: 'specs' },
      { name: 'Architecture', id: 'architecture' },
      { name: 'Tool Arsenal', id: 'arsenal' },
    ]
  },
  {
    title: 'Deployment',
    links: [
      { name: 'Host Prep', id: 'env-prep' },
      { name: 'Deployment', id: 'deployment' },
    ]
  },
  {
    title: 'Intelligence',
    links: [
      { name: 'Model Strategy', id: 'ai-strategy' },
      { name: 'Neural Logic', id: 'neural-logic' },
      { name: 'Dev Integration', id: 'technical' },
      { name: 'Execution', id: 'usage' },
      { name: 'Debugging', id: 'troubleshoot' }
    ]
  },
  {
    title: 'Compliance',
    links: [
      { name: 'Legal Protocol', id: 'legal' }
    ]
  }
];

const arsenal = [
  { name: 'Nikto_Core', engine: 'Nikto 2.5', audit: 'Web server misconfigs & insecure files.' },
  { name: 'SQLmap_Engine', engine: 'SQLmap 1.8', audit: 'Automated DB injection & takeover.' },
  { name: 'Nmap_Uplink', engine: 'Nmap 7.9', audit: 'Service discovery & port vulnerability.' },
  { name: 'Directory_Hose', engine: 'Gobuster', audit: 'URI & DNS brute-forcing.' }
];

const modelRecommendations = [
  { name: 'Lite_Auditor', spec: '4GB VRAM', tag: 'phi3.5', desc: 'Fast real-time log parsing.', icon: Zap },
  { name: 'Standard_C2', spec: '8GB VRAM', tag: 'qwen2.5:7b', desc: 'Balanced reasoning & speed.', icon: MonitorCheck },
  { name: 'Researcher', spec: '12GB+ VRAM', tag: 'deepseek-r1:8b', desc: 'Advanced reasoning logic.', icon: Database }
];

const steps = [
  "Navigate to /recon and input your target IP or URL.",
  "Initiate a Quick Scan to establish a baseline handshake.",
  "Wait for Standard_Output to finalize the raw logs.",
  "Trigger the Neural Heuristic button for AI-driven audit."
];

const debugLogs = [
  { title: "Error: Permission Denied", solution: "Nmap and certain tools require raw socket access. Ensure you launch the server using 'sudo npm run dev'." },
  { title: "Error: Ollama Connection Refused", solution: "Verify the Ollama service is active. Run 'systemctl status ollama' or manually start it with 'ollama serve'." },
  { title: "Scan Hangs / No Output", solution: "Check your local firewall settings and ensure the target host is reachable via 'ping'." }
];
</script>

<style scoped>
@keyframes reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 20s linear infinite; }

/* Custom scrollbar for fixed sidebar */
.custom-scrollbar::-webkit-scrollbar { width: 2px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.2); }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.4); border-radius: 10px; }

html { scroll-behavior: smooth; overflow-y: scroll; }
</style>