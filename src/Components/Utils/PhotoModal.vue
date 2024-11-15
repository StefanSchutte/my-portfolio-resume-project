<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>

      <div v-if="isLoading" class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
      <img
          v-show="!isLoading"
          :src="photos[currentPhoto]"
          alt="Photo"
          @load="onImageLoad"
      />
      <div class="controls">
        <button @click="prevPhoto" :disabled="currentPhoto === 0">←</button>
        <button @click="nextPhoto" :disabled="currentPhoto === photos.length - 1">→</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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

      // Simulate loading progress
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
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: #050505;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  max-width: 100%;
  max-height: 80vh;
}

.controls {
  margin-top: 10px;
}

button {
  background: #434141;
  color: white;
  font-size: large;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;
}

button:hover {
  background-color: #28b128;
  transition: background-color 0.3s ease;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

/* Progress bar container */
.progress-bar-container {
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  overflow: hidden;
  margin: 5rem;
  position: relative;
}

/* Progress bar */
.progress-bar {
  height: 100%;
  background-color: #075c07;
  transition: width 0.1s linear;
}
</style>