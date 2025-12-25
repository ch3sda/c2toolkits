<template>
  <div class="min-h-screen bg-[#050505] text-white font-mono p-4 lg:p-8 selection:bg-indigo-500/30 overflow-x-hidden relative">
    
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute inset-0 bg-[#050505]" />
      <div class="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.15)_1px,transparent_1px)] bg-[size:60px_60px] opacity-80" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/10 blur-[160px] rounded-full animate-pulse-slow" />
    </div>

    <div class="relative z-10">
      <header class="max-w-[1600px] mx-auto mb-8 flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <button @click="handleBack" class="text-[9px] font-black text-indigo-500/60 hover:text-indigo-400 tracking-[0.3em] uppercase flex items-center gap-1 mb-2 transition-all">
            <ChevronLeft :size="12" /> RETURN_TO_ARSENAL
          </button>
          <h1 class="text-5xl font-black italic uppercase tracking-tighter flex items-center gap-3">
            Subfinder_Core <span class="text-xs not-italic font-light text-indigo-500/30 tracking-normal pt-2">v.2.6_AI</span>
          </h1>
        </div>
        
        <div class="bg-indigo-500/10 border border-indigo-500/30 px-4 py-3 rounded-xl backdrop-blur-md flex items-center gap-4 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
          <div :class="['w-2 h-2 rounded-full', isRunning ? 'bg-indigo-500 animate-pulse shadow-[0_0_10px_#6366f1]' : 'bg-white/20']"></div>
          <div class="text-right">
            <p class="text-[8px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">Discovery_Status</p>
            <p class="text-[10px] font-bold uppercase">{{ isRunning ? 'Querying_APIs' : 'System_Ready' }}</p>
          </div>
        </div>
      </header>

      <div class="max-w-[1600px] mx-auto grid grid-cols-12 gap-8">
        
        <aside class="col-span-12 lg:col-span-4 space-y-6">
          <div class="p-6 bg-white/[0.04] border border-white/10 rounded-2xl space-y-4 shadow-2xl backdrop-blur-xl">
            <div class="space-y-2">
              <label class="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Root_Domain</label>
              <input v-model="target" :disabled="isRunning" placeholder="example.com" class="cyber-input-indigo" />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button v-for="mode in scanModes" :key="mode.id" @click="!isRunning && (selectedMode = mode.id)"
                :class="['mode-tab-indigo', selectedMode === mode.id ? 'active' : '']">
                {{ mode.label }}
              </button>
            </div>

            <div v-if="selectedMode === 'custom'" class="animate-reveal space-y-2">
              <label class="text-[9px] font-black text-indigo-500/50 uppercase tracking-[0.2em]">Manual_Injection_Flags</label>
              <input v-model="customFlags" :disabled="isRunning" placeholder="-all -recursive -silent" class="cyber-input-indigo text-xs" />
            </div>

            <div class="flex gap-2">
              <button @click="executeScan" :disabled="isRunning || !target" class="execute-trigger-indigo flex-grow relative overflow-hidden group">
                <component :is="isRunning ? 'Loader2' : 'Globe'" :class="isRunning ? 'animate-spin' : ''" :size="16" />
                {{ isRunning ? 'ENUMERATING...' : 'START_DISCOVERY' }}
              </button>
              
              <button v-if="isRunning" @click="cancelScan" class="px-4 bg-red-500/20 border border-red-500/50 hover:bg-red-500 hover:text-white text-red-500 rounded-xl transition-all flex items-center justify-center group" title="Terminate Process">
                <Square :size="16" class="fill-current" />
              </button>
            </div>
          </div>

          <div class="p-6 bg-black/60 border border-white/5 rounded-2xl h-[450px] flex flex-col backdrop-blur-md">
            <h3 class="text-indigo-500/70 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <Terminal :size="14" /> MISSION_GUIDE
            </h3>
            
            <div class="flex-grow space-y-6">
              <div :class="['transition-all duration-500', !target ? 'opacity-100 scale-100' : 'opacity-30 scale-95']">
                <p class="text-indigo-400 text-[10px] font-bold mb-1">STEP_01: TARGET_IDENTIFICATION</p>
                <p class="text-gray-500 text-[9px]">Enter a root domain (e.g., target.com). Do not include http/https protocols.</p>
              </div>

              <div :class="['transition-all duration-500', isRunning ? 'opacity-100 translate-x-2' : 'opacity-10 white/5']">
                <p class="text-indigo-400 text-[10px] font-bold mb-1">STEP_02: PASSIVE_COLLECTION</p>
                <p class="text-gray-500 text-[9px]">Subfinder is querying API providers. Do not navigate away from this page.</p>
              </div>

              <div :class="['transition-all duration-500', (aiOutput && !isRunning) ? 'opacity-100 border-l-2 border-indigo-500 pl-3' : 'opacity-10']">
                <p class="text-indigo-400 text-[10px] font-bold mb-1">STEP_03: NEURAL_ASSESSMENT</p>
                <p class="text-gray-500 text-[9px]">Review the AI assessment for high-value attack vectors.</p>
              </div>
            </div>

            <div class="mt-auto pt-4 border-t border-white/5">
              <p class="text-[8px] text-indigo-500/40 uppercase italic tracking-tighter">Current_Task: {{ currentTaskStatus }}</p>
            </div>
          </div>
        </aside>

        <main class="col-span-12 lg:col-span-8 space-y-6">
          <div class="flex flex-col h-[600px] bg-black/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl relative">
            <div class="bg-white/[0.07] px-5 py-3 border-b border-white/10 flex justify-between items-center relative z-10">
              <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                Standard_Output // Subfinder
              </span>
              <span v-if="isRunning" class="text-[8px] animate-pulse text-indigo-500 font-bold uppercase tracking-tighter">Process_ID: ACTIVE</span>
            </div>
            
            <div class="p-6 overflow-y-auto custom-scroll flex-grow font-mono text-sm relative z-10">
              <div v-if="output" class="text-indigo-400/90 whitespace-pre-wrap animate-reveal">
                <span class="text-indigo-700 block mb-6 text-xs p-3 bg-indigo-950/30 border-l-2 border-indigo-700 italic uppercase">
                  # {{ executedCmd }}
                </span>
                {{ output }}
              </div>
              <div v-else-if="isRunning" class="h-full flex flex-col items-center justify-center gap-4 text-indigo-500/20">
                <Radar :size="80" class="animate-spin-slow" />
                <span class="animate-pulse tracking-[0.4em] uppercase text-[12px]">Scraping_Global_Datasets...</span>
              </div>
              <div v-else class="h-full flex items-center justify-center text-white/5 uppercase tracking-[0.5em] text-[10px]">
                Awaiting_Domain_Uplink
              </div>
            </div>
          </div>

          <div class="p-6 bg-indigo-500/[0.08] border border-indigo-500/30 rounded-2xl relative backdrop-blur-md shadow-lg">
            <h3 class="text-indigo-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <BrainCircuit :size="14" /> AI_Heuristic_Engine
            </h3>
            <div class="min-h-[120px]">
              <div v-if="isAnalyzing && !aiOutput" class="flex items-center gap-3 text-indigo-400/50 italic text-[10px] animate-pulse">
                <Loader2 :size="14" class="animate-spin" />
                ANALYZING_FOUND_SUBDOMAINS...
              </div>
              <div v-else-if="aiOutput" class="text-gray-300 text-xs leading-relaxed font-mono whitespace-pre-wrap border-l border-indigo-500/50 pl-4">
                 {{ aiOutput }}<span v-if="isTyping" class="w-1.5 h-3 bg-indigo-500 inline-block ml-1 animate-pulse"></span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { ChevronLeft, Globe, Loader2, Radar, BrainCircuit, Terminal, Square } from 'lucide-vue-next';
import { analyzeSubdomains } from '~/utils/subfinderEngine';

const router = useRouter();
const target = ref('');
const selectedMode = ref('passive');
const customFlags = ref('');
const output = ref('');
const isRunning = ref(false);
const executedCmd = ref('');
const aiOutput = ref('');
const isAnalyzing = ref(false);
const isTyping = ref(false);

const scanModes = [
  { id: 'passive', label: 'Passive Only' },
  { id: 'all', label: 'All Sources' },
  { id: 'recursive', label: 'Recursive' },
  { id: 'custom', label: 'Custom' },
];

// Navigation Guard: Block leaving if running
onBeforeRouteLeave((to, from, next) => {
  if (isRunning.value) {
    const confirm = window.confirm("A discovery process is currently active. Leaving will not stop the process on the server. Do you want to continue?");
    if (confirm) next();
    else next(false);
  } else {
    next();
  }
});

const handleBack = () => {
  if (isRunning.value) {
    if (window.confirm("Active process detected. Cancel scan first?")) {
      cancelScan();
      router.push('/recon');
    }
  } else {
    router.push('/recon');
  }
};

const currentTaskStatus = computed(() => {
  if (!target.value) return 'WAITING_FOR_TARGET';
  if (isRunning.value) return 'COLLECTING_RECORDS';
  if (isAnalyzing.value || isTyping.value) return 'NEURAL_PROCESSING';
  if (output.value) return 'ANALYSIS_COMPLETE';
  return 'READY';
});

const executeScan = async () => {
  if (!target.value || isRunning.value) return;
  isRunning.value = true;
  output.value = '';
  aiOutput.value = '';

  try {
    const data: any = await $fetch('/api/recon', {
      method: 'POST',
      body: { 
        tool: 'subfinder', 
        target: target.value, 
        mode: selectedMode.value,
        customFlags: customFlags.value 
      }
    });
    
    if (data.success) {
      output.value = data.output;
      executedCmd.value = data.command_executed;
      
      const analyzedData = analyzeSubdomains(data.output);
      isAnalyzing.value = true;
      
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          featureData: { 
            tool: 'subfinder', 
            findings: `TOTAL: ${analyzedData.total}\nSAMPLES:\n${analyzedData.listForAi}`
          } 
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
    } else if (data.cancelled) {
        output.value = ">>> PROCESS_TERMINATED_BY_USER";
    }
  } catch (e: any) {
    output.value = `[FATAL]: ${e.message}`;
  } finally {
    isRunning.value = false;
    isAnalyzing.value = false;
  }
};

const cancelScan = async () => {
  try {
    await $fetch('/api/recon', {
      method: 'POST',
      body: { 
        action: 'cancel', 
        target: target.value,
        tool: 'subfinder'
      }
    });
  } catch (e) {
    console.error("Cancel failed", e);
  }
};
</script>

<style scoped>
.cyber-input-indigo { @apply w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500/50 outline-none transition-all text-indigo-400 font-bold placeholder-white/10 shadow-inner; }
.mode-tab-indigo { @apply p-3 rounded-xl border border-white/5 bg-white/[0.02] text-[9px] font-black uppercase text-gray-500 hover:border-indigo-500/30 transition-all; }
.mode-tab-indigo.active { @apply bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]; }
.execute-trigger-indigo { @apply py-4 bg-indigo-600 hover:bg-indigo-500 text-black font-black uppercase tracking-[0.3em] rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50; }
.custom-scroll::-webkit-scrollbar { width: 3px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #6366f144; border-radius: 10px; }
@keyframes pulse-slow { 0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.1); } }
.animate-pulse-slow { animation: pulse-slow 6s infinite ease-in-out; }
.animate-spin-slow { animation: spin 10s linear infinite; }
.animate-reveal { animation: reveal 0.4s ease-out forwards; }
@keyframes reveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>