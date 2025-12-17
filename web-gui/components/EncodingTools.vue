<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Tool Selection Card -->
    <div class="lg:col-span-1">
      <div class="bg-black/40 backdrop-blur-sm rounded-lg border border-purple-500/30 p-6">
        <h2 class="text-xl font-bold mb-4 text-purple-300">Select Tool</h2>
        <div class="space-y-2">
          <button
            v-for="tool in tools"
            :key="tool.id"
            @click="selectedTool = tool.id"
            :class="[
              'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all',
              selectedTool === tool.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
                : 'bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30'
            ]"
          >
            <component :is="tool.icon" :size="20" />
            <span>{{ tool.name }}</span>
          </button>
        </div>

        <!-- ROT Options -->
        <div v-if="selectedTool === 'rot13'" class="mt-4 space-y-2">
          <label class="block text-purple-300 font-semibold">ROT Options</label>
          <select v-model="rotOption" class="w-full bg-black/50 border border-purple-500/30 rounded px-3 py-2 text-white">
            <option value="rot13">ROT13</option>
            <option value="rotn">ROT-n</option>
            <option value="bruteforce">Brute Force ROT</option>
          </select>
          <input
            v-if="rotOption === 'rotn'"
            type="number"
            v-model.number="rotShift"
            min="1"
            max="25"
            placeholder="Shift (1-25)"
            class="w-full bg-black/50 border border-purple-500/30 rounded px-3 py-2 text-white"
          />
        </div>
      </div>
    </div>

    <!-- Input / Output Card -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Input -->
      <div class="bg-black/40 backdrop-blur-sm rounded-lg border border-purple-500/30 p-6">
        <label class="block text-purple-300 font-semibold mb-3">Input</label>
        <textarea
          v-model="input"
          placeholder="Enter text to encode/decode..."
          class="w-full h-32 bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
        <div class="flex space-x-3 mt-4">
          <button
            @click="handleEncode"
            :disabled="!selectedTool || !input"
            class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            <Unlock :size="16" class="inline-block mr-2" />
            Encode
          </button>
          <button
            v-if="currentTool?.hasDecode"
            @click="handleDecode"
            :disabled="!input"
            class="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            <Lock :size="16" class="inline-block mr-2" />
            Decode
          </button>
          <button
            @click="clearAll"
            class="px-6 py-3 bg-red-600/20 border border-red-500/50 hover:bg-red-600/30 rounded-lg font-semibold transition-all"
          >
            Clear
          </button>
        </div>
      </div>

      <!-- Output -->
      <div v-if="output" class="bg-black/40 backdrop-blur-sm rounded-lg border border-green-500/30 p-6 animate-fadeIn">
        <div class="flex items-center justify-between mb-3">
          <label class="text-green-300 font-semibold">Output</label>
          <button
            @click="copyToClipboard"
            class="px-3 py-1 bg-green-600/20 border border-green-500/50 hover:bg-green-600/30 rounded text-sm transition-all"
          >
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <div class="bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-green-300 break-all whitespace-pre-wrap">
          {{ output }}
        </div>
      </div>

      <!-- History -->
      <HistoryPanel :history="history" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Lock, Unlock, Binary, Hash, Globe, Code, Zap } from 'lucide-vue-next';

const encoding = useEncoding();

const tools = [
  { id: 'rot13', name: 'ROT', icon: Lock, hasDecode: false },
  { id: 'atbash', name: 'Atbash cipher', icon: Lock, hasDecode: false },
  { id: 'vigenere', name: 'Vigenère', icon: Lock, hasDecode: true },
  { id: 'base64', name: 'Base64', icon: Binary, hasDecode: true },
  { id: 'hex', name: 'Hexadecimal', icon: Hash, hasDecode: true },
  { id: 'url', name: 'URL Encode', icon: Globe, hasDecode: true },
  { id: 'ascii', name: 'ASCII codes', icon: Code, hasDecode: true },
  { id: 'html', name: 'HTML Entities', icon: Code, hasDecode: true },
  { id: 'binary', name: 'Binary', icon: Code, hasDecode: true },
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
  addToHistory('encode', result);
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
  addToHistory('decode', result);
};

const addToHistory = (operation: string, result: string) => {
  history.value.unshift({
    tool: currentTool.value?.name,
    operation,
    input: input.value,
    output: result,
    time: new Date().toLocaleTimeString()
  });
  if (history.value.length > 10) history.value = history.value.slice(0, 10);
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
