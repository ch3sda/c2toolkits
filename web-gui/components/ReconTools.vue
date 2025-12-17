<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="(tool, idx) in reconTools"
      :key="idx"
      @click="selectReconTool(tool)"
      class="bg-black/40 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-6 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer group"
    >
      <div class="flex items-center space-x-3 mb-3">
        <div class="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-all">
          <component :is="tool.icon" :size="20" />
        </div>
        <h3 class="text-lg font-bold text-cyan-300">{{ tool.name }}</h3>
      </div>
      <p class="text-gray-400 text-sm mb-4">{{ tool.desc }}</p>
      <div class="flex items-center text-xs text-cyan-400">
        <Terminal :size="16" class="mr-1" />
        CLI Tool Available
      </div>
    </div>

    <!-- Tool Execution Modal (Optional) -->
    <div v-if="selectedTool" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" @click="selectedTool = null">
      <div @click.stop class="bg-gray-900 border border-cyan-500 rounded-lg p-6 max-w-2xl w-full mx-4">
        <h2 class="text-2xl font-bold text-cyan-300 mb-4">{{ selectedTool.name }}</h2>
        <p class="text-gray-300 mb-4">{{ selectedTool.desc }}</p>
        <div class="bg-black/50 border border-cyan-500/30 rounded p-4 mb-4">
          <p class="text-sm text-yellow-300">
            ⚠ This tool requires backend integration with your bash scripts.
            See the API integration guide below.
          </p>
        </div>
        <button
          @click="selectedTool = null"
          class="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded transition-all"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search, Wifi, Database, Shield, Activity, Terminal } from 'lucide-vue-next';

const reconTools = [
  { name: 'Nmap Scanner', icon: Search, desc: 'Port scanning & network discovery', command: 'nmap' },
  { name: 'Gobuster', icon: Wifi, desc: 'Directory & DNS busting', command: 'gobuster' },
  { name: 'SQLMap', icon: Database, desc: 'SQL injection testing', command: 'sqlmap' },
  { name: 'Nikto', icon: Shield, desc: 'Web server scanner', command: 'nikto' },
  { name: 'Subfinder', icon: Activity, desc: 'Subdomain enumeration', command: 'subfinder' }
];

const selectedTool = ref(null);

const selectReconTool = (tool: any) => {
  selectedTool.value = tool;
};
</script>