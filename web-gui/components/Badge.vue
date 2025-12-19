<template>
  <span
    :class="`inline-block text-black text-xs font-bold px-2 py-1 rounded-full ${color}`"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  color?: string;
}>()

// default color if not provided
const color = props.color || 'bg-cyan-500'
</script>
