<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-red-300 text-white font-mono">
    <!-- Animated Background Grid -->
    <div class="fixed inset-0 bg-[linear-gradient(rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse opacity-20"></div>
    
    <div class="relative z-10">
      <!-- Header -->
      <header class="border-b border-purple-500/30 backdrop-blur-sm bg-black/30">
        <div class="container mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <Terminal :size="32" class="text-purple-400" />
              <div>
                <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  C2Toolkits
                </h1>
                <p class="text-xs text-purple-300">by ch3sda ❤ Education Edition</p>
              </div>
            </div>
            <div class="flex items-center space-x-2 text-sm">
              <div class="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full">
                <span class="text-purple-300">v2.0 - Beta</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Tab Navigation -->
      <div class="container mx-auto px-6 py-4">
        <div class="flex space-x-2 bg-black/30 backdrop-blur-sm rounded-lg p-2 border border-purple-500/30">
          <button
            @click="activeTab = 'encode'"
            :class="[
              'flex-1 px-6 py-3 rounded-lg transition-all duration-300',
              activeTab === 'encode'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
                : 'hover:bg-purple-500/20'
            ]"
          >
            <Lock :size="20" class="inline-block mr-2" />
            Encode/Decode
          </button>
          <button
            @click="activeTab = 'recon'"
            :class="[
              'flex-1 px-6 py-3 rounded-lg transition-all duration-300',
              activeTab === 'recon'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/50'
                : 'hover:bg-cyan-500/20'
            ]"
          >
            <Shield :size="20" class="inline-block mr-2" />
            Recon Tools
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="container mx-auto px-6 py-6">
        <EncodingTools v-if="activeTab === 'encode'" />
        <ReconTools v-else />
      </div>

      <!-- Footer Warning -->
      <footer class="container mx-auto px-6 py-6 mt-12">
        <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div class="flex items-start space-x-3">
            <Shield :size="20" class="text-yellow-400 flex-shrink-0 mt-1" />
            <div class="text-sm text-yellow-300">
              <strong>⚠ Educational Use Only:</strong> This toolkit is designed for learning, CTF challenges, 
              and authorized security testing. Unauthorized use against systems you don't own is illegal.
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Terminal, Lock, Shield } from 'lucide-vue-next';

const activeTab = ref('encode');
</script>