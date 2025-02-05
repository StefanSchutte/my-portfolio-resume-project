<template>
  <nav>
    <ul class="nav">
      <router-link to="/home"><div class="nav-item"><img src="/home.png" alt="Home" title="Home"/>Home</div></router-link>
      <router-link to="/aboutMeSection"><div class="nav-item"><img src="/curriculum-vitae.png" alt="About" title="About"/>Resume</div></router-link>
      <router-link to="/projects"><div class="nav-item"><img src="/project.png" alt="Projects" title="Projects"/>Projects</div></router-link>
      <router-link to="/stefan"><div class="nav-item"><img src="/user.png" alt="user" title="Stefan"/>Contact Me</div></router-link>
    </ul>
    <div class="theme-toggle-container">
      <ThemeToggle />
    </div>
  </nav>
</template>

<style>
/* Styles for the navigation container */
nav {
  position: relative;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #5c5a5a;
  font-family: "Oswald", sans-serif;
  padding: 0.3rem;
}

/* Styles for the navigation list */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Removes default list style and applies layout */
.nav li {
  list-style-type: none;
  display: inline-block;
  margin: 1px;
}

/* Adds margin to images within the navigation */
nav ul img {
  margin: 0.5rem;
}

/* Styles for each navigation item */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  text-align: center;
  max-width: calc(100vw / 4);
  padding: 2px;
}

/* Ensures images in navigation items fit correctly */
.nav-item img {
  max-width: 100%;
  width: 2rem;
  padding: 1px;
}

/* Adds hover effect to navigation items */
.nav-item:hover {
  background-color: #059669;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1.20) translateZ(0);
  border-radius: 5px;
}

/* Removes underline from links and sets text color */
a {
  text-decoration: none;
  color: rgb(5, 5, 5);
}

/* Styles the container for the theme toggle component */
.theme-toggle-container {
  position: absolute;
  top: 1rem;
  right: 2rem;
}

/* Margin for paragraphs */
p {
  margin-top: 0.1rem;
}

@media only screen and (max-width: 1000px) {

  .nav-item img {
    width: 2rem;
    padding: 3px;
  }
}

@media only screen and (max-width: 550px) {

  nav {
    flex-direction: column;
  }

  /* Allow items to take full width. Remove max-width. */
  .nav-item {
    flex: 1;
    text-align: center;
    max-width: none;
    margin: 0.3rem;
    font-size: small;
    padding: 1px;
  }

  /* Ensure images do not overflow. Maintain aspect ratio */
  .nav-item img {
    max-width: 100%;
    width: 0.75rem;
    height: auto;
  }

  /* Allow items to wrap onto multiple lines */
  nav ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.1rem;
  }

  .theme-toggle-container {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
  }

}

</style>
<script setup lang="ts">
import ThemeToggle from "../Utils/ThemeToggle.vue";

/**
 * This is a Vue component representing a navigation bar with links to different sections of the site.
 * It includes a theme toggle component.
 *
 * @component
 */
</script>