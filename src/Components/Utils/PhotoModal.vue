<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">
        <span class="close-icon">×</span>
      </button>

      <Loader :show="isLoading" />

      <div class="image-container">
        <img
            v-show="!isLoading"
            :src="photos[currentPhoto]"
            alt="Photo"
            @load="onImageLoad"
        />
      </div>

      <div class="controls">
        <button
            class="nav-btn prev-btn"
            @click="prevPhoto"
            :disabled="currentPhoto === 0"
            :class="{ 'disabled': currentPhoto === 0 }"
        >
          ←
        </button>
        <div class="photo-counter">
          {{ currentPhoto + 1 }} / {{ photos.length }}
        </div>
        <button
            class="nav-btn next-btn"
            @click="nextPhoto"
            :disabled="currentPhoto === photos.length - 1"
            :class="{ 'disabled': currentPhoto === photos.length - 1 }"
        >
          →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "./Loader.vue";

export default {
  components: {Loader},
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPhoto: 0,
      isLoading: true,
      progress: 0,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    prevPhoto() {
      if (this.currentPhoto > 0) {
        this.currentPhoto--;
        this.startLoading();
      }
    },
    nextPhoto() {
      if (this.currentPhoto < this.photos.length - 1) {
        this.currentPhoto++;
        this.startLoading();
      }
    },
    onImageLoad() {
      this.isLoading = false;
      this.progress = 0;
    },
    startLoading() {
      this.isLoading = true;
      this.progress = 0;

      const interval = setInterval(() => {
        if (this.progress < 100) {
          this.progress += 10;
        } else {
          clearInterval(interval);
        }
      }, 100);
    },
  },  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.startLoading();
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
  position: relative;
  background: #1f2937;
  padding: 2.5rem;
  border-radius: 15px;
  width: 90%;
  height: 90vh;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.4s ease-out;
  overflow-y: auto;
}

.image-container {
  width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}

img {
  max-width: 100%;
  max-height: calc(90vh - 180px); /* Account for padding, controls, and margins */
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: rgba(255, 59, 59, 0.9);
  transform: rotate(90deg);
}

.close-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.nav-btn {
  background-color: #374151;
  color: #ffffff;
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(.disabled) {
  background-color: #059669;
  transform: scale(1.05);
}

.nav-btn.disabled {
  background-color: #4b5563;
  cursor: not-allowed;
  opacity: 0.5;
}

.photo-counter {
  color: #8f8c8c;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
    height: 100vh;
    width: 100%;
    border-radius: 0;
  }

  .nav-btn {
    width: 2.5rem;
    height: 2.5rem;
  }

  .close-btn {
    width: 2rem;
    height: 2rem;
  }

  img {
    max-height: calc(100vh - 160px);
  }
}

@media (max-height: 600px) {
  .modal-content {
    padding: 1rem;
  }

  .image-container {
    margin: 0.5rem 0;
  }

  .controls {
    margin-top: 0.5rem;
  }

  img {
    max-height: calc(100vh - 120px);
  }
}
</style>