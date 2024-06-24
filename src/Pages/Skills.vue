<template>
  <AboutMeSection/>
  <h2 id="skills">SKILLS</h2>
  <ul class="skills-grid">
    <li><i class="devicon-html5-plain colored"></i><p>HTML</p></li>
    <li><i class="devicon-css3-plain colored"></i><p>CSS</p></li>
    <li><i class="devicon-tailwindcss-original colored"></i><p>tailwindcss</p></li>
    <li><i class="devicon-javascript-plain colored"></i><p>JavaScript</p></li>
    <li><i class="devicon-typescript-plain colored"></i><p>TypeScript</p></li>
    <li><i class="devicon-react-original colored"></i><p>React</p></li>
    <li><i class="devicon-reactrouter-plain colored"></i><p>reactrouter</p></li>
    <li><i class="devicon-vuejs-plain colored"></i><p>Vue</p></li>
    <li><i class="devicon-react-original"></i><p>create react app</p></li>
    <li><i class="devicon-vite-original colored"></i><p>Vite</p></li>
    <li><i class="devicon-github-original colored"></i><p>Github</p></li>
    <li><i class="devicon-figma-plain colored"></i><p>Figma/Figjam</p></li>
    <li><i class="devicon-vscode-plain colored"></i><p>Visual Studio Code</p></li>
    <li><i class="devicon-webstorm-plain colored"></i><p>Webstorm</p></li>
    <li><i class="devicon-powershell-plain colored"></i><p>Powershell</p></li>
    <li><i class="devicon-netlify-plain colored"></i><p>Netlify</p></li>
  </ul>
</template>

<script setup lang="ts">
/**
 * Importing the AboutMeSection component
 */
import AboutMeSection from "../Components/Nav/AboutMeSection.vue";
/**
 * Importing the devicon CSS for skill icons
 */
import 'devicon/devicon.min.css';
</script>

<style>
/* Styles the skills heading. Sets the font size to 5% of the viewport height.
 Uses flexbox for layout. Centers the content horizontally. Adds padding around the element.*/
#skills {
  font-family: "Oswald", sans-serif;
  font-size: 5vh;
  display: flex;
  justify-content: center;
  padding: 3%;
}

/* Styles the unordered list. Removes the default list style. Centers the text. */
ul {
  list-style-type: none;
  text-align: center;
}

/* Styles each list item. Adds margin below each list item. */
li {
  margin-bottom: 1rem;
}

/* Styles the icons. Sets the icon size to 2rem. */
i {
  font-size: 2rem;
}

/* Styles for screens with a max width of 1000px. Uses grid layout. Two columns. */
@media only screen and (max-width: 1000px) {

  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* Styles for screens with a min width of 1024px. Four columns.  */
@media only screen and (min-width: 1024px) {

  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

</style>