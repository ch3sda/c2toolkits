<template>
  <div v-if="history.length > 0" class="bg-black/40 backdrop-blur-sm rounded-lg border border-purple-500/30 p-6">
    <h3 class="text-lg font-bold mb-3 text-purple-300">Session History</h3>
    <div class="space-y-2 max-h-64 overflow-y-auto">
      <div
        v-for="(item, idx) in history.slice(0, 5)"
        :key="idx"
        class="bg-purple-500/10 border border-purple-500/30 rounded p-3 text-sm"
      >
        <div class="flex justify-between items-center mb-1">
          <span class="text-purple-300 font-semibold">{{ item.tool }} ({{ item.operation }})</span>
          <span class="text-purple-400 text-xs">{{ item.time }}</span>
        </div>
        <div class="text-gray-400 text-xs truncate">
          {{ item.input }} → {{ item.output }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  history: Array<any>
}>();
</script>