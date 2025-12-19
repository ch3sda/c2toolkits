<template>
  <div class="min-h-screen bg-[#050505] text-white font-mono relative overflow-hidden selection:bg-cyan-500/30">
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-[#050d10] via-[#050505] to-[#07121a]" />
      <div class="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid opacity-30" />
      <div class="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-900/10 blur-[140px] rounded-full animate-pulse" />
    </div>
    
    <div class="scan-line opacity-40" />

    <div class="relative z-20 container mx-auto px-8 py-12 max-w-[1440px]">
      <header class="mb-10 border-b border-white/5 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-slide-down">
        <div class="space-y-6">
          <NuxtLink to="/" class="group text-cyan-400 hover:text-cyan-300 text-xs font-black tracking-[0.5em] uppercase transition-all flex items-center gap-4">
            <ChevronLeft :size="18" class="group-hover:-translate-x-2 transition-transform" /> Back to Matrix
          </NuxtLink>
          <div class="relative">
            <h1 class="text-7xl md:text-8xl font-black tracking-tighter uppercase italic bg-gradient-to-b from-white via-cyan-100 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              RECON_CENTER
            </h1>
          </div>
        </div>
        
        <div class="flex items-center gap-6 bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
          <div class="text-right border-r border-white/10 pr-6">
            <p class="text-[10px] text-cyan-500 font-bold tracking-widest uppercase mb-1">Local_Node Status</p>
            <span class="text-sm font-black text-white tracking-[0.2em] uppercase italic">
              {{ loading ? 'Bridge_Syncing...' : 'Uplink_Stable' }}
            </span>
          </div>
          <Radar :class="['text-cyan-400 transition-all', loading ? 'animate-ping' : 'animate-spin-slow']" :size="32" />
        </div>
      </header>

      <div class="mb-10 flex items-center gap-4 animate-slide-down" style="animation-delay: 100ms">
        <div class="bg-cyan-500/10 border border-cyan-500/30 px-6 py-3 rounded-full flex items-center gap-3 backdrop-blur-md group hover:bg-cyan-500/20 transition-all cursor-crosshair">
          <Zap :size="16" class="text-cyan-400 fill-cyan-400 animate-pulse" />
          <span class="text-[10px] font-black tracking-[0.3em] uppercase italic text-cyan-100">Quick_Access_Vault</span>
        </div>
        <div class="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-animate">
        <div
          v-for="(tool, idx) in reconTools"
          :key="idx"
          @click="selectReconTool(tool)"
          :class="[
            'cyber-card group cursor-pointer border-white/5 transition-all hover:-translate-y-2 relative overflow-hidden',
            toolStatus[tool.command] ? 'hover:border-cyan-500/40' : 'border-red-500/20 grayscale-[0.5] cursor-not-allowed'
          ]"
        >
          <div v-if="!toolStatus[tool.command] && !loading" class="absolute inset-0 z-30 bg-black/60 backdrop-blur-[2px] flex items-center justify-center border border-red-500/10 rounded-[2.5rem]">
             <div class="text-center">
                <Lock class="text-red-500 mx-auto mb-2 animate-pulse" :size="24" />
                <span class="text-[8px] font-black text-red-500 tracking-[0.3em] uppercase">Access_Denied: Binary_Missing</span>
             </div>
          </div>

          <div v-if="toolStatus[tool.command]" class="absolute top-0 left-0 w-full h-[1px] bg-cyan-500 opacity-0 group-hover:opacity-100 group-hover:animate-scan-line-fast" />

          <div v-if="tool.tags?.length" class="absolute top-6 right-6 flex space-x-2">
            <span 
              v-for="(tag, tIdx) in tool.tags" 
              :key="tIdx"
              :class="`inline-block text-black text-[9px] font-black px-3 py-0.5 rounded-full uppercase tracking-tighter ${tag.color || 'bg-cyan-500'}`"
            >
              {{ tag.label }}
            </span>
          </div>

          <div class="flex items-center space-x-4 mb-6">
            <div :class="[
              'p-4 border transition-all rounded-2xl shadow-2xl',
              toolStatus[tool.command] ? 'bg-cyan-500/10 border-cyan-500/20 group-hover:bg-cyan-500/20 shadow-cyan-500/10' : 'bg-red-500/10 border-red-500/20 shadow-none'
            ]">
              <component :is="tool.icon" :size="24" :class="toolStatus[tool.command] ? 'text-cyan-400' : 'text-red-500'" />
            </div>
            <div>
              <h3 class="text-xl font-black italic text-white uppercase tracking-tighter group-hover:text-cyan-300 transition-colors">{{ tool.name }}</h3>
              
              <div class="mt-1 flex items-center gap-2">
                <div :class="['w-1.5 h-1.5 rounded-full', toolStatus[tool.command] ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-red-500']" />
                <span :class="['text-[8px] font-black tracking-widest uppercase', toolStatus[tool.command] ? 'text-green-500' : 'text-red-500']">
                  {{ toolStatus[tool.command] ? 'LINK_ACTIVE' : 'OFFLINE' }}
                </span>
              </div>
            </div>
          </div>

          <p class="text-white/40 text-sm leading-relaxed mb-8 font-medium h-12 overflow-hidden line-clamp-2">
            {{ tool.desc }}
          </p>

          <div class="flex items-center justify-between border-t border-white/5 pt-6">
            <div class="flex items-center text-[10px] font-black text-cyan-400 uppercase tracking-widest">
              <Terminal :size="14" class="mr-2" />
              CLI_EXEC
            </div>
            <div class="bg-white/5 px-3 py-1 rounded-md text-[9px] font-mono text-white/40 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
              {{ tool.command }}
            </div>
          </div>

          <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-all" />
        </div>
      </div>

      <div class="mt-16 cyber-card border-none bg-black/20 p-8 reveal-animate" style="animation-delay: 300ms">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-6">
            <Radar class="text-cyan-500 animate-pulse" :size="40" />
            <div>
              <p class="text-xs font-black tracking-widest uppercase text-white">Satellite_Feed_Status</p>
              <p class="text-[10px] text-cyan-500/50 uppercase font-bold tracking-tighter">Connection: Encrypted // Uplink: Active</p>
            </div>
          </div>
          <div class="flex-1 flex gap-2 max-w-md w-full">
             <div v-for="n in 20" :key="n" class="h-1 flex-1 bg-cyan-500/20 rounded-full overflow-hidden">
                <div class="h-full bg-cyan-500 animate-pulse" :style="{ animationDelay: n*80+'ms' }"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  Search, Wifi, Database, Shield, Activity, Terminal, 
  ChevronLeft, Radar, Zap, Lock 
} from 'lucide-vue-next';

const router = useRouter();
const { toolStatus, checkLocalInstallation, loading } = useTerminal();

const reconTools = [
  { name: 'Nmap Scanner', icon: Search, desc: 'Advanced port scanning, service detection & network discovery protocols.', command: 'nmap', tags: [{ label: 'AI_SCAN', color: 'bg-red-600' }, { label: 'NET_DISCO', color: 'bg-cyan-500' }], route: '/recon/nmap' },
  { name: 'Gobuster', icon: Wifi, desc: 'High-speed URIs, DNS subdomains and virtual host name brute-forcing.', command: 'gobuster', tags: [{ label: 'AI_FUZZ', color: 'bg-red-600' }, { label: 'WEB_RECON', color: 'bg-yellow-500' }], route: '/recon/gobuster' },
  { name: 'SQLMap', icon: Database, desc: 'Automatic SQL injection and database takeover tool with payload generation.', command: 'sqlmap', tags: [{ label: 'DB_EXPLOIT', color: 'bg-purple-500' }], route: '/recon/sqlmap' },
  { name: 'Nikto', icon: Shield, desc: 'Comprehensive web server scanner for dangerous files and outdated software.', command: 'nikto', tags: [{ label: 'SRV_AUDIT', color: 'bg-cyan-500' }], route: '/recon/nikto' },
  { name: 'Subfinder', icon: Activity, desc: 'Passive subdomain discovery tool that discovers valid subdomains for websites.', command: 'subfinder', tags: [{ label: 'SUB_ENUM', color: 'bg-pink-500' }], route: '/recon/subfinder' }
];

onMounted(async () => {
  await checkLocalInstallation();
});

const selectReconTool = (tool: any) => {
  if (toolStatus.value[tool.command]) {
    router.push(tool.route);
  } else {
    // Optional: play an error sound or trigger a red flash
    console.error("System Error: Binary not found in PATH.");
  }
};
</script>

<style scoped>
@keyframes grid { 0% { transform: translateY(0); } 100% { transform: translateY(50px); } }
.animate-grid { animation: grid 15s linear infinite; }

@keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }
.scan-line {
  position: absolute; left: 0; right: 0; height: 150px;
  background: linear-gradient(transparent, rgba(6,182,212,0.05), transparent);
  animation: scan 10s linear infinite; pointer-events: none; z-index: 5;
}

@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 8s linear infinite; }

@keyframes scan-line-fast {
  0% { transform: translateY(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(320px); opacity: 0; }
}
.group-hover\:animate-scan-line-fast { animation: scan-line-fast 1s linear infinite; }

.cyber-card {
  @apply bg-black/40 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-2xl shadow-2xl relative;
}

@keyframes slideDown { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes reveal { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.animate-slide-down { animation: slideDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.reveal-animate { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>