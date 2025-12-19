<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="(tool, idx) in reconTools"
      :key="idx"
      @click="selectReconTool(tool)"
      class="relative bg-black/40 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-6 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer group"
    >
      <!-- Multi Tags / Badges -->
      <div v-if="tool.tags?.length" class="absolute top-3 right-3 flex space-x-2">
        <Badge v-for="(tag, tIdx) in tool.tags" :key="tIdx" :label="tag.label" :color="tag.color" />
      </div>

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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search, Wifi, Database, Shield, Activity, Terminal } from 'lucide-vue-next';
import Badge from './Badge.vue';

const router = useRouter();

const reconTools = [
  {
    name: 'Nmap Scanner',
    icon: Search,
    desc: 'Port scanning & network discovery',
    command: 'nmap',
    tags: [
      { label: 'AI', color: 'bg-red-600' },
      { label: 'Network', color: 'bg-cyan-500' }
    ],
    route: '/nmap'
  },
  {
    name: 'Gobuster',
    icon: Wifi,
    desc: 'Directory & DNS busting',
    command: 'gobuster',
    tags: [
      { label: 'AI', color: 'bg-red-600' },
      { label: 'Web', color: 'bg-yellow-500' }
    ],
    route: '/gobuster'
  },
  {
    name: 'SQLMap',
    icon: Database,
    desc: 'SQL injection testing',
    command: 'sqlmap',
    tags: [{ label: 'Database', color: 'bg-purple-500' }],
    route: '/sqlmap'
  },
  {
    name: 'Nikto',
    icon: Shield,
    desc: 'Web server scanner',
    command: 'nikto',
    tags: [{ label: 'Network', color: 'bg-cyan-500' }],
    route: '/nikto'
  },
  {
    name: 'Subfinder',
    icon: Activity,
    desc: 'Subdomain enumeration',
    command: 'subfinder',
    tags: [{ label: 'Subdomain', color: 'bg-pink-500' }],
    route: '/subfinder'
  }
];

const selectReconTool = (tool: any) => {
  if (tool.route) {
    router.push(tool.route);
  }
};
</script>
