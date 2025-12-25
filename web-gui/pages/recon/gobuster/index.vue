<template>
  <div class="min-h-screen bg-[#050505] text-white font-mono p-4 lg:p-8 selection:bg-orange-500/30 overflow-x-hidden relative">
    
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute inset-0 bg-[#050505]" />
      <div class="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(217,119,6,0.15)_1px,transparent_1px)] bg-[size:60px_60px] opacity-80" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange-500/10 blur-[160px] rounded-full animate-pulse-slow" />
    </div>

    <div class="relative z-10">
      <header class="max-w-[1600px] mx-auto mb-8 flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <button @click="router.push('/recon')" class="text-[9px] font-black text-orange-500/60 hover:text-orange-400 tracking-[0.3em] uppercase flex items-center gap-1 mb-2 transition-all">
            <ChevronLeft :size="12" /> RETURN_TO_ARSENAL
          </button>
          <h1 class="text-5xl font-black italic uppercase tracking-tighter flex items-center gap-3">
            Gobuster_Dir <span class="text-xs not-italic font-light text-orange-500/30 tracking-normal pt-2">v.3.6_AI</span>
          </h1>
        </div>
        <div class="bg-orange-500/10 border border-orange-500/30 px-4 py-3 rounded-xl backdrop-blur-md flex items-center gap-4 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
          <div :class="['w-2 h-2 rounded-full', isRunning ? 'bg-orange-500 animate-pulse shadow-[0_0_10px_#f97316]' : 'bg-white/20']"></div>
          <div class="text-right">
            <p class="text-[8px] font-black text-orange-500 uppercase tracking-widest leading-none mb-1">Brute_Force_Status</p>
            <p class="text-[10px] font-bold uppercase">{{ isRunning ? 'Injecting_Wordlist' : 'System_Ready' }}</p>
          </div>
        </div>
      </header>

      <div class="max-w-[1600px] mx-auto grid grid-cols-12 gap-8">
        
        <aside class="col-span-12 lg:col-span-4 space-y-6">
          <div class="p-6 bg-white/[0.04] border border-white/10 rounded-2xl space-y-4 shadow-2xl backdrop-blur-xl">
            <div class="space-y-2">
              <label class="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Target_URL</label>
              <input v-model="target" :disabled="isRunning" placeholder="https://example.com" class="cyber-input-orange" />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button v-for="mode in scanModes" :key="mode.id" @click="!isRunning && (selectedMode = mode.id)"
                :class="['mode-tab-orange', selectedMode === mode.id ? 'active' : '', isRunning ? 'opacity-50 cursor-not-allowed' : '']">
                {{ mode.label }}
              </button>
            </div>

            <div v-if="selectedMode === 'custom'" class="animate-reveal space-y-2">
              <label class="text-[9px] font-black text-orange-500/50 uppercase tracking-[0.2em]">Manual_Injection_Flags</label>
              <input v-model="customFlags" :disabled="isRunning" placeholder="dir -u http://site.com -w list.txt" class="cyber-input-orange text-xs" />
            </div>

            <div class="flex gap-2">
              <button @click="executeScan" :disabled="isRunning || !target" class="execute-trigger-orange flex-grow relative overflow-hidden group">
                <component :is="isRunning ? 'Loader2' : 'Search'" :class="isRunning ? 'animate-spin' : ''" :size="16" />
                {{ isRunning ? 'BRUTING...' : 'START_ENUMERATION' }}
              </button>
            </div>
          </div>

          <div class="p-6 bg-black/60 border border-white/5 rounded-2xl h-[550px] flex flex-col backdrop-blur-md">
            <h3 class="text-amber-500/70 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <BookOpen :size="14" /> WORDLIST_RESOURCES
            </h3>
            <div class="overflow-y-auto custom-scroll pr-2 text-[10px] space-y-5">
              <p class="text-orange-500/50 italic">// Path Database</p>
              <div class="text-gray-500 space-y-2 uppercase">
                <p>Common: /usr/share/seclists/.../common.txt</p>
                <p>Medium: /usr/share/wordlists/.../2.3-medium.txt</p>
                <p>Big: /usr/share/wordlists/.../directory-list-2.3-big.txt</p>
              </div>
            </div>
          </div>
        </aside>

        <main class="col-span-12 lg:col-span-8 space-y-6">
          <div class="flex flex-col h-[700px] bg-black/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl relative group">
            <div class="absolute inset-0 bg-orange-500/[0.03] pointer-events-none"></div>
            
            <div class="bg-white/[0.07] px-5 py-3 border-b border-white/10 flex justify-between items-center relative z-10">
              <span class="text-[10px] font-black text-orange-400 uppercase tracking-widest flex items-center gap-2">
                Standard_Output // Gobuster
              </span>
            </div>
            
            <div class="p-6 overflow-y-auto custom-scroll flex-grow font-mono text-sm relative z-10">
              <div v-if="output" class="text-orange-400/90 whitespace-pre-wrap animate-reveal">
                <span class="text-orange-700 block mb-6 text-xs p-3 bg-orange-950/30 border-l-2 border-orange-700 italic uppercase">
                  # {{ executedCmd }}
                </span>
                {{ output }}
              </div>
              <div v-else-if="isRunning" class="h-full flex flex-col items-center justify-center gap-4 text-orange-500/20">
                <Radar :size="80" class="animate-spin-slow" />
                <span class="animate-pulse tracking-[0.4em] uppercase text-[12px]">Brute_Force_In_Progress...</span>
              </div>
              <div v-else class="h-full flex items-center justify-center text-white/5 uppercase tracking-[0.5em] text-[10px]">
                Awaiting_Handshake
              </div>
            </div>
          </div>

          <div class="p-6 bg-amber-500/[0.08] border border-amber-500/30 rounded-2xl relative backdrop-blur-md overflow-hidden shadow-lg">
            <h3 class="text-amber-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <BrainCircuit :size="14" /> AI_Heuristic_Engine
            </h3>
            <div class="min-h-[100px]">
              <div v-if="isAnalyzing && !aiOutput" class="flex items-center gap-3 text-amber-400/50 italic text-[10px] animate-pulse">
                <Loader2 :size="14" class="animate-spin" />
                ANALYZING_FOUND_PATHS...
              </div>
              <div v-else-if="aiOutput" class="text-gray-300 text-xs leading-relaxed font-mono whitespace-pre-wrap border-l border-amber-500/50 pl-4">
                 {{ aiOutput }}<span v-if="isTyping" class="w-1.5 h-3 bg-amber-500 inline-block ml-1 animate-pulse"></span>
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
import { ChevronLeft, Search, Loader2, Radar, BookOpen, BrainCircuit } from 'lucide-vue-next';

const router = useRouter();
const target = ref('');
const selectedMode = ref('common');
const customFlags = ref('');
const output = ref('');
const isRunning = ref(false);
const executedCmd = ref('');

const aiOutput = ref('');
const isAnalyzing = ref(false);
const isTyping = ref(false);

const scanModes = [
  { id: 'common', label: 'Common' },
  { id: 'medium', label: 'Medium' },
  { id: 'big', label: 'Big List' },
  { id: 'custom', label: 'Custom' },
];

const executeScan = async () => {
  if (!target.value || isRunning.value) return;
  isRunning.value = true;
  output.value = '';
  aiOutput.value = ''; 

  try {
    // 1. Run Gobuster
    const data: any = await $fetch('/api/recon', {
      method: 'POST',
      body: { 
        tool: 'gobuster', 
        target: target.value, 
        mode: selectedMode.value, 
        customFlags: customFlags.value 
      }
    });
    
    if (data.success) {
      const cleanData = data.output.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');
      output.value = cleanData;
      executedCmd.value = data.command_executed;

      // 2. Start Real-time AI Streaming
      isAnalyzing.value = true;
      
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          featureData: {
            tool: 'gobuster',
            findings: cleanData 
          } 
        })
      });

      if (!response.body) throw new Error("No response body");
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      isAnalyzing.value = false; // Hide "Analyzing..." as soon as stream hits
      isTyping.value = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            if (json.response) {
              aiOutput.value += json.response;
            }
          } catch (e) {
            // Partial JSON handle
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
.cyber-input-orange { @apply w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500/50 outline-none transition-all text-orange-400 font-bold placeholder-white/10 shadow-inner; }
.mode-tab-orange { @apply p-3 rounded-xl border border-white/5 bg-white/[0.02] text-[9px] font-black uppercase text-gray-500 hover:border-orange-500/30 transition-all; }
.mode-tab-orange.active { @apply bg-orange-600 border-orange-400 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]; }
.execute-trigger-orange { @apply py-4 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase tracking-[0.3em] rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-orange-900/20; }
.custom-scroll::-webkit-scrollbar { width: 3px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #f9731644; border-radius: 10px; }

@keyframes pulse-slow { 0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.1); } }
.animate-pulse-slow { animation: pulse-slow 6s infinite ease-in-out; }
.animate-spin-slow { animation: spin 10s linear infinite; }
@keyframes reveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.animate-reveal { animation: reveal 0.4s ease-out forwards; }
</style>