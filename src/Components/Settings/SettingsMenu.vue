<template>
  <div class="settings-container">
    <button @click="toggleSettings" class="settings-button">
      <Settings class="settings-icon" />
    </button>
    <!-- Settings Modal -->
    <div v-if="isSettingsOpen" class="settings-modal">
      <div class="settings-content">
        <h3>Settings</h3>
        <ThemeToggle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ThemeToggle from "../Utils/ThemeToggle.vue";
import { Settings } from 'lucide-vue-next';

const isSettingsOpen = ref(false);

const toggleSettings = () => {
  isSettingsOpen.value = !isSettingsOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  const modal = document.querySelector('.settings-modal');
  const button = document.querySelector('.settings-button');
  if (isSettingsOpen.value && modal && button &&
      !modal.contains(event.target as Node) &&
      !button.contains(event.target as Node)) {
    isSettingsOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.settings-container {
  position: relative;
}

.settings-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s ease;
}

.settings-button:hover {
  transform: rotate(45deg);
}

.settings-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #000000;
}

.settings-modal {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  min-width: 200px;
  z-index: 50;
  animation: slideIn 0.2s ease-out;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.settings-content h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #374151;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media only screen and (max-width: 550px) {
  .settings-modal {
    min-width: 150px;
  }
}
</style>