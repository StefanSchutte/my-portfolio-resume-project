<template>
  <div class="scroll-container">
    <section class="section">
      <Hero />
    </section>
    <ScrollNav />
    <section class="section">
      <About />
    </section>
    <section class="section">
      <Education />
    </section>
    <section class="section">
      <Experience />
    </section>
    <section class="section">
      <Skills />
    </section>
    <section class="section">
      <Projects />
    </section>
    <section class="section">
      <Stefan />
    </section>

    <!-- Quick Navigation -->
    <div class="quick-nav" :class="{ 'visible': showQuickNav }">
      <button @click="scrollToSection(0)">Home</button>
      <button @click="scrollToSection(1)">About</button>
      <button @click="scrollToSection(2)">Education</button>
      <button @click="scrollToSection(3)">Experience</button>
      <button @click="scrollToSection(4)">Skills</button>
      <button @click="scrollToSection(5)">Projects</button>
      <button @click="scrollToSection(6)">Contact</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Hero from '../../Pages/Home.vue';
import About from '../../Pages/About.vue';
import Education from '../../Pages/Education.vue';
import Experience from '../../Pages/Experience.vue';
import Skills from '../../Pages/Skills.vue';
import Projects from '../../Pages/Projects.vue';
import Stefan from '../../Pages/ContactMe.vue';
import ScrollNav from "./ScrollNav.vue";

const showQuickNav = ref(false);
let lastScrollY = 0;

const handleScroll = () => {
  const scrollY = window.scrollY;
  showQuickNav.value = scrollY > 100 && scrollY < lastScrollY;
  lastScrollY = scrollY;
};

const scrollToSection = (index) => {
  if (index === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const sections = document.querySelectorAll('.section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.scroll-container {
  position: relative;
}

.section {
  min-height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  padding: 0;
  margin: 0;
}

.quick-nav {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 100;
  pointer-events: none;
}

.quick-nav.visible {
  opacity: 1;
  pointer-events: auto;
}

.quick-nav button {
  background-color: #374151;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-nav button:hover {
  background-color: #059669;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .quick-nav {
    right: 1rem;
  }

  .quick-nav button {
    padding: 0.3rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>