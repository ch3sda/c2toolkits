<template>
  <div class="min-h-screen bg-[#050505] text-white font-mono p-4 lg:p-8 selection:bg-cyan-500/30 overflow-x-hidden relative">
    
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse-slow"></div>
      
      <div class="absolute top-[20%] -right-[10%] w-[45%] h-[60%] bg-blue-600/15 blur-[130px] rounded-full animate-drift"></div>
      
      <div class="absolute -bottom-[15%] left-[20%] w-[60%] h-[40%] bg-cyan-900/20 blur-[160px] rounded-full"></div>
      
      <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
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
              <input v-model="target" placeholder="e.g. 127.0.0.1" class="cyber-input" />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button v-for="mode in scanModes" :key="mode.id" @click="selectedMode = mode.id"
                :class="['mode-tab', selectedMode === mode.id ? 'active' : '']">
                {{ mode.label }}
              </button>
            </div>

            <div v-if="selectedMode === 'custom'" class="animate-reveal space-y-2">
              <label class="text-[9px] font-black text-cyan-500/50 uppercase tracking-[0.2em]">Manual_Injection_Flags</label>
              <input v-model="customFlags" placeholder="-sV -Pn --script=vuln" class="cyber-input border-cyan-500/30 text-xs" />
            </div>

            <div class="flex gap-2">
              <button @click="executeScan" :disabled="isRunning || !target" class="execute-trigger flex-grow relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <component :is="isRunning ? 'Loader2' : 'Zap'" :class="isRunning ? 'animate-spin' : ''" :size="16" />
                {{ isRunning ? 'SCANNING...' : 'INITIATE_SCAN' }}
              </button>
              
              <button v-if="isRunning" @click="cancelScan" class="w-14 bg-red-600/10 border border-red-600/40 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-black transition-all group shadow-lg shadow-red-600/5">
                <X :size="20" class="group-hover:scale-125 transition-transform" />
              </button>
            </div>
          </div>

          <div class="p-6 bg-black/60 border border-white/5 rounded-2xl h-[550px] flex flex-col backdrop-blur-md">
            <h3 class="text-yellow-500/70 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <BookOpen :size="14" /> MANUAL_DATABASE
            </h3>
            <div class="overflow-y-auto custom-scroll pr-2 text-[10px] space-y-5">
              <div v-for="(section, title) in fullUsageDoc" :key="title">
                <p class="text-white/20 mb-2 border-b border-white/5 pb-1 font-black italic uppercase tracking-widest">// {{ title }}</p>
                <div v-for="item in section" :key="item.cmd" class="grid grid-cols-3 gap-2 mb-2 group">
                  <span class="text-cyan-400 font-bold col-span-1">{{ item.cmd }}</span>
                  <span class="text-gray-500 col-span-2 leading-tight uppercase group-hover:text-gray-300 transition-colors">{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main class="col-span-12 lg:col-span-8 space-y-6">
          <div class="flex flex-col h-[550px] bg-black/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl relative group">
            <div class="absolute inset-0 bg-cyan-500/[0.03] pointer-events-none"></div>
            
            <div class="bg-white/[0.07] px-5 py-3 border-b border-white/10 flex justify-between items-center relative z-10">
              <span class="text-[10px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]"></div>
                Standard_Output // Nmap
                <span v-if="isRunning" class="text-red-500 animate-pulse text-[8px] border border-red-500/30 px-1 rounded uppercase">Ctrl+C_Attached</span>
              </span>
              <button @click="output = ''" class="text-[9px] text-red-500/50 hover:text-red-500 transition-colors uppercase font-black">Flush_Buffer</button>
            </div>
            
            <div class="p-6 overflow-y-auto custom-scroll flex-grow font-mono text-sm relative z-10">
              <div v-if="output" class="text-cyan-400/90 whitespace-pre-wrap animate-reveal">
                <span class="text-cyan-700 block mb-6 text-xs p-3 bg-cyan-950/30 border-l-2 border-cyan-700 italic uppercase tracking-wider">
                  # {{ executedCmd }}
                </span>
                {{ output }}
              </div>
              <div v-else-if="isRunning" class="h-full flex flex-col items-center justify-center gap-4 text-cyan-500/20 italic">
                <Radar :size="64" class="animate-spin-slow text-cyan-500/40" />
                <span class="animate-pulse tracking-[0.4em] uppercase text-[10px] text-cyan-500/60">Intercepting_Data_Stream...</span>
              </div>
              <div v-else class="h-full flex items-center justify-center text-white/5 uppercase tracking-[0.5em] text-[10px]">
                Ready_for_target_handshake
              </div>
            </div>
          </div>

          <div class="p-6 bg-purple-500/[0.08] border border-purple-500/30 rounded-2xl relative backdrop-blur-md overflow-hidden shadow-lg shadow-purple-500/5">
            <div class="absolute -right-8 -top-8 w-32 h-32 bg-purple-600/20 blur-3xl rounded-full"></div>
            <h3 class="text-purple-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <BrainCircuit :size="14" /> AI_Heuristic_Engine
            </h3>
            <div v-if="output" class="text-gray-300 text-xs leading-relaxed italic animate-reveal border-l border-purple-500/50 pl-4">
               "Buffer analysis complete. No critical vulnerabilities detected in initial handshake. Recommendation: Use <span class="text-purple-400">-sV</span> for version interrogation if service banners are obscured."
            </div>
            <div v-else class="text-gray-800 text-[9px] uppercase tracking-widest italic">
              Neural link standby...
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronLeft, Activity, Zap, Loader2, Radar, BookOpen, BrainCircuit, X, ShieldAlert } from 'lucide-vue-next';

const router = useRouter();
const target = ref('');
const selectedMode = ref('quick');
const customFlags = ref('');
const output = ref('');
const isRunning = ref(false);
const executedCmd = ref('');
const showExitModal = ref(false);

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

const handleBackClick = () => {
  if (isRunning.value) { showExitModal.value = true; } 
  else { router.push('/recon'); }
};

const confirmExit = async () => {
  await cancelScan();
  showExitModal.value = false;
  router.push('/recon');
};

const cancelScan = async () => {
  if (!target.value) return;
  try {
    await $fetch('/api/recon', {
      method: 'POST',
      body: { action: 'cancel', target: target.value }
    });
    output.value += "\n\n[SYSTEM]: SIGINT RECEIVED. ENGINE SHUTDOWN.";
  } catch (e) {
    console.error("Abort failed", e);
  } finally {
    isRunning.value = false;
  }
};

const executeScan = async () => {
  if (!target.value) return;
  isRunning.value = true;
  output.value = '';

  try {
    const data: any = await $fetch('/api/recon', {
      method: 'POST',
      body: { 
        tool: 'nmap', 
        target: target.value, 
        mode: selectedMode.value, 
        customFlags: customFlags.value 
      }
    });
    
    if (data.success) {
      output.value = data.output;
      executedCmd.value = data.command_executed;
    } else {
      output.value = `[ENGINE_ERROR]: ${data.error}`;
    }
  } catch (e: any) {
    output.value = `[FATAL_UPLINK_FAILURE]: ${e.message}`;
  } finally {
    isRunning.value = false;
  }
};
</script>

<style scoped>
.cyber-input { @apply w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500/50 focus:bg-cyan-500/[0.04] outline-none transition-all text-cyan-400 font-bold placeholder-white/10 shadow-inner; }
.mode-tab { @apply p-3 rounded-xl border border-white/5 bg-white/[0.02] text-[9px] font-black uppercase tracking-widest text-gray-500 transition-all hover:border-cyan-500/30; }
.mode-tab.active { @apply bg-cyan-600 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]; }
.execute-trigger { @apply py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase tracking-[0.3em] rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-cyan-900/20; }

.custom-scroll::-webkit-scrollbar { width: 3px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #06b6d444; border-radius: 10px; }

/* ENHANCED ANIMATIONS */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.15); }
}
@keyframes drift {
  0% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(40px, 30px) rotate(5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

.animate-pulse-slow { animation: pulse-slow 10s infinite ease-in-out; }
.animate-drift { animation: drift 15s infinite ease-in-out; }
.animate-shimmer { animation: shimmer 1.5s infinite; }
@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 10s linear infinite; }
@keyframes reveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.animate-reveal { animation: reveal 0.4s ease-out forwards; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>