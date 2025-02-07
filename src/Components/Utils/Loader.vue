<template>
  <div class="loader-overlay" v-if="show">
    <Hourglass class="loader" :size="58"/>
  </div>
</template>

<script setup>
import { Hourglass } from 'lucide-vue-next';

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
}

.loader {
  color: #059669;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>