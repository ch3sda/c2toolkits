<template>
  <div class="min-h-screen bg-[#050505] text-white font-mono relative overflow-hidden selection:bg-purple-500/30">
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-[#0a0510] via-[#050505] to-[#0d071a]" />
      <div class="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid opacity-30" />
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full animate-pulse" />
    </div>
    
    <div class="scan-line opacity-40" />

    <div class="relative z-10 container mx-auto px-6 py-10 max-w-6xl">
      <header class="mb-12 border-b border-white/5 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-slide-down">
        <div class="space-y-4">
          <NuxtLink to="/" class="group text-purple-400 hover:text-purple-300 text-[10px] font-black tracking-[0.4em] uppercase transition-all flex items-center gap-3">
            <ChevronLeft :size="14" class="group-hover:-translate-x-1 transition-transform" /> Back to C2Toolkits
          </NuxtLink>
          <div class="relative">
            <h1 class="text-6xl font-black tracking-tighter uppercase italic bg-gradient-to-b from-white via-purple-100 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              IDENTIFIER_OS
            </h1>
            <div class="absolute -bottom-2 left-0 w-24 h-[2px] bg-purple-500" />
          </div>
        </div>
        
        <div class="flex items-center gap-4 bg-black/40 border border-white/5 p-4 rounded-xl backdrop-blur-md">
          <div class="text-right">
            <p class="text-[9px] text-purple-500 font-bold tracking-widest uppercase mb-1">Engine Status</p>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]" />
              <span class="text-xs font-black text-white tracking-widest uppercase italic">Active_Heuristics</span>
            </div>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 gap-12">
        
        <section class="grid lg:grid-cols-2 gap-8 items-start reveal-animate">
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="relative p-3 bg-black border border-white/10 rounded-xl">
                <Hash :size="20" class="text-purple-400" />
              </div>
              <h2 class="text-xl font-black uppercase italic text-white tracking-widest">Hash Analysis</h2>
            </div>
            <div class="relative group">
              <textarea v-model="hashInput" placeholder="PASTE_MD5_SHA_OR_NTLM..." class="cyber-input" />
              <div class="absolute bottom-4 right-4 text-[9px] text-white/20 font-black tracking-widest uppercase">MTX_SCANNER_V1</div>
            </div>
            <button @click="process('hash')" class="btn-execute-purple group">
              <Zap class="mr-2 group-hover:animate-bounce" :size="16" /> EXECUTE_SIGNATURE_SCAN
            </button>
          </div>

          <div class="cyber-card">
            <div class="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
               <span class="text-[10px] font-black tracking-[0.3em] text-purple-400 uppercase italic">Analysis_Output</span>
               <div class="flex gap-1.5"><div v-for="i in 3" :key="i" class="w-1 h-1 rounded-full bg-white/10" /></div>
            </div>
            <div v-if="hashResults.length" class="space-y-6">
              <div v-for="(r, idx) in hashResults" :key="r.type" class="stagger-reveal" :style="{ animationDelay: `${idx * 100}ms` }">
                <div class="flex justify-between items-end mb-2">
                  <span class="text-[11px] font-black text-white/90 tracking-widest uppercase italic">{{ r.type }}</span>
                  <span class="text-xs font-mono text-purple-400 font-bold">{{ r.score }}%</span>
                </div>
                <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div class="h-full bg-gradient-to-r from-purple-600 to-cyan-400 progress-grow" :style="{ width: r.score + '%' }" />
                </div>
              </div>
            </div>
            <div v-else class="h-32 flex flex-col items-center justify-center italic text-white/20 text-[10px] tracking-[0.5em]">
              Awaiting_Hash_Buffer...
            </div>
          </div>
        </section>

        <section class="grid lg:grid-cols-2 gap-8 items-start reveal-animate" style="animation-delay: 0.2s">
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="relative p-3 bg-black border border-white/10 rounded-xl">
                <Code :size="20" class="text-cyan-400" />
              </div>
              <h2 class="text-xl font-black uppercase italic text-white tracking-widest">Encoding Detector</h2>
            </div>
            <div class="relative group">
              <textarea v-model="encodeInput" placeholder="PASTE_ENCODED_STREAM..." class="cyber-input focus:border-cyan-500/40" />
              <div class="absolute bottom-4 right-4 text-[9px] text-white/20 font-black tracking-widest uppercase">ENTROPY_DET_V2</div>
            </div>
            <button @click="process('encode')" class="btn-execute-cyan group">
              <Binary class="mr-2 group-hover:rotate-12 transition-transform" :size="16" /> DECODE_ENTROPY_BUFFER
            </button>
          </div>

          <div class="cyber-card border-cyan-500/10">
            <div class="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
               <span class="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase italic">Detection_Map</span>
               <div class="flex gap-1.5"><div v-for="i in 3" :key="i" class="w-1 h-1 rounded-full bg-white/10" /></div>
            </div>
            <div v-if="encodeResults.length" class="space-y-6">
              <div v-for="(r, idx) in encodeResults" :key="r.type" class="stagger-reveal" :style="{ animationDelay: `${idx * 100}ms` }">
                <div class="flex justify-between items-end mb-2">
                  <span class="text-[11px] font-black text-white/90 tracking-widest uppercase italic">{{ r.type }}</span>
                  <span class="text-xs font-mono text-cyan-400 font-bold">{{ r.score }}%</span>
                </div>
                <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div class="h-full bg-gradient-to-r from-cyan-600 to-purple-400 progress-grow" :style="{ width: r.score + '%' }" />
                </div>
              </div>
            </div>
            <div v-else class="h-32 flex flex-col items-center justify-center italic text-white/20 text-[10px] tracking-[0.5em]">
              Awaiting_Stream_Buffer...
            </div>
          </div>
        </section>

      </div>
      
      <footer class="mt-20 pt-10 border-t border-white/5 text-center">
         <p class="text-[9px] text-white/20 tracking-[0.8em] uppercase italic">Authorized_Personnel_Only // C2_Toolkits_Internal</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Hash, Code, Zap, Binary, ChevronLeft } from 'lucide-vue-next'

const hashInput = ref('')
const encodeInput = ref('')
const hashResults = ref<any[]>([])
const encodeResults = ref<any[]>([])

const process = async (mode: 'hash' | 'encode') => {
  const input = mode === 'hash' ? hashInput.value : encodeInput.value
  if (!input) return

  if (mode === 'hash') hashResults.value = []
  else encodeResults.value = []

  try {
    const res: any = await $fetch('/api/identifier', {
      method: 'POST',
      body: { input, mode }
    })

    if (res.success && res.output.raw) {
      const parsed = res.output.raw.split('\n')
        .map(l => l.trim())
        .filter(l => l.includes('->'))
        .map(l => {
          const [type, scoreStr] = l.split('->').map(s => s.trim())
          const scoreValue = parseInt(scoreStr.replace('%', ''))
          return { type, score: isNaN(scoreValue) ? 0 : scoreValue }
        })
      
      if (mode === 'hash') hashResults.value = parsed
      else encodeResults.value = parsed
    }
  } catch (e) {
    console.error("System Failure", e)
  }
}
</script>

<style scoped>
@keyframes grid { 0% { transform: translateY(0); } 100% { transform: translateY(50px); } }
.animate-grid { animation: grid 15s linear infinite; }

@keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }
.scan-line {
  position: absolute;
  left: 0; right: 0; height: 100px;
  background: linear-gradient(transparent, rgba(147,51,234,0.08), transparent);
  animation: scan 8s linear infinite;
  pointer-events: none; z-index: 5;
}

.cyber-input {
  @apply w-full h-40 bg-black/60 border border-white/10 rounded-xl p-6 text-sm outline-none transition-all 
         placeholder-white/10 font-mono text-white focus:border-purple-500/50 backdrop-blur-sm shadow-inner;
}

.cyber-card {
  @apply bg-black/40 border border-white/5 rounded-2xl p-8 min-h-[280px] backdrop-blur-xl shadow-2xl;
}

.btn-execute-purple {
  @apply w-full py-4 bg-purple-600 border border-purple-400 rounded-xl font-black text-[10px] tracking-[0.3em] 
         uppercase transition-all flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:bg-purple-500 active:scale-[0.98];
}

.btn-execute-cyan {
  @apply w-full py-4 bg-cyan-600 border border-cyan-400 rounded-xl font-black text-[10px] tracking-[0.3em] 
         uppercase transition-all flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:bg-cyan-500 active:scale-[0.98];
}

@keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes reveal { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes progress { from { width: 0; } }

.animate-slide-down { animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.reveal-animate { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.stagger-reveal { animation: reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
.progress-grow { animation: progress 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>