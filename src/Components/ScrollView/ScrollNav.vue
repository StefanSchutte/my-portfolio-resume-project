<template>
  <nav class="scroll-nav">
    <ul class="nav">
      <li><button @click="scrollToSection(0)" class="nav-item">
        <img src="/home.png" alt="Home" title="Home"/>Home
      </button></li>
      <li><button @click="scrollToSection(1)" class="nav-item">
        <img src="/information-button.png" alt="About" title="About"/>About
      </button></li>
      <li><button @click="scrollToSection(2)" class="nav-item">
        <img src="/graduation.png" alt="Education" title="Education"/>Education
      </button></li>
      <li><button @click="scrollToSection(3)" class="nav-item">
        <img src="/portfolio.png" alt="Experience" title="Experience"/>Experience
      </button></li>
      <li><button @click="scrollToSection(4)" class="nav-item">
        <img src="/skills.png" alt="Skills" title="Skills"/>Skills
      </button></li>
      <li><button @click="scrollToSection(5)" class="nav-item">
        <img src="/project.png" alt="Projects" title="Projects"/>Projects
      </button></li>
      <li><button @click="scrollToSection(6)" class="nav-item">
        <img src="/user.png" alt="Contact" title="Contact"/>Contact
      </button></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const scrollToSection = (index: number) => {
  if (index === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const sections = document.querySelectorAll('.section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.scroll-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #494949;
  font-family: "Oswald", sans-serif;
  width: 100%;
}

.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  margin: 0.5rem;
  padding: 0.5rem;
  color: black;
  font-family: "Oswald", sans-serif;
  transition: all 0.3s ease;
}

.nav-item img {
  width: 1.5rem;
  height: 1.5rem;
  margin-bottom: 0.25rem;
  padding: 1px;
}

.nav-item:hover {
  background-color: #059669;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1.20) translateZ(0);
  border-radius: 5px;
}


@media only screen and (max-width: 550px) {
  .scroll-nav {
    padding: 0.3rem;
  }

  .nav {
    flex-wrap: wrap;
    gap: 0.1rem;
  }

  .nav-item {
    font-size: small;
    margin: 0.2rem;
    padding: 1px;
  }

  .nav-item img {
    width: 1.2rem;
    height: auto;
  }
}
</style>