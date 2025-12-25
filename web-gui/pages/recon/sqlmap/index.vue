<template>
  <div class="min-h-screen bg-[#050505] text-white font-mono p-4 lg:p-8 selection:bg-lime-500/30 overflow-x-hidden relative">
    
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute inset-0 bg-[#050505]" />
      <div class="absolute inset-0 bg-[linear-gradient(rgba(132,204,22,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(132,204,22,0.15)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-lime-600/10 blur-[160px] rounded-full animate-pulse-slow" />
    </div>

    <Transition name="fade">
      <div v-if="showExitModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
        <div class="bg-[#0a0a0a] border border-lime-500/50 p-8 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(132,204,22,0.2)] text-center relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent shadow-[0_0_15px_#84cc16]"></div>
          <ShieldAlert :size="48" class="text-lime-500 mx-auto mb-4 animate-pulse" />
          <h2 class="text-lime-500 font-black tracking-widest uppercase mb-2">Injection_In_Progress</h2>
          <p class="text-gray-400 text-[10px] mb-8 leading-relaxed uppercase">
            Uplink to SQLmap engine is active. Aborting now will lose all harvested database metadata. Confirm termination?
          </p>
          <div class="grid grid-cols-2 gap-4">
            <button @click="showExitModal = false" class="py-3 border border-white/10 rounded-xl hover:bg-white/5 uppercase text-[10px] font-black transition-all">Maintain_Link</button>
            <button @click="confirmExit" class="py-3 bg-lime-600 text-black rounded-xl hover:bg-lime-500 uppercase text-[10px] font-black transition-all shadow-lg shadow-lime-600/20">Abort_Mission</button>
          </div>
        </div>
      </div>
    </Transition>

    <div class="relative z-10">
      <header class="max-w-[1600px] mx-auto mb-8 flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <button @click="handleBackClick" class="text-[9px] font-black text-lime-500/60 hover:text-lime-400 tracking-[0.3em] uppercase flex items-center gap-1 mb-2 transition-all">
            <ChevronLeft :size="12" /> RETURN_TO_ARSENAL
          </button>
          <h1 class="text-5xl font-black italic uppercase tracking-tighter flex items-center gap-3">
            SQLmap_Engine <span class="text-xs not-italic font-light text-lime-500/30 tracking-normal pt-2">v.1.8_Heuristic</span>
          </h1>
        </div>
        
        <div class="bg-lime-500/10 border border-lime-500/30 px-6 py-3 rounded-xl backdrop-blur-md flex items-center gap-4">
          <div :class="['w-2.5 h-2.5 rounded-full', isRunning ? 'bg-lime-500 animate-pulse shadow-[0_0_10px_#84cc16]' : 'bg-white/20']"></div>
          <div class="text-right">
            <p class="text-[8px] font-black text-lime-500 uppercase tracking-widest leading-none mb-1">Injection_Status</p>
            <p class="text-[10px] font-bold uppercase">{{ isRunning ? 'Probing_Database' : 'Engine_Idle' }}</p>
          </div>
        </div>
      </header>

      <div class="max-w-[1600px] mx-auto grid grid-cols-12 gap-8">
        
        <aside class="col-span-12 lg:col-span-4 space-y-6">
          <div class="p-6 bg-white/[0.04] border border-white/10 rounded-2xl space-y-4 shadow-2xl backdrop-blur-xl">
            <div class="space-y-2">
              <label class="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Target_URL</label>
              <input v-model="target" :disabled="isRunning" placeholder="http://target.com/id=1" class="cyber-input-lime" />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button v-for="mode in scanModes" :key="mode.id" @click="!isRunning && (selectedMode = mode.id)"
                :class="['mode-tab-lime', selectedMode === mode.id ? 'active' : '']">
                {{ mode.label }}
              </button>
            </div>

            <div v-if="selectedMode === 'custom'" class="animate-reveal space-y-2">
              <label class="text-[9px] font-black text-lime-500/50 uppercase tracking-[0.2em]">Injection_Flags</label>
              <input v-model="customFlags" :disabled="isRunning" placeholder="--dbs --batch --random-agent" class="cyber-input-lime text-xs" />
            </div>

            <div class="flex gap-2">
              <button @click="executeScan" :disabled="isRunning || !target" class="execute-trigger-lime flex-grow relative overflow-hidden group">
                <component :is="isRunning ? 'Loader2' : 'Database'" :class="isRunning ? 'animate-spin' : ''" :size="16" />
                {{ isRunning ? 'INJECTING...' : 'START_DB_PROBE' }}
              </button>
              
              <button v-if="isRunning" @click="cancelScan" class="px-4 bg-red-600/20 border border-red-600/40 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                <X :size="18" />
              </button>
            </div>
          </div>

          <div class="p-6 bg-black/60 border border-white/5 rounded-2xl h-[480px] flex flex-col backdrop-blur-md">
            <h3 class="text-lime-500/70 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <Terminal :size="14" /> PARAMETER_REFERENCE
            </h3>
            <div class="overflow-y-auto custom-scroll pr-2 text-[9px] space-y-4">
              <div v-for="(section, title) in sqlmapUsage" :key="title">
                <p class="text-lime-500/30 mb-2 font-black italic uppercase border-b border-white/5 pb-1">{{ title }}</p>
                <div v-for="item in section" :key="item.cmd" class="grid grid-cols-3 gap-2 mb-2 text-gray-500">
                  <span class="text-lime-400 font-bold">{{ item.cmd }}</span>
                  <span class="col-span-2 leading-tight uppercase">{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main class="col-span-12 lg:col-span-8 space-y-6">
          <div class="flex flex-col h-[500px] bg-black/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl relative">
            <div class="bg-white/[0.07] px-5 py-3 border-b border-white/10 flex justify-between items-center relative z-10">
              <span class="text-[10px] font-black text-lime-400 uppercase tracking-widest flex items-center gap-2">
                SQLmap_Shell_Output
              </span>
              <span v-if="isRunning" class="text-[8px] animate-pulse text-lime-500 font-bold border border-lime-500/30 px-2 py-0.5 rounded">UPLINK_LIVE</span>
            </div>
            
            <div class="p-6 overflow-y-auto custom-scroll flex-grow font-mono text-xs relative z-10">
              <div v-if="output" class="text-lime-400/90 whitespace-pre-wrap animate-reveal">
                <span class="text-lime-900 block mb-6 text-[10px] p-3 bg-lime-950/20 border-l-2 border-lime-700 italic uppercase">
                  # {{ executedCmd }}
                </span>
                {{ output }}
              </div>
              <div v-else-if="isRunning" class="h-full flex flex-col items-center justify-center gap-4 text-lime-500/20">
                <Radar :size="80" class="animate-spin-slow" />
                <span class="animate-pulse tracking-[0.4em] uppercase text-[12px]">Fuzzing_Parameters...</span>
              </div>
              <div v-else class="h-full flex items-center justify-center text-white/5 uppercase tracking-[0.5em] text-[10px]">
                Awaiting_Injection_Target
              </div>
            </div>
          </div>

          <div class="p-6 bg-lime-500/[0.08] border border-lime-500/30 rounded-2xl relative backdrop-blur-md shadow-lg shadow-lime-500/5">
            <h3 class="text-lime-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <BrainCircuit :size="14" /> Neural_Vulnerability_Engine
            </h3>
            <div class="min-h-[120px]">
              <div v-if="isAnalyzing && !aiOutput" class="flex items-center gap-3 text-lime-400/50 italic text-[10px] animate-pulse">
                <Loader2 :size="14" class="animate-spin" />
                ANALYZING_DATABASE_SCHEMA_VULNS...
              </div>
              <div v-else-if="aiOutput" class="text-gray-300 text-xs leading-relaxed font-mono whitespace-pre-wrap border-l border-lime-500/50 pl-4">
                 {{ aiOutput }}<span v-if="isTyping" class="w-1.5 h-3 bg-lime-500 inline-block ml-1 animate-pulse"></span>
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
import { ChevronLeft, ShieldAlert, Loader2, Radar, BrainCircuit, Terminal, X, Database } from 'lucide-vue-next';
import { extractSqlmapFindings } from '~/utils/sqlmapEngine';

const router = useRouter();
const target = ref('');
const selectedMode = ref('probe');
const customFlags = ref('');
const output = ref('');
const aiOutput = ref('');
const isRunning = ref(false);
const isAnalyzing = ref(false);
const isTyping = ref(false);
const executedCmd = ref('');
const showExitModal = ref(false);

const scanModes = [
  { id: 'probe', label: 'Quick Probe' },
  { id: 'dbs', label: 'Enumerate DBs' },
  { id: 'tables', label: 'Dump Tables' },
  { id: 'custom', label: 'Manual' },
];

const sqlmapUsage = {
  "Enumeration": [
    { cmd: "--dbs", desc: "List databases" },
    { cmd: "--tables", desc: "List tables" },
    { cmd: "--columns", desc: "List columns" }
  ],
  "Techniques": [
    { cmd: "--technique", desc: "BEUSTQ (Default all)" },
    { cmd: "--level", desc: "Test depth (1-5)" },
    { cmd: "--risk", desc: "Risk level (1-3)" }
  ],
  "Optimization": [
    { cmd: "--threads", desc: "Max threads (10)" },
    { cmd: "--batch", desc: "Never ask for input" }
  ]
};

// Guard
onBeforeRouteLeave((to, from, next) => {
  if (isRunning.value) {
    showExitModal.value = true;
    next(false);
  } else {
    next();
  }
});

const handleBackClick = () => isRunning.value ? (showExitModal.value = true) : router.push('/recon');
const confirmExit = async () => { await cancelScan(); isRunning.value = false; showExitModal.value = false; router.push('/recon'); };

const cancelScan = async () => {
  try {
    await $fetch('/api/recon', { method: 'POST', body: { action: 'cancel', target: target.value, tool: 'sqlmap' } });
    isRunning.value = false;
    output.value += "\n\n[SYSTEM]: SIGINT_RECEIVED // ENGINE_DISENGAGED";
  } catch (e) { isRunning.value = false; }
};

const executeScan = async () => {
  if (!target.value || isRunning.value) return;
  isRunning.value = true;
  output.value = '';
  aiOutput.value = '';

  try {
    const data: any = await $fetch('/api/recon', {
      method: 'POST',
      body: { tool: 'sqlmap', target: target.value, mode: selectedMode.value, customFlags: customFlags.value }
    });
    
    if (data.success) {
      output.value = data.output;
      executedCmd.value = data.command_executed;
      
      const features = extractSqlmapFindings(data.output);
      isAnalyzing.value = true;
      
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featureData: features })
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
.cyber-input-lime { @apply w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 focus:border-lime-500/50 outline-none transition-all text-lime-400 font-bold placeholder-white/10 shadow-inner; }
.mode-tab-lime { @apply p-3 rounded-xl border border-white/5 bg-white/[0.02] text-[9px] font-black uppercase text-gray-500 hover:border-lime-500/30 transition-all flex items-center justify-center; }
.mode-tab-lime.active { @apply bg-lime-600 border-lime-400 text-white shadow-[0_0_20px_rgba(132,204,22,0.4)]; }
.execute-trigger-lime { @apply py-4 bg-lime-600 hover:bg-lime-500 text-black font-black uppercase tracking-[0.3em] rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50; }
.custom-scroll::-webkit-scrollbar { width: 3px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #84cc1644; border-radius: 10px; }
@keyframes pulse-slow { 0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.1); } }
.animate-pulse-slow { animation: pulse-slow 6s infinite ease-in-out; }
.animate-spin-slow { animation: spin 10s linear infinite; }
.animate-reveal { animation: reveal 0.4s ease-out forwards; }
@keyframes reveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>