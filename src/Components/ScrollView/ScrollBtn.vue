<template>
  <div class="header-section">
    <h1>Just want to scroll through my portfolio?</h1>
    <p class="subtitle">Experience my portfolio in a smooth, scrollable format</p>
    <div class="button-wrapper">
      <button @click="toggleView" class="toggle-view-btn">
        {{ isScrollView ? "Hide Scroll View" : "Show Scroll View" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isScrollView = ref(false);

const updateScrollViewState = () => {
  isScrollView.value = route.path === '/scroll';
};

watch(
    () => route.path,
    () => updateScrollViewState()
);

onMounted(() => {
  updateScrollViewState();
});

const toggleView = async () => {
  if (!isScrollView.value) {
    await router.push('/scroll');
    const scrollNav = document.querySelector('.scroll-nav');
    if (scrollNav) {
      scrollNav.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    router.push('/home');
  }
};
</script>

<style scoped>
.header-section {
  position: relative;
  padding: 1rem 1rem;
  background: linear-gradient(to right, #1a1a1a, #2d2d2d);
  border-radius: 1px;
  margin: 0rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header-section h1 {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  font-family: "Oswald", sans-serif;
}

.subtitle {
  color: #9ca3af;
  max-width: 42rem;
  margin: 0 auto 2rem;
}

.button-wrapper {
  display: flex;
  justify-content: center;

}

.toggle-view-btn {
  font-size: large;
  cursor: pointer;
  color: #8f8c8c;
  padding: 8px 16px;
  border: 1px solid #8f8c8c;
  border-radius: 4px;
  background-color: transparent;
  font-family: inherit;
  text-decoration: none;
  transition: all 0.3s ease;
}

.toggle-view-btn:hover {
  color: white;
  background-color: #059669;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1.02) translateZ(0);
}

@media (max-width: 768px) {
  .button-wrapper {
    position: static;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    transform: none;
  }
}

@media (max-width: 640px) {
  .header-section h1 {
    font-size: 1.875rem;
  }
}
</style>