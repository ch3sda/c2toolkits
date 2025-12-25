<template>
  <div class="min-h-screen bg-[#050505] text-white font-mono relative overflow-hidden selection:bg-white/20">
<div class="fixed inset-0 z-0">
  <div class="absolute inset-0 bg-[#050505]" />
  
  <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
  
  <div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/[0.03] blur-[140px] rounded-full animate-pulse-white" />
  <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[120px] rounded-full animate-pulse-white" style="animation-delay: 2s" />
</div>
    
    <div class="scan-line opacity-20" />

    <div class="relative z-20 container mx-auto px-8 py-12 max-w-[1440px]">
      <header class="mb-14 border-b border-white/10 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-slide-down">
        <div class="space-y-6">
          <NuxtLink to="/" class="group text-white/50 hover:text-white text-xs font-black tracking-[0.5em] uppercase transition-all flex items-center gap-4">
            <ChevronLeft :size="18" class="group-hover:-translate-x-2 transition-transform" /> Back to Matrix
          </NuxtLink>
          <div class="relative">
            <h1 class="text-7xl md:text-8xl font-black tracking-tighter uppercase italic bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              CIPHER_MATRIX
            </h1>
            <div class="absolute -bottom-3 left-0 w-40 h-[3px] bg-white shadow-[0_0_15px_#fff]" />
          </div>
        </div>
        
        <div class="flex items-center gap-6 bg-white/[0.03] border border-white/20 p-6 rounded-2xl backdrop-blur-xl shadow-2xl relative">
          <div v-if="selectedTool" class="absolute inset-0 rounded-2xl border border-white/40 animate-pulse-white-fast pointer-events-none" />
          <div class="text-right border-r border-white/10 pr-6">
            <p class="text-[10px] text-white/40 font-bold tracking-widest uppercase mb-1">Active Cryptosystem</p>
            <span class="text-sm font-black text-white tracking-[0.2em] uppercase italic">{{ currentTool?.name || 'IDLE_WAIT' }}</span>
          </div>
          <Zap :class="['text-white transition-all', selectedTool ? 'animate-pulse drop-shadow-[0_0_10px_#fff]' : 'opacity-20']" :size="32" />
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 reveal-animate">
<div class="lg:col-span-4 space-y-6">
  <div class="flex items-center gap-3 mb-6">
    <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20" />
    <span class="text-xs font-black text-white/60 tracking-[0.4em] uppercase">Selection_Matrix</span>
  </div>
  
  <div class="grid grid-cols-1 gap-4 max-h-[700px] overflow-y-auto pl-4 pr-8 py-2 custom-scrollbar">
    <button
      v-for="tool in tools"
      :key="tool.id"
      @click="selectedTool = tool.id"
      :class="[
        'group relative flex items-center space-x-4 px-6 py-5 rounded-xl border transition-all duration-300 origin-left',
        selectedTool === tool.id
          ? 'bg-white border-white text-black shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-[1.05] z-20 translate-x-1'
          : 'bg-white/[0.02] border-white/5 hover:border-white/40 hover:bg-white/[0.05] z-10'
      ]"
    >
      <component 
        :is="tool.icon" 
        :size="20" 
        :class="selectedTool === tool.id ? 'text-black' : 'text-white/40 group-hover:scale-110 transition-transform'" 
      />
      <span class="text-sm font-black tracking-widest uppercase italic relative z-10">
        {{ tool.name }}
      </span>
      
      <div v-if="selectedTool === tool.id" class="absolute right-4 w-2 h-2 bg-black rounded-full animate-ping" />
    </button>
  </div>

  <Transition name="fade">
    <div v-if="selectedTool === 'rot13'" class="mt-8 p-6 bg-white/[0.03] border border-white/10 rounded-2xl space-y-4 shadow-xl ml-4 backdrop-blur-xl">
      <label class="text-xs font-black text-white/60 uppercase tracking-[0.2em]">Variable Shift Parameters</label>
      <select v-model="rotOption" class="cyber-select text-xs">
        <option value="rot13">ROT13 (ALPHABETIC_MID)</option>
        <option value="rotn">ROT-N (CUSTOM_OFFSET)</option>
        <option value="bruteforce">BRUTE_FORCE_ITERATE</option>
      </select>
      <input
        v-if="rotOption === 'rotn'"
        type="number"
        v-model.number="rotShift"
        class="cyber-input-small text-sm h-12"
        placeholder="Offset (1-25)"
      />
    </div>
  </Transition>
</div>

        <div class="lg:col-span-8 space-y-8">
          <div class="cyber-card group">
            <div class="flex justify-between items-center mb-6">
              <label class="text-sm font-black text-white uppercase tracking-widest italic flex items-center">
                <Terminal :size="18" class="mr-3 text-white/60" /> Raw_Data_Buffer
              </label>
              <span class="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">Input_Stream_v4.2</span>
            </div>
            
            <textarea
              v-model="input"
              placeholder="PASTE_ENCRYPTED_OR_PLAINTEXT_PAYLOAD_HERE..."
              class="cyber-textarea h-64 text-base"
            />
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <button
                @click="handleEncode"
                :disabled="!selectedTool || !input"
                class="btn-execute-white h-16 text-[10px]"
              >
                <Unlock :size="20" class="mr-3" /> EXECUTE_ENCODE
              </button>
              <button
                v-if="currentTool?.hasDecode"
                @click="handleDecode"
                :disabled="!input"
                class="btn-execute-white h-16 text-[10px]"
              >
                <Lock :size="20" class="mr-3" /> EXECUTE_DECODE
              </button>
              <button
                @click="clearAll"
                class="h-16 bg-red-600/5 border border-red-500/20 hover:bg-red-600/20 hover:border-red-500/50 rounded-xl font-black text-[10px] tracking-[0.3em] transition-all uppercase text-red-500/60"
              >
                PURGE_CACHE
              </button>
            </div>
          </div>

          <Transition name="hero">
            <div v-if="output" class="cyber-card border-white/20 bg-white/[0.02]">
              <div class="flex items-center justify-between mb-6 border-b border-white/10 pb-6">
                <label class="text-sm font-black text-white uppercase tracking-widest italic flex items-center">
                  <ShieldCheck :size="18" class="mr-3 text-white/60" /> Result_Checksum_Verified
                </label>
                <button
                  @click="copyToClipboard"
                  class="px-6 py-2 bg-white/10 border border-white/20 hover:bg-white hover:text-black rounded-lg text-xs font-black uppercase tracking-widest transition-all"
                >
                  {{ copied ? 'STREAM_COPIED' : 'COPY_OUTPUT' }}
                </button>
              </div>
              <div class="bg-black/60 rounded-xl p-8 font-mono text-white text-base break-all whitespace-pre-wrap leading-relaxed border border-white/5 shadow-inner">
                {{ output }}
              </div>
            </div>
          </Transition>

          <div class="bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-md">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-2 h-2 bg-white rounded-full animate-ping shadow-[0_0_8px_#fff]" />
              <span class="text-xs font-black text-white/80 uppercase tracking-[0.5em]">System_Operations_Log</span>
            </div>
            <div class="space-y-4">
              <div v-for="(item, i) in history" :key="i" class="flex items-center justify-between text-xs border-b border-white/5 pb-3 last:border-0 opacity-40 hover:opacity-100 transition-opacity">
                <div class="flex items-center gap-6">
                  <span class="text-white/40 font-mono">[{{ item.time }}]</span>
                  <span class="text-white font-bold tracking-widest uppercase italic">{{ item.operation }}::{{ item.tool }}</span>
                </div>
                <span class="text-white/80 font-mono hidden md:block truncate max-w-md">{{ item.output }}</span>
              </div>
              <div v-if="history.length === 0" class="text-[10px] text-white/10 uppercase tracking-widest text-center py-4 italic">No historical data available</div>
            </div>
          </div>
        </div>
      </div>

      <footer class="mt-20 pt-10 border-t border-white/5 text-center">
         <p class="text-[10px] text-white/20 tracking-[0.8em] uppercase italic">Authorized_Personnel_Only // Cipher_Core_Internal // 2025</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  Lock, Unlock, Binary, Hash, Globe, Code, Zap, 
  ChevronLeft, Terminal, ShieldCheck 
} from 'lucide-vue-next';

const encoding = useEncoding();

const tools = [
  { id: 'rot13', name: 'ROT Cipher', icon: Lock, hasDecode: false },
  { id: 'atbash', name: 'Atbash cipher', icon: Lock, hasDecode: false },
  { id: 'vigenere', name: 'Vigenère', icon: Lock, hasDecode: true },
  { id: 'base64', name: 'Base64', icon: Binary, hasDecode: true },
  { id: 'hex', name: 'Hexadecimal', icon: Hash, hasDecode: true },
  { id: 'url', name: 'URL Encode', icon: Globe, hasDecode: true },
  { id: 'ascii', name: 'ASCII codes', icon: Code, hasDecode: true },
  { id: 'html', name: 'HTML Entities', icon: Code, hasDecode: true },
  { id: 'binary', name: 'Binary Stream', icon: Code, hasDecode: true },
  { id: 'octal', name: 'Octal', icon: Code, hasDecode: true },
  { id: 'decimal', name: 'Decimal', icon: Code, hasDecode: true },
  { id: 'morse', name: 'Morse Code', icon: Zap, hasDecode: true },
  { id: 'xor', name: 'XOR Cipher', icon: Zap, hasDecode: true }
];

const selectedTool = ref<string | null>(null);
const input = ref('');
const output = ref('');
const copied = ref(false);
const history = ref<Array<any>>([]);

const rotOption = ref<'rot13'|'rotn'|'bruteforce'>('rot13');
const rotShift = ref<number>(13);

const currentTool = computed(() => tools.find(t => t.id === selectedTool.value));

const handleEncode = () => {
  if (!selectedTool.value || !input.value) return;
  let result = '';
  const text = input.value;

  switch(selectedTool.value){
    case 'rot13':
      if(rotOption.value==='rot13') result = encoding.rot13(text);
      else if(rotOption.value==='rotn') result = encoding.rotN(text, rotShift.value);
      else result = encoding.rotBrute(text);
      break;
    case 'atbash': result = encoding.atbash(text); break;
    case 'vigenere':
      const vKey = prompt("Enter Vigenère key:") || '';
      result = encoding.vigenereEncode(vKey, text);
      break;
    case 'base64': result = encoding.base64Encode(text); break;
    case 'hex': result = encoding.hexEncode(text); break;
    case 'url': result = encoding.urlEncode(text); break;
    case 'ascii': result = encoding.textToAscii(text); break;
    case 'html': result = encoding.htmlEncode(text); break;
    case 'binary': result = encoding.binaryEncode(text); break;
    case 'octal': result = encoding.octalEncode(text); break;
    case 'decimal': result = encoding.decimalEncode(text); break;
    case 'morse': result = encoding.morseEncode(text); break;
    case 'xor':
      const xorKey = prompt("Enter XOR key:") || '';
      result = encoding.xorCipher(text, xorKey);
      break;
  }
  output.value = result;
  addToHistory('ENCODE', result);
};

const handleDecode = () => {
  if (!selectedTool.value || !input.value) return;
  let result = '';
  const text = input.value;

  switch(selectedTool.value){
    case 'vigenere':
      const vKey = prompt("Enter Vigenère key:") || '';
      result = encoding.vigenereDecode(vKey, text);
      break;
    case 'base64': result = encoding.base64Decode(text); break;
    case 'hex': result = encoding.hexDecode(text); break;
    case 'url': result = encoding.urlDecode(text); break;
    case 'ascii': result = encoding.asciiToText(text); break;
    case 'html': result = encoding.htmlDecode(text); break;
    case 'binary': result = encoding.binaryDecode(text); break;
    case 'octal': result = encoding.octalDecode(text); break;
    case 'decimal': result = encoding.decimalDecode(text); break;
    case 'morse': result = encoding.morseDecode(text); break;
    case 'xor':
      const xorKey = prompt("Enter XOR key:") || '';
      result = encoding.xorCipher(text, xorKey);
      break;
  }
  output.value = result;
  addToHistory('DECODE', result);
};

const addToHistory = (operation: string, result: string) => {
  history.value.unshift({
    tool: currentTool.value?.name,
    operation,
    output: result,
    time: new Date().toLocaleTimeString()
  });
  if (history.value.length > 5) history.value = history.value.slice(0, 5);
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const clearAll = () => {
  input.value = '';
  output.value = '';
};
</script>

<style scoped>
/* MAIN BACKGROUND GRID ANIMATION */
@keyframes grid { 0% { transform: translateY(0); } 100% { transform: translateY(60px); } }
.animate-grid { animation: grid 12s linear infinite; }

@keyframes pulse-white {
  0%, 100% { opacity: 0.02; transform: scale(1); }
  50% { opacity: 0.05; transform: scale(1.1); }
}
.animate-pulse-white { animation: pulse-white 8s infinite ease-in-out; }

@keyframes pulse-white-fast {
  0%, 100% { border-color: rgba(255,255,255,0.1); box-shadow: 0 0 0px rgba(255,255,255,0); }
  50% { border-color: rgba(255,255,255,0.5); box-shadow: 0 0 15px rgba(255,255,255,0.1); }
}
.animate-pulse-white-fast { animation: pulse-white-fast 2s infinite ease-in-out; }

/* SCAN LINE ANIMATION */
@keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }
.scan-line {
  position: absolute; left: 0; right: 0; height: 160px;
  background: linear-gradient(transparent, rgba(255,255,255,0.03), transparent);
  animation: scan 12s linear infinite; pointer-events: none; z-index: 5;
}

/* UI COMPONENTS */
.cyber-card {
  @apply bg-white/[0.02] border border-white/10 rounded-[2rem] p-10 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden;
}

.cyber-textarea {
  @apply w-full bg-black/60 border border-white/10 rounded-2xl p-8 outline-none transition-all 
         placeholder-white/10 font-mono text-white focus:border-white/40 shadow-inner resize-none;
}

.cyber-select {
  @apply w-full bg-black border border-white/10 rounded-xl px-4 py-3 font-bold text-white uppercase tracking-widest outline-none focus:border-white/40 transition-colors;
}

.cyber-input-small {
  @apply w-full bg-black border border-white/10 rounded-xl px-4 py-3 font-bold text-white outline-none focus:border-white/40;
}

.btn-execute-white {
  @apply bg-white border border-white rounded-2xl font-black tracking-[0.4em] text-black
         uppercase transition-all flex items-center justify-center shadow-[0_0_35px_rgba(255,255,255,0.3)] 
         hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-20 relative overflow-hidden;
}

.btn-execute-white::before {
  content: '';
  @apply absolute inset-0 bg-white opacity-20;
  animation: ping-white 2s infinite cubic-bezier(0, 0, 0.2, 1);
}

@keyframes ping-white {
  75%, 100% { transform: scale(1.5); opacity: 0; }
}

/* SCROLLBAR */
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-white/10 rounded-full hover:bg-white/30; }

/* TRANSITIONS */
@keyframes slideDown { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes reveal { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.animate-slide-down { animation: slideDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.reveal-animate { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.hero-enter-active { transition: all 0.5s ease-out; }
.hero-enter-from { opacity: 0; transform: scale(0.95); }
</style>