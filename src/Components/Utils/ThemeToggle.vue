<template>
  <div class="theme-toggle">
    <div class="toggle-container">
      <span class="mode-text">Theme Mode</span>
      <label class="switch">
        <input
            type="checkbox"
            id="theme-switch"
            @change="themeStore.toggleTheme"
            :checked="themeStore.isDarkMode"
        />
        <span class="slider round">
          <Sun class="sun-icon" />
          <Moon class="moon-icon" />
        </span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Sun, Moon } from 'lucide-vue-next';
import { useThemeStore } from '../../stores/themeStore';

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initTheme();
});
</script>


<style scoped>
.theme-toggle {
  width: 100%;
}

.toggle-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}

.mode-text {
  font-family: "Oswald", sans-serif;
  color: #374151;
  font-size: 0.9rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f3f4f6;
  transition: .4s;
  border-radius: 34px;
  border: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.sun-icon, .moon-icon {
  width: 14px;
  height: 14px;
  color: #9ca3af;
}

.sun-icon {
  margin-right: 4px;
}

.moon-icon {
  margin-left: 4px;
}

input:checked + .slider {
  background-color: #059669;
  border-color: #047857;
}

input:checked + .slider:before {
  transform: translateX(28px);
}

input:checked + .slider .sun-icon,
input:checked + .slider .moon-icon {
  color: white;
}

@media screen and (max-width: 500px) {
  .switch {
    width: 48px;
    height: 24px;
  }

  .slider:before {
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
  }

  input:checked + .slider:before {
    transform: translateX(24px);
  }

  .sun-icon, .moon-icon {
    width: 12px;
    height: 12px;
  }
}
</style>