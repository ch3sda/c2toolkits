// composables/useTerminal.ts
export const useTerminal = () => {
  const toolStatus = ref<Record<string, boolean>>({});
  const loading = ref(false);

  const checkLocalInstallation = async () => {
    loading.value = true;
    try {
      // Calls the bridge we made in Step 1
      const data = await $fetch('/api/check-tools');
      toolStatus.value = data;
    } catch (err) {
      console.error("Agent not reachable. Ensure the local server is running.");
    } finally {
      loading.value = false;
    }
  };

  return { toolStatus, checkLocalInstallation, loading };
};