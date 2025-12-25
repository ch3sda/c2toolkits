<template>
  <div class="min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-purple-500/30 font-mono">
    
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-[#050505]" />
      <div class="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.15)_1px,transparent_1px)] bg-[size:60px_60px] opacity-60" />
      <div class="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-purple-600/20 blur-[130px] rounded-full animate-pulse-slow" />
      <div class="absolute bottom-[5%] right-[-5%] w-[55%] h-[55%] bg-blue-600/15 blur-[140px] rounded-full animate-pulse-slow" style="animation-delay: 2s" />
      <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
    
    <div class="scan-line opacity-20" />
    
    <header class="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-8 animate-slide-down">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-xl group hover:border-purple-400 transition-all cursor-pointer">
          <Terminal :size="24" class="text-white group-hover:text-purple-400 group-hover:scale-110 transition-all" />
        </div>
        <div>
          <h2 class="text-sm font-black tracking-[0.3em] uppercase italic leading-none mb-1 text-white">C2Toolkits</h2>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_#60a5fa]"></span>
            <span class="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Node_v3.0_Stable</span>
          </div>
        </div>
      </div>

      <nav class="hidden md:flex items-center gap-10">
        <a href="/document" class="nav-link">Document</a>
        <a href="#modules" class="nav-link">Feature</a>
        <a href="https://github.com/ch3sda/c2toolkits" target="_blank" class="nav-link">Source</a>
        <div class="h-4 w-[1px] bg-white/10"></div>
        <div class="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
          <span class="text-[9px] font-black tracking-widest uppercase text-blue-300">ED_Edition</span>
          <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
        </div>
      </nav>
    </header>

    <div class="relative z-20 flex flex-col items-center">
      
      <section class="min-h-[85vh] flex flex-col items-center justify-center text-center px-6">
        <Transition name="hero" appear>
          <div v-if="mounted" class="space-y-12">
            <div class="relative inline-block">
              <div class="pulse-ring border-blue-500/30" />
              <h1 class="text-7xl md:text-9xl font-black tracking-tighter bg-gradient-to-b from-white via-blue-100 to-purple-500 bg-clip-text text-transparent glow-text-white uppercase italic relative z-10">
                C2Toolkits
              </h1>
            </div>
            
            <p class="text-blue-100/70 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-light italic uppercase tracking-wide">
              Professional-grade cybersecurity arsenal for <br/>
              <span class="text-white font-black tracking-widest border-b border-purple-500/50">education & authorized testing.</span>
            </p>
            
            <div class="flex flex-wrap justify-center gap-6 mt-12">
              <NuxtLink to="/recon" class="btn-cyber btn-blue group">
                <span class="relative z-10 flex items-center">
                  <Shield :size="20" class="mr-2 group-hover:rotate-12 transition-transform" />
                  RECON_TOOLS
                </span>
              </NuxtLink>
              
              <NuxtLink to="/cryptography" class="btn-cyber btn-white group">
                <span class="relative z-10 flex items-center">
                  <Lock :size="20" class="mr-2 group-hover:scale-125 transition-transform" />
                  ENCODE_DECODE
                </span>
              </NuxtLink>

              <NuxtLink to="/identifier" class="btn-cyber btn-purple group">
                <span class="relative z-10 flex items-center">
                  <ScanSearch :size="20" class="mr-2 group-hover:rotate-180 transition-transform duration-700" />
                  ANALYZE_OS
                </span>
              </NuxtLink>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mt-24">
              <div v-for="stat in stats" :key="stat.label" class="stat-card group">
                <div class="text-2xl font-black text-white mb-1 italic tracking-tighter uppercase group-hover:text-blue-400 transition-colors">{{ stat.value }}</div>
                <div class="flex items-center justify-center gap-2">
                  <div class="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                  <div class="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-black group-hover:text-white transition-colors">{{ stat.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <section id="modules" class="w-full max-w-7xl px-6 py-20">
        <div class="flex items-center justify-center space-x-6 mb-24">
          <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-purple-500/10" />
          <h2 class="text-2xl font-black tracking-[0.5em] uppercase italic text-white/90">Core_Feature</h2>
          <div class="h-[1px] flex-1 bg-gradient-to-l from-transparent via-purple-500/50 to-blue-500/10" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(item, i) in features" 
            :key="item.title" 
            class="feature-card group reveal-item" 
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <div class="relative z-10">
              <div class="w-14 h-14 mb-8 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center group-hover:border-blue-400/50 group-hover:bg-blue-600/10 transition-all duration-700 ease-out">
                <component :is="item.icon" :size="28" class="text-blue-300 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 class="font-black text-2xl mb-3 text-white tracking-tighter uppercase italic group-hover:text-blue-400 transition-colors duration-500">
                {{ item.title }}
              </h3>
              <p class="text-[13px] text-gray-500 leading-relaxed uppercase tracking-wide group-hover:text-gray-300 transition-colors duration-500">
                {{ item.desc }}
              </p>
            </div>
            <div class="absolute -bottom-2 -right-2 text-white/[0.02] font-black text-8xl italic group-hover:text-blue-500/5 group-hover:-translate-y-4 transition-all duration-1000 pointer-events-none">
              0{{ i + 1 }}
            </div>
          </div>
        </div>
      </section>

      <footer class="w-full max-w-7xl mx-auto mt-10 pb-16 px-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-16 border-t border-white/10 pt-20 mb-20 relative">
          <div class="col-span-1 lg:col-span-2 space-y-8">
            <div>
              <h3 class="text-3xl font-black italic tracking-tighter text-white uppercase mb-4">C2Toolkits</h3>
              <p class="text-[11px] text-gray-500 max-w-md leading-relaxed uppercase tracking-[0.1em]">
                Advanced security research framework engineered for education. 
                Local binary execution and secure cryptographic protocols.
              </p>
            </div>
            <div class="flex items-center gap-6">
              <div class="relative group">
                <img src="https://github.com/ch3sda.png" class="w-16 h-16 rounded-2xl border-2 border-blue-500/30 group-hover:border-white transition-all shadow-xl" />
                <div class="absolute -bottom-2 -right-2 bg-blue-600 border border-white/20 p-1.5 rounded-lg">
                  <Github :size="12" />
                </div>
              </div>
              <div>
                <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Architect_Signature</p>
                <p class="text-lg font-black text-white uppercase italic leading-none mb-1">CH3SDA</p>
                <a href="https://github.com/ch3sda" target="_blank" class="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors">github.com/ch3sda</a>
              </div>
            </div>
          </div>

          <div>
            <h4 class="text-[11px] font-black text-white uppercase tracking-[0.4em] mb-8 italic">Project_Registry</h4>
            <ul class="space-y-4">
              <li>
                <a href="https://github.com/ch3sda/c2toolkits" target="_blank" class="group flex items-center gap-3">
                  <GitBranch :size="16" class="text-blue-500 group-hover:rotate-90 transition-transform" />
                  <span class="text-[11px] font-bold text-gray-400 group-hover:text-white uppercase tracking-widest">Main_Repository</span>
                </a>
              </li>
              <li>
                <div class="flex items-center gap-3">
                  <Zap :size="16" class="text-purple-500" />
                  <span class="text-[11px] font-bold text-gray-400 uppercase tracking-widest italic">v3.0.0 Stable</span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-[11px] font-black text-white uppercase tracking-[0.4em] mb-8 italic">Operational_Logs</h4>
            <div class="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-3 backdrop-blur-md">
              <div v-for="log in ['Uplink_Active', 'ED_Edition_Live', 'C2_Encrypted']" :key="log" class="flex items-center justify-between">
                <span class="text-[9px] text-gray-500 font-black uppercase">{{ log }}</span>
                <span class="text-[9px] text-blue-400 font-black">OK</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center py-10 border-t border-white/5 gap-6 text-center md:text-left">
          <div class="flex flex-col gap-1">
            <span class="text-[9px] text-gray-600 font-black uppercase tracking-[0.5em]">© 2025 C2Toolkits // Designed By Ch3sda</span>
            <span class="text-[9px] text-blue-500/40 font-black uppercase tracking-[0.5em]">Education Edition // Strictly Non-Commercial</span>
          </div>
          <div class="flex items-center gap-8">
            <span class="text-[10px] text-gray-500 hover:text-white cursor-pointer uppercase font-black tracking-widest transition-colors">Terminals</span>
            <span class="text-[10px] text-gray-500 hover:text-white cursor-pointer uppercase font-black tracking-widest transition-colors">Protocols</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  Terminal, Lock, ScanSearch, Shield, Eye, 
  Cpu, Network, Github, GitBranch, Zap 
} from 'lucide-vue-next'

const mounted = ref(false)

const stats = [
  { label: 'Security Modules', value: '15+ Tools' },
  { label: 'System Uptime', value: 'Self-Hosting' },
  { label: 'Build Version', value: 'v3.0 ED' }
]

const features = [
  { title: 'Encoders', desc: 'Base64, Hex, and custom XOR routines for data transformation.', icon: Lock },
  { title: 'Reconnaissance', desc: 'Active and passive asset discovery with stealth-mode enabled.', icon: Eye },
  { title: 'Analysis', desc: 'Heuristic hash identification and file signature verification.', icon: ScanSearch },
  { title: 'Payloads', desc: 'Pre-configured shellcode templates for lab environment testing.', icon: Terminal },
  { title: 'Network', desc: 'Packet inspection and port enumeration utility suites.', icon: Network },
  { title: 'Hardware', desc: 'Low-level CPU and memory analysis for exploit research.', icon: Cpu }
]

onMounted(() => { 
  mounted.value = true 

  // Smooth Scroll Reveal Logic
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
})
</script>

<style scoped>
/* BACKGROUND ANIMATIONS */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}
.animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }

@keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }
.scan-line {
  position: absolute; left: 0; right: 0; height: 180px;
  background: linear-gradient(transparent, rgba(59,130,246,0.08), transparent);
  animation: scan 12s linear infinite; pointer-events: none; z-index: 5;
}

/* SMOOTH REVEAL ITEMS */
.reveal-item {
  opacity: 0;
  transform: translateY(40px) scale(0.96);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.reveal-item.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* BUTTONS */
.btn-cyber {
  @apply relative px-10 py-5 rounded-xl font-black text-xs tracking-[0.3em] uppercase 
         transition-all duration-500 overflow-hidden border-2 z-10;
}
.btn-white { @apply bg-white border-white text-black hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.2)]; }
.btn-blue { @apply bg-blue-600 border-blue-400 hover:bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.3)]; }
.btn-purple { @apply bg-purple-600 border-purple-400 hover:bg-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.3)]; }

/* FEATURE CARDS - Premium Hover */
.feature-card {
  @apply relative p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem]
         backdrop-blur-3xl overflow-hidden cursor-pointer shadow-2xl;
  transition: transform 0.7s cubic-bezier(0.2, 1, 0.3, 1), 
              border-color 0.4s ease, 
              background-color 0.4s ease;
}

.feature-card:hover {
  @apply border-blue-500/40 bg-white/[0.05];
  transform: translateY(-15px) scale(1.03);
}

.stat-card {
  @apply p-8 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-md 
         hover:bg-blue-500/[0.05] hover:border-blue-500/20 transition-all duration-300;
}

.nav-link {
  @apply text-[10px] font-black tracking-[0.4em] text-gray-400 hover:text-white transition-colors uppercase cursor-crosshair;
}

/* DECORATION */
@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0; }
  50% { opacity: 0.3; }
  100% { transform: scale(1.4); opacity: 0; }
}
.pulse-ring {
  @apply absolute inset-[-30px] rounded-full border-2;
  animation: pulse-ring 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.glow-text-white { text-shadow: 0 0 40px rgba(255,255,255,0.2), 0 0 20px rgba(168,85,247,0.4); }

/* TRANSITIONS */
.hero-enter-active { transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
.hero-enter-from { opacity: 0; transform: translateY(40px); }

@keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.animate-slide-down { animation: slideDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>