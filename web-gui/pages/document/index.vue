<template>
  <div class="min-h-screen bg-[#050505] text-white font-mono relative overflow-hidden selection:bg-purple-500/30">
    
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-[#0a0510] via-[#050505] to-[#0d071a]" />
      <div class="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
    </div>

    <header class="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div class="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <Terminal :size="20" class="text-purple-500 group-hover:scale-110 transition-transform" />
          <span class="text-sm font-black tracking-[0.3em] uppercase italic">C2_DOCS // v3.0</span>
        </NuxtLink>
        <div class="flex items-center gap-6">
          <a href="https://github.com/ch3sda/c2toolkits" target="_blank" class="text-[10px] font-black tracking-widest text-gray-400 hover:text-purple-400 uppercase transition-colors">Github_Repo</a>
          <div class="h-4 w-[1px] bg-white/10"></div>
          <span class="text-[10px] px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-black uppercase tracking-tighter animate-pulse">Education_Edition</span>
        </div>
      </div>
    </header>

    <div class="relative z-10 max-w-[1440px] mx-auto flex">
      
      <aside class="hidden lg:block w-72 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto border-r border-white/5 p-8">
        <div class="space-y-8">
          <div v-for="section in navLinks" :key="section.title">
            <h4 class="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] mb-4 italic">{{ section.title }}</h4>
            <ul class="space-y-3">
              <li v-for="link in section.links" :key="link.name">
                <a :href="`#${link.id}`" class="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
                  <span class="w-1 h-1 bg-white/10 group-hover:bg-purple-500 rounded-full transition-colors"></span>
                  {{ link.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <main class="flex-1 px-6 py-12 lg:px-16 max-w-4xl animate-reveal">
        
        <section id="prologue" class="mb-20">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/10 border border-purple-500/20 mb-6">
            <ShieldCheck :size="14" class="text-purple-400" />
            <span class="text-[10px] font-black text-purple-400 uppercase tracking-widest">Secure_Protocol_Active</span>
          </div>
          <h1 class="text-5xl font-black italic tracking-tighter uppercase mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            System_Documentation
          </h1>
          <p class="text-gray-400 leading-relaxed text-lg">
            C2Toolkits is a curated cybersecurity arsenal designed for educational research. By accessing these modules, you agree to follow the <span class="text-white italic">Responsible Disclosure Protocol</span>.
          </p>
        </section>

        <section id="structure" class="mb-20">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Folder :size="20" class="text-purple-500" /> Project_Structure
          </h2>
          <div class="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
            <table class="w-full text-left text-xs uppercase tracking-widest">
              <thead>
                <tr class="border-b border-white/5 bg-white/[0.03]">
                  <th class="p-4 font-black text-purple-400">Directory</th>
                  <th class="p-4 font-black text-purple-400">Operational Purpose</th>
                </tr>
              </thead>
              <tbody class="text-gray-400 font-bold">
                <tr v-for="row in structure" :key="row.dir" class="border-b border-white/5 hover:bg-white/[0.01]">
                  <td class="p-4 font-mono text-white italic">/{{ row.dir }}</td>
                  <td class="p-4">{{ row.purpose }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="ai-core" class="mb-20 scroll-mt-24">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Brain :size="20" class="text-purple-500" /> Intelligence_Core
          </h2>
          
          <div class="space-y-8">
            <p class="text-gray-400 leading-relaxed uppercase text-xs tracking-widest">
              C2Toolkits integrates local Large Language Models (LLM) via <span class="text-white">Ollama</span> to provide real-time analysis of security data.
            </p>

            <div class="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-8">
              <h3 class="text-sm font-black text-white uppercase tracking-widest mb-4">Step 01: Host Setup</h3>
              <p class="text-xs text-gray-500 mb-6">To use the AI features, you must have Ollama installed and running locally on port 11434.</p>
              <div class="bg-black border border-purple-500/30 p-4 rounded-lg flex items-center justify-between group">
                <code class="text-purple-400 text-sm">ollama serve</code>
                <Zap :size="14" class="text-purple-500 animate-pulse" />
              </div>
            </div>

            <div id="ai-models" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-purple-500/50 transition-all">
                <h4 class="text-xs font-black text-white uppercase mb-4 flex items-center gap-2">
                  <Cpu :size="16" class="text-purple-500" /> Qwen2.5:7b
                </h4>
                <div class="space-y-3">
                  <p class="text-[10px] text-green-400 font-bold uppercase tracking-tighter">● Pro: Deep technical understanding</p>
                  <p class="text-[10px] text-red-400 font-bold uppercase tracking-tighter">● Con: Requires higher system resources</p>
                  <p class="text-[10px] text-gray-500 italic mt-2">Best for: Detailed vulnerability reports.</p>
                </div>
              </div>

              <div class="p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all">
                <h4 class="text-xs font-black text-white uppercase mb-4 flex items-center gap-2">
                  <Zap :size="16" class="text-blue-500" /> Llama3.2:3b
                </h4>
                <div class="space-y-3">
                  <p class="text-[10px] text-green-400 font-bold uppercase tracking-tighter">● Pro: High speed / Low RAM usage</p>
                  <p class="text-[10px] text-red-400 font-bold uppercase tracking-tighter">● Con: May miss nuanced details</p>
                  <p class="text-[10px] text-gray-500 italic mt-2">Best for: Fast summary & general tasks.</p>
                </div>
              </div>
            </div>

            <div id="ai-config" class="bg-black/40 border border-white/5 rounded-2xl p-6">
              <div class="flex items-start gap-4">
                <div class="p-3 bg-white/[0.03] rounded-lg">
                  <Code :size="20" class="text-purple-400" />
                </div>
                <div>
                  <h4 class="text-xs font-black text-white uppercase mb-2">Manual Configuration</h4>
                  <p class="text-[10px] text-gray-500 leading-relaxed mb-4 uppercase font-bold">
                    You can switch models or customize the analysis logic at the following endpoint:
                  </p>
                  <code class="block bg-black p-3 rounded border border-purple-500/20 text-purple-400 text-xs italic">
                    /server/api/ai/analyze.post.ts
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="setup" class="mb-20">
          <h2 class="text-xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Cpu :size="20" class="text-purple-500" /> System_Deployment
          </h2>
          
          <div class="space-y-6">
            <div class="bg-black/40 border border-white/5 rounded-2xl p-6">
              <p class="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-[0.2em]">Step_01: Binary Acquisition</p>
              <div class="bg-black border border-purple-500/30 p-4 rounded-lg flex items-center justify-between group">
                <code class="text-purple-400 text-sm">git clone https://github.com/ch3sda/c2toolkits.git</code>
                <Copy :size="14" class="text-gray-600 group-hover:text-purple-400 cursor-pointer" />
              </div>
            </div>

            <div class="bg-black/40 border border-white/5 rounded-2xl p-6">
              <p class="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-[0.2em]">Step_02: Dependency Uplink</p>
              <div class="bg-black border border-purple-500/30 p-4 rounded-lg">
                <code class="text-purple-400 text-sm">sudo apt install figlet nmap gobuster ffuf nuclei -y</code>
              </div>
            </div>
          </div>
        </section>

        <section id="gui" class="mb-20">
          <div class="p-8 bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-500/20 rounded-[2.5rem]">
            <h2 class="text-2xl font-black italic uppercase tracking-[0.2em] mb-4 text-white">Web_GUI_Interface</h2>
            <p class="text-gray-400 text-sm mb-8 italic uppercase tracking-wider">High-fidelity Nuxt 3 dashboard for visual reconnaissance.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-black/60 border border-white/5 p-4 rounded-xl">
                <p class="text-[10px] text-purple-400 font-black uppercase mb-2">Build Environment</p>
                <p class="text-xs text-white">Node.js v18+ // NPM v9+</p>
              </div>
              <div class="bg-black/60 border border-white/5 p-4 rounded-xl">
                <p class="text-[10px] text-purple-400 font-black uppercase mb-2">Local Uplink</p>
                <p class="text-xs text-white">localhost:3000</p>
              </div>
            </div>
          </div>
        </section>

        <section id="legal" class="mt-40 pt-20 border-t border-white/5">
          <div class="flex items-start gap-6 bg-red-500/[0.03] border border-red-500/10 p-8 rounded-2xl">
            <ShieldAlert :size="32" class="text-red-500 shrink-0" />
            <div>
              <h4 class="text-red-500 font-black uppercase tracking-[0.3em] mb-2">Legal_Mandate</h4>
              <p class="text-xs text-gray-500 leading-relaxed uppercase tracking-widest font-bold">
                The author (@ch3sda) assumes no liability for system misuse. This framework is a conceptual tool for learning methodology and authorized auditing only.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>

    <div class="fixed bottom-10 right-10 z-50 pointer-events-none">
       <Radar class="text-purple-500/20 animate-spin-slow" :size="200" />
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
.animate-spin-slow { animation: spin-slow 20s linear infinite; }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.2); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.5); }

html { scroll-behavior: smooth; }
</style>