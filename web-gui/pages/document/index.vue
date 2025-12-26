<template>
  <div class="min-h-screen bg-[#0d0d12] text-white font-mono relative overflow-hidden selection:bg-purple-500/40">
    
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-[#1a1025] via-[#0d0d12] to-[#150e20]" />
      <div class="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.12)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px]" />
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px]" />
    </div>

    <header class="sticky top-0 z-50 w-full border-b border-white/10 bg-white/[0.03] backdrop-blur-2xl">
      <div class="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <Terminal :size="20" class="text-purple-400 group-hover:scale-110 transition-transform" />
          <span class="text-sm font-black tracking-[0.3em] uppercase italic bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">C2_DOCS // v3.0</span>
        </NuxtLink>
        <div class="flex items-center gap-6">
          <a href="https://github.com/ch3sda/c2toolkits" target="_blank" class="text-[10px] font-black tracking-widest text-gray-300 hover:text-purple-400 uppercase transition-colors">Github_Repo</a>
          <div class="h-4 w-[1px] bg-white/20"></div>
          <span class="text-[10px] px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-black uppercase tracking-tighter animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.2)]">Education_Edition</span>
        </div>
      </div>
    </header>

    <div class="relative z-10 max-w-[1440px] mx-auto flex">
      
      <aside class="hidden lg:block w-72 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto border-r border-white/10 p-8">
        <div class="space-y-8">
          <div v-for="section in navLinks" :key="section.title">
            <h4 class="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] mb-4 italic">{{ section.title }}</h4>
            <ul class="space-y-3">
              <li v-for="link in section.links" :key="link.name">
                <a :href="`#${link.id}`" class="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span class="w-1.5 h-1.5 bg-white/20 group-hover:bg-purple-500 rounded-full transition-all group-hover:scale-125"></span>
                  {{ link.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <main class="flex-1 px-6 py-12 lg:px-16 max-w-4xl animate-reveal">
        
        <section id="prologue" class="mb-20">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/20 border border-purple-500/30 mb-6 shadow-lg shadow-purple-500/5">
            <ShieldCheck :size="14" class="text-purple-300" />
            <span class="text-[10px] font-black text-purple-300 uppercase tracking-widest">Secure_Protocol_Active</span>
          </div>
          <h1 class="text-6xl font-black italic tracking-tighter uppercase mb-6 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
            System_Documentation
          </h1>
          <p class="text-gray-300 leading-relaxed text-lg font-medium">
            C2Toolkits is a curated cybersecurity arsenal designed for educational research. By accessing these modules, you agree to follow the <span class="text-white italic underline decoration-purple-500/50">Responsible Disclosure Protocol</span>.
          </p>
        </section>

        <section id="structure" class="mb-20">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Folder :size="20" class="text-purple-400" /> Project_Structure
          </h2>
          <div class="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
            <table class="w-full text-left text-xs uppercase tracking-widest">
              <thead>
                <tr class="border-b border-white/10 bg-white/[0.06]">
                  <th class="p-4 font-black text-purple-300">Directory</th>
                  <th class="p-4 font-black text-purple-300">Operational Purpose</th>
                </tr>
              </thead>
              <tbody class="text-gray-200 font-bold">
                <tr v-for="row in structure" :key="row.dir" class="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td class="p-4 font-mono text-white italic">/{{ row.dir }}</td>
                  <td class="p-4">{{ row.purpose }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="ai-core" class="mb-20 scroll-mt-24">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Brain :size="20" class="text-purple-400" /> Intelligence_Core
          </h2>
          
          <div class="space-y-8">
            <p class="text-gray-300 leading-relaxed uppercase text-xs tracking-widest font-bold">
              C2Toolkits integrates local Large Language Models (LLM) via <span class="text-purple-400 underline underline-offset-4">Ollama</span> to provide autonomous security analysis.
            </p>

            <div class="bg-purple-600/[0.07] border border-purple-500/30 rounded-2xl p-8 backdrop-blur-lg shadow-xl shadow-purple-900/10">
              <h3 class="text-sm font-black text-white uppercase tracking-widest mb-4">Step 01: Host Model Uplink</h3>
              <p class="text-xs text-gray-300 mb-6 font-bold uppercase tracking-tighter">Pull the optimized security stack to your NVIDIA hardware:</p>
              <div class="bg-black/60 border border-purple-500/40 p-4 rounded-lg space-y-2 group shadow-inner">
                <code class="block text-purple-300 text-xs font-bold">ollama pull qwen2.5:7b-instruct</code>
                <code class="block text-purple-300 text-xs font-bold">ollama pull deepseek-r1:8b</code>
                <code class="block text-purple-300 text-xs font-bold">ollama pull phi3.5</code>
              </div>
            </div>

            <div id="ai-models" class="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div class="p-6 bg-white/[0.05] border border-white/20 rounded-2xl hover:bg-white/[0.08] hover:border-purple-400/60 transition-all group shadow-lg">
                <div class="flex justify-between items-start mb-4">
                   <Cpu :size="18" class="text-purple-400" />
                   <span class="text-[8px] font-black bg-purple-500/30 text-white px-2 py-0.5 rounded italic border border-purple-500/50">DEFAULT</span>
                </div>
                <h4 class="text-xs font-black text-white uppercase mb-2">The_Secretary</h4>
                <p class="text-[9px] text-purple-300 uppercase font-bold mb-3">Qwen2.5:7b-Instruct</p>
                <p class="text-[10px] text-gray-300 italic leading-relaxed">High precision reporting. Best for strict plain-text security assessments.</p>
              </div>

              <div class="p-6 bg-white/[0.05] border border-white/20 rounded-2xl hover:bg-white/[0.08] hover:border-red-400/60 transition-all shadow-lg">
                <div class="mb-4">
                   <Brain :size="18" class="text-red-400" />
                </div>
                <h4 class="text-xs font-black text-white uppercase mb-2">The_Brain</h4>
                <p class="text-[9px] text-red-300 uppercase font-bold mb-3">DeepSeek-R1:8b</p>
                <p class="text-[10px] text-gray-300 italic leading-relaxed">Advanced reasoning logic. Use for exploit chaining and code auditing.</p>
              </div>

              <div class="p-6 bg-white/[0.05] border border-white/20 rounded-2xl hover:bg-white/[0.08] hover:border-blue-400/60 transition-all shadow-lg">
                <div class="mb-4">
                   <Zap :size="18" class="text-blue-400" />
                </div>
                <h4 class="text-xs font-black text-white uppercase mb-2">The_Scanner</h4>
                <p class="text-[9px] text-blue-300 uppercase font-bold mb-3">Phi-3.5:Mini</p>
                <p class="text-[10px] text-gray-300 italic leading-relaxed">Ultra-fast streaming. Optimized for real-time log analysis and speed.</p>
              </div>

            </div>

            <div id="ai-config" class="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div class="flex items-start gap-4">
                <div class="p-3 bg-white/[0.08] rounded-lg">
                  <Code :size="20" class="text-purple-300" />
                </div>
                <div>
                  <h4 class="text-xs font-black text-white uppercase mb-2">Target_Model_Configuration</h4>
                  <p class="text-[10px] text-gray-300 leading-relaxed mb-4 uppercase font-bold">
                    Define the operational model within the API bridge:
                  </p>
                  <code class="block bg-black/80 p-4 rounded border border-purple-500/30 text-purple-300 text-[11px] italic leading-5 shadow-inner">
                    // server/api/ai/analyze.post.ts<br/>
                    const model = <span class="text-white font-black underline decoration-purple-500">'qwen2.5:7b-instruct'</span> // Change to 'phi3.5'
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="setup" class="mb-20">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Cpu :size="20" class="text-purple-400" /> System_Deployment
          </h2>
          
          <div class="space-y-6">
            <div class="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <p class="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-[0.2em]">Step_01: Binary Acquisition</p>
              <div class="bg-black/60 border border-purple-500/40 p-4 rounded-lg flex items-center justify-between group shadow-inner transition-all hover:bg-black/80">
                <code class="text-purple-300 text-sm font-bold">git clone https://github.com/ch3sda/c2toolkits.git</code>
                <Copy :size="14" class="text-gray-400 group-hover:text-purple-400 cursor-pointer" />
              </div>
            </div>

            <div class="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <p class="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-[0.2em]">Step_02: Dependency Uplink</p>
              <div class="bg-black/60 border border-purple-500/40 p-4 rounded-lg shadow-inner">
                <code class="text-purple-300 text-sm font-bold">sudo apt install figlet nmap gobuster ffuf nuclei -y</code>
              </div>
            </div>
          </div>
        </section>

        <section id="gui" class="mb-20">
          <div class="p-8 bg-gradient-to-br from-purple-600/20 to-blue-600/10 border border-purple-500/30 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
            <h2 class="text-2xl font-black italic uppercase tracking-[0.2em] mb-4 text-white">Web_GUI_Interface</h2>
            <p class="text-gray-200 text-sm mb-8 italic uppercase tracking-wider font-bold">High-fidelity Nuxt 3 dashboard for visual reconnaissance.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-black/40 border border-white/10 p-4 rounded-xl shadow-lg">
                <p class="text-[10px] text-purple-300 font-black uppercase mb-2">Build Environment</p>
                <p class="text-xs text-white font-bold tracking-tight">Node.js v18+ // NPM v9+</p>
              </div>
              <div class="bg-black/40 border border-white/10 p-4 rounded-xl shadow-lg">
                <p class="text-[10px] text-purple-300 font-black uppercase mb-2">Local Uplink</p>
                <p class="text-xs text-white font-bold tracking-tight">localhost:3000</p>
              </div>
            </div>
          </div>
        </section>

        <section id="legal" class="mt-40 pt-20 border-t border-white/10">
          <div class="flex items-start gap-6 bg-red-500/[0.08] border border-red-500/20 p-8 rounded-2xl backdrop-blur-md shadow-lg shadow-red-900/5">
            <ShieldAlert :size="32" class="text-red-400 shrink-0" />
            <div>
              <h4 class="text-red-400 font-black uppercase tracking-[0.3em] mb-2">Legal_Mandate</h4>
              <p class="text-xs text-gray-300 leading-relaxed uppercase tracking-widest font-bold">
                The author (@ch3sda) assumes no liability for system misuse. This framework is a conceptual tool for learning methodology and authorized auditing only.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>

    <div class="fixed bottom-10 right-10 z-50 pointer-events-none">
       <Radar class="text-purple-500/30 animate-spin-slow" :size="250" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Terminal, Folder, Cpu, ShieldCheck, 
  Copy, ShieldAlert, Radar, Brain, Zap, Code
} from 'lucide-vue-next';

const navLinks = [
  {
    title: 'Framework',
    links: [
      { name: 'Prologue', id: 'prologue' },
      { name: 'Project Structure', id: 'structure' },
    ]
  },
  {
    title: 'Intelligence',
    links: [
      { name: 'Ollama Setup', id: 'ai-core' },
      { name: 'Model Comparison', id: 'ai-models' },
      { name: 'Logic Customization', id: 'ai-config' }
    ]
  },
  {
    title: 'Deployment',
    links: [
      { name: 'CLI Setup', id: 'setup' },
      { name: 'Web GUI Interface', id: 'gui' }
    ]
  },
  {
    title: 'Compliance',
    links: [
      { name: 'Legal Protocol', id: 'legal' }
    ]
  }
];

const structure = [
  { dir: 'server/api/ai', purpose: 'Ollama integration & LLM analysis bridge' },
  { dir: 'encode', purpose: 'Cipher algorithms, XOR, Base64 transformation' },
  { dir: 'recon', purpose: 'Automated network discovery and scanning' },
  { dir: 'web-gui', purpose: 'Nuxt 3 dashboard and visual interface' },
  { dir: 'tools', purpose: 'Core Linux utilities and system scripts' }
];
</script>

<style scoped>
@keyframes reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 15s linear infinite; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.4); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.7); }

html { scroll-behavior: smooth; }
</style>