<template>
  <div class="loader-overlay" v-if="show">
    <div class="loader"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

/**
 * Loader Component
 * Reusable loader animation overlay.
 *
 * Props:
 * - `show` (Boolean): Determines whether the loader is visible.
 */
export default defineComponent({
  name: "Loader",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
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
  border: 8px solid #8f8c8c;
  border-top: 8px solid #075c07;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
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