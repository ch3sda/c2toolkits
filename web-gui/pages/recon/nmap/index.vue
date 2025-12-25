<template>
  <div class="min-h-screen bg-[#050505] text-white font-mono p-4 lg:p-8 selection:bg-cyan-500/30 overflow-x-hidden relative">
    
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute inset-0 bg-[#050505]" />
      <div class="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.25)_1px,transparent_1px)] bg-[size:60px_60px] opacity-80" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/20 blur-[160px] rounded-full animate-pulse-slow" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_90%)]" />
      <div class="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>

    <Transition name="fade">
      <div v-if="showExitModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
        <div class="bg-[#0a0a0a] border border-red-500/50 p-8 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]"></div>
          <ShieldAlert :size="48" class="text-red-500 mx-auto mb-4 animate-pulse" />
          <h2 class="text-red-500 font-black tracking-widest uppercase mb-2">Active_Transmission_Detected</h2>
          <p class="text-gray-400 text-xs mb-8 leading-relaxed uppercase">
            Navigating away will terminate the current uplink and send a SIGINT signal to the engine. Do you wish to abort?
          </p>
          <div class="grid grid-cols-2 gap-4">
            <button @click="showExitModal = false" class="py-3 border border-white/10 rounded-xl hover:bg-white/5 uppercase text-[10px] font-black transition-all">Stay_Linked</button>
            <button @click="confirmExit" class="py-3 bg-red-600 text-black rounded-xl hover:bg-red-500 uppercase text-[10px] font-black transition-all shadow-lg shadow-red-600/20">Abort_Mission</button>
          </div>
        </div>
      </div>
    </Transition>

    <div class="relative z-10">
      <header class="max-w-[1600px] mx-auto mb-8 flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <button @click="handleBackClick" class="text-[9px] font-black text-cyan-500/60 hover:text-cyan-400 tracking-[0.3em] uppercase flex items-center gap-1 mb-2 transition-all">
            <ChevronLeft :size="12" /> RETURN_TO_ARSENAL
          </button>
          <h1 class="text-5xl font-black italic uppercase tracking-tighter flex items-center gap-3">
            Nmap_Engine <span class="text-xs not-italic font-light text-cyan-500/30 tracking-normal pt-2">v.7.98_STABLE</span>
          </h1>
        </div>
        <div class="bg-cyan-500/10 border border-cyan-500/30 px-4 py-3 rounded-xl backdrop-blur-md flex items-center gap-4 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <div :class="['w-2 h-2 rounded-full', isRunning ? 'bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]' : 'bg-white/20']"></div>
          <div class="text-right">
            <p class="text-[8px] font-black text-cyan-500 uppercase tracking-widest leading-none mb-1">Scanner_Status</p>
            <p class="text-[10px] font-bold uppercase">{{ isRunning ? 'Executing_Protocol' : 'System_Ready' }}</p>
          </div>
        </div>
      </header>

      <div class="max-w-[1600px] mx-auto grid grid-cols-12 gap-8">
        
        <aside class="col-span-12 lg:col-span-4 space-y-6">
          <div class="p-6 bg-white/[0.04] border border-white/10 rounded-2xl space-y-4 shadow-2xl backdrop-blur-xl">
            <div class="space-y-2">
              <label class="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Target_Uplink</label>
              <input v-model="target" :disabled="isRunning" placeholder="e.g. 127.0.0.1" class="cyber-input" />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button v-for="mode in scanModes" :key="mode.id" @click="!isRunning && (selectedMode = mode.id)"
                :class="['mode-tab', selectedMode === mode.id ? 'active' : '', isRunning ? 'opacity-50 cursor-not-allowed' : '']">
                {{ mode.label }}
              </button>
            </div>

            <div v-if="selectedMode === 'custom'" class="animate-reveal space-y-2">
              <label class="text-[9px] font-black text-cyan-500/50 uppercase tracking-[0.2em]">Manual_Injection_Flags</label>
              <input v-model="customFlags" :disabled="isRunning" placeholder="-sV -Pn --script=vuln" class="cyber-input border-cyan-500/30 text-xs" />
            </div>

            <div class="flex gap-2">
              <button @click="executeScan" :disabled="isRunning || !target" class="execute-trigger flex-grow relative overflow-hidden group">
                <component :is="isRunning ? 'Loader2' : 'Zap'" :class="isRunning ? 'animate-spin' : ''" :size="16" />
                {{ isRunning ? 'SCANNING...' : 'INITIATE_SCAN' }}
              </button>
              
              <button v-if="isRunning" @click="cancelScan" class="w-14 bg-red-600/10 border border-red-600/40 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-black transition-all group">
                <X :size="20" />
              </button>
            </div>
          </div>

          <div class="p-6 bg-black/60 border border-white/5 rounded-2xl h-[674px] flex flex-col backdrop-blur-md">
            <h3 class="text-yellow-500/70 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <BookOpen :size="14" /> MANUAL_DATABASE
            </h3>
            <div class="overflow-y-auto custom-scroll pr-2 text-[10px] space-y-5">
              <div v-for="(section, title) in fullUsageDoc" :key="title">
                <p class="text-white/20 mb-2 border-b border-white/5 pb-1 font-black italic uppercase tracking-widest">// {{ title }}</p>
                <div v-for="item in section" :key="item.cmd" class="grid grid-cols-3 gap-2 mb-2 group text-gray-500">
                  <span class="text-cyan-400 font-bold col-span-1">{{ item.cmd }}</span>
                  <span class="text-gray-500 col-span-2 leading-tight uppercase group-hover:text-gray-300 transition-colors">{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main class="col-span-12 lg:col-span-8 space-y-6">
          <div class="flex flex-col h-[400px] bg-black/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl relative group">
            <div class="absolute inset-0 bg-cyan-500/[0.03] pointer-events-none"></div>
            
            <div class="bg-white/[0.07] px-5 py-3 border-b border-white/10 flex justify-between items-center relative z-10">
              <span class="text-[10px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]"></div>
                Standard_Output // Nmap
                <span v-if="isRunning" class="text-red-500 animate-pulse text-[8px] border border-red-500/30 px-1 rounded uppercase ml-2">SIGINT_Attached</span>
              </span>
              <button @click="output = ''" :disabled="isRunning" class="text-[9px] text-red-500/50 hover:text-red-500 transition-colors uppercase font-black">Flush_Buffer</button>
            </div>
            
            <div class="p-6 overflow-y-auto custom-scroll flex-grow font-mono text-sm relative z-10">
              <div v-if="output" class="text-cyan-400/90 whitespace-pre-wrap animate-reveal">
                <span class="text-cyan-700 block mb-6 text-xs p-3 bg-cyan-950/30 border-l-2 border-cyan-700 italic uppercase tracking-wider">
                  # {{ executedCmd }}
                </span>
                {{ output }}
              </div>
              <div v-else-if="isRunning" class="h-full flex flex-col items-center justify-center gap-4 text-cyan-500/20 italic">
                <Radar :size="80" class="animate-spin-slow text-cyan-500/40" />
                <span class="animate-pulse tracking-[0.4em] uppercase text-[12px] text-cyan-500/60">Intercepting_Data_Stream...</span>
              </div>
              <div v-else class="h-full flex items-center justify-center text-white/5 uppercase tracking-[0.5em] text-[10px]">
                Ready_for_target_handshake
              </div>
            </div>
          </div>

          <div class="p-6 bg-cyan-500/[0.08] border border-cyan-500/30 rounded-2xl relative backdrop-blur-md overflow-hidden shadow-lg shadow-purple-500/5">
            <div class="absolute -right-8 -top-8 w-32 h-32 bg-cyan-600/20 blur-3xl rounded-full"></div>
            <h3 class="text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <BrainCircuit :size="14" /> AI_Heuristic_Engine
            </h3>
            
            <div class="min-h-[120px]">
              <div v-if="isAnalyzing" class="flex items-center gap-3 text-cyan-400/50 italic text-[10px] animate-pulse">
                <Loader2 :size="14" class="animate-spin" />
                PARSING_BUFFER_FOR_KNOWN_VECTORS...
              </div>

              <div v-else-if="aiOutput" class="text-gray-300 text-xs leading-relaxed font-mono whitespace-pre-wrap border-l border-cyan-500/50 pl-4">
                 {{ aiOutput }}<span v-if="isTyping" class="w-1.5 h-3 bg-cyan-500 inline-block ml-1 animate-pulse"></span>
              </div>

              <div v-else class="text-gray-800 text-[9px] uppercase tracking-widest italic">
                Neural link standby...
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeft, Zap, Loader2, Radar, BookOpen, BrainCircuit, X, ShieldAlert } from 'lucide-vue-next';
import { extractNmapFeatures } from '~/utils/nmapEngine'; 

const router = useRouter();
const target = ref('');
const selectedMode = ref('quick');
const customFlags = ref('');
const output = ref('');
const isRunning = ref(false);
const executedCmd = ref('');
const showExitModal = ref(false);

const aiOutput = ref('');
const isAnalyzing = ref(false);
const isTyping = ref(false);

const scanModes = [
  { id: 'quick', label: 'Quick Scan' },
  { id: 'top', label: 'Top 100' },
  { id: 'os', label: 'OS Detect' },
  { id: 'full', label: 'Full Scan' },
  { id: 'vuln', label: 'Vuln Scan' },
  { id: 'custom', label: 'Custom' },
];

const fullUsageDoc = {
  "Discovery": [
    { cmd: "-sn", desc: "Ping scan - no ports" },
    { cmd: "-Pn", desc: "Skip host discovery" },
    { cmd: "-PS/PA", desc: "TCP SYN/ACK discovery" }
  ],
  "Scanning": [
    { cmd: "-sS", desc: "Stealth SYN scan" },
    { cmd: "-sV", desc: "Service versioning" },
    { cmd: "-sU", desc: "UDP port scan" },
    { cmd: "-p-", desc: "Scan all 65535 ports" }
  ],
  "Performance": [
    { cmd: "-T4", desc: "Aggressive timing" },
    { cmd: "-F", desc: "Fast mode (top ports)" },
    { cmd: "--top-ports", desc: "Scan X most common" }
  ],
  "Scripts": [
    { cmd: "-sC", desc: "Default NSE scripts" },
    { cmd: "--script", desc: "Run specific script" }
  ]
};

const handleBackClick = () => isRunning.value ? (showExitModal.value = true) : router.push('/recon');
const confirmExit = async () => { isRunning.value = false; showExitModal.value = false; router.push('/recon'); };
const cancelScan = () => { isRunning.value = false; output.value += "\n\n[SYSTEM]: SIGINT RECEIVED. ENGINE SHUTDOWN."; };

const runTypewriter = (text: string) => {
  aiOutput.value = '';
  isTyping.value = true;
  let i = 0;
  const speed = 15;
  const type = () => {
    if (i < text.length) {
      aiOutput.value += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      isTyping.value = false;
    }
  };
  type();
};

const executeScan = async () => {
  if (!target.value || isRunning.value) return;
  isRunning.value = true;
  output.value = '';
  aiOutput.value = ''; // Clear AI box

  try {
    // 1. Run Nmap
    const data: any = await $fetch('/api/recon', {
      method: 'POST',
      body: { tool: 'nmap', target: target.value, mode: selectedMode.value, customFlags: customFlags.value }
    });
    
    if (data.success) {
      output.value = data.output;
      executedCmd.value = data.command_executed;

      // 2. Start Streaming AI Analysis
      isAnalyzing.value = true;
      const features = extractNmapFeatures(data.output);

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featureData: features })
      });

      if (!response.body) throw new Error("No response body");
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      isAnalyzing.value = false; // Hide the "Parsing..." loader as soon as stream starts
      isTyping.value = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        // Ollama sends multiple JSON objects in one chunk sometimes
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            if (json.response) {
              aiOutput.value += json.response; // Real-time append
            }
          } catch (e) {
            console.error("Error parsing stream chunk", e);
          }
        }
      }
      isTyping.value = false;
    }
  } catch (e: any) {
    output.value = `[FATAL_ERROR]: ${e.message}`;
  } finally {
    isRunning.value = false;
    isAnalyzing.value = false;
  }
};
</script>

<style scoped>
.cyber-input { @apply w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500/50 outline-none transition-all text-cyan-400 font-bold placeholder-white/10 shadow-inner; }
.mode-tab { @apply p-3 rounded-xl border border-white/5 bg-white/[0.02] text-[9px] font-black uppercase text-gray-500 hover:border-cyan-500/30 transition-all; }
.mode-tab.active { @apply bg-cyan-600 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]; }
.execute-trigger { @apply py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase tracking-[0.3em] rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-cyan-900/20; }
.custom-scroll::-webkit-scrollbar { width: 3px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #06b6d444; border-radius: 10px; }

@keyframes pulse-slow { 0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.35; transform: translate(-50%, -50%) scale(1.1); } }
.animate-pulse-slow { animation: pulse-slow 6s infinite ease-in-out; }
.animate-spin-slow { animation: spin 10s linear infinite; }
@keyframes reveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.animate-reveal { animation: reveal 0.4s ease-out forwards; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>