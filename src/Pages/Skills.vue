<template>
  <AboutMeSection/>
  <Loader :show="isLoading" />
  <h2 id="skills" v-show="!isLoading">SKILLS</h2>
  <div class="skills-container">
  <ul class="skills-grid" v-show="!isLoading">
    <li v-for="skill in skills" :key="skill.name">
      <i :class="skill.icon"></i>
      <p>{{ skill.name }}</p>
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">
import AboutMeSection from "../Components/Nav/AboutMeSection.vue";
import 'devicon/devicon.min.css';
import Loader from "../Components/Utils/Loader.vue";
import { ref, onMounted, nextTick } from "vue";

const isLoading = ref(true);

const skills = [
  { icon: "devicon-html5-plain colored", name: "HTML" },
  { icon: "devicon-css3-plain colored", name: "CSS" },
  { icon: "devicon-tailwindcss-original colored", name: "tailwindcss" },
  { icon: "devicon-javascript-plain colored", name: "JavaScript" },
  { icon: "devicon-typescript-plain colored", name: "TypeScript" },
  { icon: "devicon-csharp-plain colored", name: "C#" },
  { icon: "devicon-react-original colored", name: "React" },
  { icon: "devicon-reactrouter-plain colored", name: "reactrouter" },
  { icon: "devicon-vuejs-plain colored", name: "Vue" },
  { icon: "devicon-react-original", name: "create react app" },
  { icon: "devicon-vite-original colored", name: "Vite" },
  { icon: "devicon-github-original colored", name: "Github" },
  { icon: "devicon-figma-plain colored", name: "Figma/Figjam" },
  { icon: "devicon-vscode-plain colored", name: "Visual Studio Code" },
  { icon: "devicon-webstorm-plain colored", name: "Webstorm" },
  { icon: "devicon-rider-plain colored", name: "Rider" },
  { icon: "devicon-powershell-plain colored", name: "Powershell" },
  { icon: "devicon-netlify-plain colored", name: "Netlify" },
  { icon: "devicon-microsoftsqlserver-plain colored", name: "MS SQL" },
];

onMounted(async () => {

  isLoading.value = true;
  await nextTick();
  await document.fonts.ready;
  const allIcons = document.querySelectorAll(".skills-grid i");
  await Promise.all(
      Array.from(allIcons).map(
          (icon) =>
              new Promise<void>((resolve) => {
                const timeout = setTimeout(resolve, 5000); // Failsafe timeout (5 seconds)
                const checkRendered = () => {
                  const iconRect = icon.getBoundingClientRect();
                  if (iconRect.width > 0 && iconRect.height > 0) {
                    clearTimeout(timeout);
                    resolve();
                  } else {
                    requestAnimationFrame(checkRendered);
                  }
                };
                checkRendered();
              })
      )
  );

  isLoading.value = false;
});
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

.skills-container {
  margin-left: -3rem;
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
    grid-template-columns: 1fr 1fr 1fr;
  }

  i {
    font-size: 1.5rem;
  }
}

/* Styles for screens with a min width of 1024px. Four columns.  */
@media only screen and (min-width: 1024px) {

  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>