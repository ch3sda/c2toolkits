<template>
  <div class="min-h-screen bg-[#050505] text-white font-mono p-4 lg:p-8 selection:bg-red-500/30 overflow-x-hidden relative">
    
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute inset-0 bg-[#050505]" />
      <div class="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(185,28,28,0.15)_1px,transparent_1px)] bg-[size:60px_60px] opacity-80" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-red-600/10 blur-[160px] rounded-full animate-pulse-slow" />
    </div>

    <Transition name="fade">
      <div v-if="showGuard" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
        <div class="bg-[#0a0a0a] border border-red-500/50 p-8 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]"></div>
          <ShieldAlert :size="48" class="text-red-500 mx-auto mb-4 animate-pulse" />
          <h2 class="text-red-500 font-black tracking-widest uppercase mb-2">Active_Transmission</h2>
          <p class="text-gray-400 text-xs mb-8 leading-relaxed uppercase">
            A scan is currently in progress. Navigating away will terminate the uplink. Do you wish to abort the mission?
          </p>
          <div class="grid grid-cols-2 gap-4">
            <button @click="showGuard = false" class="py-3 border border-white/10 rounded-xl hover:bg-white/5 uppercase text-[10px] font-black transition-all">Stay_Linked</button>
            <button @click="confirmAbort" class="py-3 bg-red-600 text-black rounded-xl hover:bg-red-500 uppercase text-[10px] font-black transition-all shadow-lg shadow-red-600/20">Abort_Scan</button>
          </div>
        </div>
      </div>
    </Transition>

    <div class="relative z-10">
      <header class="max-w-[1600px] mx-auto mb-8 flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <button @click="handleBack" class="text-[9px] font-black text-red-500/60 hover:text-red-400 tracking-[0.3em] uppercase flex items-center gap-1 mb-2 transition-all">
            <ChevronLeft :size="12" /> RETURN_TO_ARSENAL
          </button>
          <h1 class="text-5xl font-black italic uppercase tracking-tighter flex items-center gap-3">
            Nikto_Core <span class="text-xs not-italic font-light text-red-500/30 tracking-normal pt-2">v.2.5_Auditor</span>
          </h1>
        </div>
        
        <div class="bg-red-500/10 border border-red-500/30 px-6 py-3 rounded-xl backdrop-blur-md flex items-center gap-4 shadow-[0_0_20px_rgba(220,38,38,0.1)]">
          <div :class="['w-2.5 h-2.5 rounded-full', isRunning ? 'bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]' : 'bg-white/20']"></div>
          <div class="text-right">
            <p class="text-[8px] font-black text-red-500 uppercase tracking-[0.2em] leading-none mb-1">DEADLIEST Auditor</p>
            <p class="text-[10px] font-bold uppercase tracking-widest text-white/80">SYSTEM READY</p>
          </div>
        </div>
      </header>

      <div class="max-w-[1600px] mx-auto grid grid-cols-12 gap-8">
        
        <aside class="col-span-12 lg:col-span-4 space-y-6">
          <div class="p-6 bg-white/[0.04] border border-white/10 rounded-2xl space-y-4 shadow-2xl backdrop-blur-xl">
            <div class="space-y-2">
              <label class="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Target_Host</label>
              <input v-model="target" :disabled="isRunning" placeholder="http://target.com" class="cyber-input-red" />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button v-for="mode in scanModes" :key="mode.id" @click="!isRunning && (selectedMode = mode.id)"
                :class="['mode-tab-red', selectedMode === mode.id ? 'active' : '']">
                {{ mode.label }}
              </button>
            </div>

            <div v-if="selectedMode === 'custom'" class="animate-reveal space-y-2">
              <label class="text-[9px] font-black text-red-500/50 uppercase tracking-[0.2em]">Manual_Injection_Flags</label>
              <input v-model="customFlags" :disabled="isRunning" placeholder="-Tuning 123 -ssl" class="cyber-input-red text-xs border-red-500/20" />
            </div>

            <div class="flex gap-2">
              <button @click="executeScan" :disabled="isRunning || !target" class="execute-trigger-red flex-grow relative overflow-hidden group">
                <component :is="isRunning ? 'Loader2' : 'ShieldAlert'" :class="isRunning ? 'animate-spin' : ''" :size="16" />
                {{ isRunning ? 'AUDITING...' : 'START_VULN_SCAN' }}
              </button>
              
              <button v-if="isRunning" @click="cancelScan" class="px-4 bg-red-500/20 border border-red-500/50 hover:bg-red-500 hover:text-black rounded-xl transition-all flex items-center justify-center">
                <Square :size="16" class="fill-current" />
              </button>
            </div>
          </div>

          <div class="p-6 bg-black/60 border border-white/5 rounded-2xl h-[450px] flex flex-col backdrop-blur-md">
            <h3 class="text-red-500/70 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <Terminal :size="14" /> AUDIT_PARAMETERS
            </h3>
            <div class="overflow-y-auto custom-scroll pr-2 text-[9px] space-y-4">
              <div v-for="(section, title) in niktoUsage" :key="title">
                <p class="text-red-500/30 mb-2 font-black italic uppercase border-b border-white/5">{{ title }}</p>
                <div v-for="item in section" :key="item.cmd" class="grid grid-cols-3 gap-2 mb-2 text-gray-500">
                  <span class="text-red-400 font-bold">{{ item.cmd }}</span>
                  <span class="col-span-2 leading-tight uppercase">{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main class="col-span-12 lg:col-span-8 space-y-6">
          <div class="flex flex-col h-[500px] bg-black/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl relative">
            <div class="bg-white/[0.07] px-5 py-3 border-b border-white/10 flex justify-between items-center relative z-10">
              <span class="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                Standard_Output // Nikto
              </span>
              <span v-if="isRunning" class="text-[8px] animate-pulse text-red-500 font-bold uppercase">Uplink_Active</span>
            </div>
            
            <div class="p-6 overflow-y-auto custom-scroll flex-grow font-mono text-xs relative z-10">
              <div v-if="output" class="text-red-400/90 whitespace-pre-wrap animate-reveal">
                <span class="text-red-900 block mb-6 text-[10px] p-3 bg-red-950/20 border-l-2 border-red-700 italic uppercase">
                  # {{ executedCmd }}
                </span>
                {{ output }}
              </div>
              <div v-else-if="isRunning" class="h-full flex flex-col items-center justify-center gap-4 text-red-500/20">
                <Radar :size="80" class="animate-spin-slow" />
                <span class="animate-pulse tracking-[0.4em] uppercase text-[12px]">Probing_Headers...</span>
              </div>
              <div v-else class="h-full flex items-center justify-center text-white/5 uppercase tracking-[0.5em] text-[10px]">
                Awaiting_Auditor_Input
              </div>
            </div>
          </div>

          <div class="p-6 bg-red-500/[0.08] border border-red-500/30 rounded-2xl relative backdrop-blur-md shadow-lg shadow-red-500/5">
            <h3 class="text-red-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <BrainCircuit :size="14" /> Neural_Vulnerability_Engine
            </h3>
            <div class="min-h-[120px]">
              <div v-if="isAnalyzing && !aiOutput" class="flex items-center gap-3 text-red-400/50 italic text-[10px] animate-pulse">
                <Loader2 :size="14" class="animate-spin" />
                CORRELATING_ATTACK_VECTORS...
              </div>
              <div v-else-if="aiOutput" class="text-gray-300 text-xs leading-relaxed font-mono whitespace-pre-wrap border-l border-red-500/50 pl-4">
                 {{ aiOutput }}<span v-if="isTyping" class="w-1.5 h-3 bg-red-500 inline-block ml-1 animate-pulse"></span>
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
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { ChevronLeft, ShieldAlert, Loader2, Radar, BrainCircuit, Terminal, Square } from 'lucide-vue-next';
import { extractNiktoFindings } from '~/utils/niktoEngine';

const router = useRouter();
const target = ref('');
const selectedMode = ref('quick');
const customFlags = ref('');
const output = ref('');
const aiOutput = ref('');
const isRunning = ref(false);
const isAnalyzing = ref(false);
const isTyping = ref(false);
const selectedModel = ref('qwen2.5:7b'); // Defaulted
const executedCmd = ref('');

// Guard State
const showGuard = ref(false);
const pendingRoute = ref<string | null>(null);

const scanModes = [
  { id: 'quick', label: 'Quick Scan' },
  { id: 'full', label: 'Full Scan' },
  { id: 'secure', label: 'SSL Audit' },
  { id: 'custom', label: 'Manual' },
];

const niktoUsage = {
  "Discovery": [
    { cmd: "-h", desc: "Target host or URL" },
    { cmd: "-p", desc: "Port list (80,443)" },
    { cmd: "-ssl", desc: "Force SSL mode" }
  ],
  "Scanning": [
    { cmd: "-Tuning", desc: "Optimization (1-9)" },
    { cmd: "-C all", desc: "CGI Directory scan" },
    { cmd: "-nointeractive", desc: "Disable prompts" }
  ]
};

/**
 * Navigation Guard logic
 */
onBeforeRouteLeave((to, from, next) => {
  if (isRunning.value) {
    showGuard.value = true;
    pendingRoute.value = to.path;
    next(false);
  } else {
    next();
  }
});

const confirmAbort = async () => {
  await cancelScan();
  showGuard.value = false;
  if (pendingRoute.value) {
    router.push(pendingRoute.value);
  }
};

const handleBack = () => {
  if (isRunning.value) {
    showGuard.value = true;
    pendingRoute.value = '/recon';
  } else {
    router.push('/recon');
  }
};

const cancelScan = async () => {
  try {
    await $fetch('/api/recon', {
      method: 'POST',
      body: { action: 'cancel', target: target.value, tool: 'nikto' }
    });
    isRunning.value = false;
    output.value += "\n\n[SYSTEM]: SIGINT_RECEIVED // UPLINK_TERMINATED";
  } catch (e) {
    console.error("Cancellation failed", e);
    isRunning.value = false;
  }
};

const executeScan = async () => {
  if (!target.value || isRunning.value) return;
  isRunning.value = true;
  output.value = '';
  aiOutput.value = '';

  try {
    const data: any = await $fetch('/api/recon', {
      method: 'POST',
      body: { 
        tool: 'nikto', 
        target: target.value, 
        mode: selectedMode.value,
        customFlags: customFlags.value 
      }
    });
    
    if (data.success) {
      output.value = data.output;
      executedCmd.value = data.command_executed;
      
      const features = extractNiktoFindings(data.output);
      isAnalyzing.value = true;
      
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          featureData: features,
          model: selectedModel.value 
        })
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      isAnalyzing.value = false;
      isTyping.value = true;

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            if (json.response) aiOutput.value += json.response;
          } catch (e) {}
        }
      }
      isTyping.value = false;
    }
  } catch (e: any) {
    output.value = `[FATAL]: ${e.message}`;
  } finally {
    isRunning.value = false;
    isAnalyzing.value = false;
  }
};
</script>

<style scoped>
.cyber-input-red { @apply w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 focus:border-red-500/50 outline-none transition-all text-red-400 font-bold placeholder-white/10 shadow-inner; }
.mode-tab-red { @apply p-3 rounded-xl border border-white/5 bg-white/[0.02] text-[9px] font-black uppercase text-gray-500 hover:border-red-500/30 transition-all flex items-center justify-center; }
.mode-tab-red.active { @apply bg-red-600 border-red-400 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]; }
.execute-trigger-red { @apply py-4 bg-red-600 hover:bg-red-500 text-black font-black uppercase tracking-[0.3em] rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50; }
.custom-scroll::-webkit-scrollbar { width: 3px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #ef444444; border-radius: 10px; }
@keyframes pulse-slow { 0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.1); } }
.animate-pulse-slow { animation: pulse-slow 6s infinite ease-in-out; }
.animate-spin-slow { animation: spin 10s linear infinite; }
.animate-reveal { animation: reveal 0.4s ease-out forwards; }
@keyframes reveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>