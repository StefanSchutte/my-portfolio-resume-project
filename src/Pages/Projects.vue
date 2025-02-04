<template>
  <div>
    <Tools />
    <Loader :show="isLoading" />
    <div class="header-section">
      <h2 id="projects">PROJECTS</h2>
      <div class="view-toggle">
        <button @click="toggleView" class="toggle-view-btn">
          {{ isCarouselView ? "Switch to Grid View" : "Switch to Carousel View" }}
        </button>
      </div>
    </div>

    <div v-show="isCarouselView && !isLoading" class="carousel-container">
      <div class="carousel">
        <div class="project-card" v-for="(project, index) in projects" :key="index">
          <h4>{{ project.title }}</h4>
          <img :src="project.image" :alt="project.title" @click="showOverlay(index)" @load="onImageLoad" />
        </div>
      </div>
      <button @click="prevSlide" class="carousel-control prev">&#10094;</button>
      <button @click="nextSlide" class="carousel-control next">&#10095;</button>
    </div>

<!--    <div v-show="!isCarouselView && !isLoading" class="list-view">
      <div class="list-item" v-for="project in projects" :key="project.title">
        <img :src="project.image" :alt="project.title" class="list-image" />
        <div class="list-details">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="linksGitDep">
            <a :href="project.githubLink" target="_blank">Code</a>
            <a :href="project.netlifyLink" target="_blank">Deployed Site</a>
          </div>
        </div>
      </div>
    </div>-->

    <div v-show="!isCarouselView && !isLoading" class="grid-view">
      <div class="grid-item" v-for="(project, index) in projects" :key="project.title" @click="showOverlay(index)">
        <img :src="project.image" :alt="project.title" class="grid-image" />
        <h4 class="grid-title">{{ project.title }}</h4>
      </div>
    </div>

    <div class="overlay" v-if="isOverlayVisible">
      <div class="overlay-content">
        <img :src="projects[currentIndex].image" :alt="projects[currentIndex].title" class="overlay-image" />
        <h3>{{ projects[currentIndex].title }}</h3>
        <p>{{ projects[currentIndex].description }}</p>
        <div class="linksGitDep">
          <a :href="projects[currentIndex].githubLink" target="_blank">Code</a>
          <a :href="projects[currentIndex].netlifyLink" target="_blank">Deployed Site</a>
        </div>
        <button @click="hideOverlay">X</button>
      </div>
    </div>
  </div>
</template>

<script setup>

/**
 * @typedef {Object} Project
 * @property {string} title - The title of the project.
 * @property {string} image - The URL of the project's image.
 * @property {string} githubLink - The URL to the project's GitHub repository.
 * @property {string} netlifyLink - The URL to the deployed site of the project.
 * @property {string} description - A brief description of the project.
 */

import { ref, onMounted } from 'vue';
import Tools from "../Components/Nav/Tools.vue";
import Loader from "../Components/Utils/Loader.vue";

const isLoading = ref(true);
const isCarouselView = ref(true);

/** @type {import('vue').Ref<Project[]>} */
const projects = ref([
  {
    title: 'Vercel Gemini Chatbot',
    image: 'projects-vercelgemini.png',
    githubLink: 'https://github.com/StefanSchutte/gemini-ai-chatbot',
    netlifyLink: 'https://gemini-ai-chatbot-tau-tan.vercel.app/',
    description: 'Transformed a flight-specific Next.js chatbot into a general-purpose AI assistant by implementing Google search capabilities and enhancing the UI with improved styling and message handling.'
  },
  {
    title: 'Podcast App',
    image: 'podcastimg.png',
    githubLink: 'https://github.com/StefanSchutte/STESCH302_FTO2308_GroupA2_Stefan-Schutte_DWACapstone',
    netlifyLink: 'https://podcasted-podcast-app.netlify.app/',
    description: 'A podcast app that allows users to browse various podcasts shows, play episodes and track their favorite episodes.'
  },
  {
    title: 'Book Connect',
    image: 'bookconnect.png',
    githubLink: 'https://github.com/StefanSchutte/STESCH302_FTO2308_GroupB2_Stefan_Schutte_IWACapstone',
    netlifyLink: 'https://bookconnect-app-js.netlify.app/',
    description: 'Interactive Web App where I applied JavaScript to achieve required functionality.'
  },
  {
    title: 'My Digital Resume',
    image: 'Capture.png',
    githubLink: 'https://github.com/StefanSchutte/STESCH302_FTO2308_GroupC_Stefan-Schutte_ITW_Final_Digital_Resume',
    netlifyLink: 'https://stefanschutte-digital-resume.netlify.app/',
    description: 'My Digital Resume created using HTML and CSS.'
  },
  {
    title: 'Mapty App',
    image: 'Capture2.png',
    githubLink: 'https://github.com/StefanSchutte/Mapty',
    netlifyLink: 'https://mapty-stafan.netlify.app/',
    description: 'An app that tracks a users running/cycling activities.'
  },
  {
    title: 'Bankist',
    image: 'Capture3.png',
    githubLink: 'https://github.com/StefanSchutte/Bankist_app',
    netlifyLink: 'https://bankist-dom-stefan.netlify.app/',
    description: 'This project is a minimalist banking website called Bankist. It is a static website created using HTML, CSS, and JavaScript. The website showcases various sections, including features, operations, testimonials, and a sign-up section.'
  },
  {
    title: 'Unsplash Infinite Scroll',
    image: 'projects-unsplash.png',
    githubLink: 'https://github.com/StefanSchutte/Unsplash_API_Infinite_Scroll_',
    netlifyLink: 'https://stefan-unsplash-api-infinite-scroll.netlify.app/',
    description: 'Continuously loads new images as the user scrolls down the page, providing an endless stream of random pictures from Unsplash.'
  },
  {
    title: 'Bookmark App',
    image: 'Capture5.png',
    githubLink: 'https://github.com/StefanSchutte/Bookkeeper_Application',
    netlifyLink: 'https://bookmark-app-stefan.netlify.app/',
    description: 'Bookmark App is a simple web application that allows users to manage and save bookmarks for their favorite websites. Users can add, delete, and visit bookmarks with ease. '
  },
  {
    title: 'Paint Clone',
    image: 'paint.png',
    githubLink: 'https://github.com/StefanSchutte/Paint_Clone',
    netlifyLink: 'https://paint-clone-stefan.netlify.app/',
    description: 'A simple web-based painting application that allows users to draw, erase, change brush sizes, and manipulate colors. The application provides features such as saving and loading the canvas from local storage, clearing the canvas, and downloading the created artwork as an image file.'
  },
  {
    title: 'Rock Paper Scissors Lizard Spock',
    image: 'projects-rock-spock.png',
    githubLink: 'https://github.com/StefanSchutte/Rock_Paper_Scissors_Lizard_Spock_Game',
    netlifyLink: 'https://spock-rock-game-stefan.netlify.app/',
    description: 'This web application allows users to play the popular "Rock Paper Scissors Lizard Spock" game against the computer.'
  },
  {
    title: 'Kanban Board - Drag and Drop',
    image: 'projects-kanban.png',
    githubLink: 'https://github.com/StefanSchutte/Kanban_Board',
    netlifyLink: 'https://kanban-board-drag-n-drop.netlify.app/',
    description: 'This project is a simple Kanban Board implemented using HTML, CSS, and JavaScript, featuring drag-and-drop functionality for managing tasks across different stages.'
  },
  {
    title: 'NASA API Pictures',
    image: 'projects-nasa.png',
    githubLink: 'https://github.com/StefanSchutte/NASA_API_Pictures_',
    netlifyLink: 'https://nasa-api-pictures-apod.netlify.app/',
    description: 'This web application utilizes the NASA API to showcase a curated collection of astronomy-related images, including the NASA Picture of the Day.'
  },
  {
    title: 'Quote Generator',
    image: 'projects-quote.png',
    githubLink: 'https://github.com/StefanSchutte/quote-generator',
    netlifyLink: 'https://stefans-quote-generator.netlify.app/',
    description: 'This quote generator app is a simple web application designed to display and share random quotes.'
  },
  {
    title: 'Joke Teller',
    image: 'projects-joke.png',
    githubLink: 'https://github.com/StefanSchutte/Joke_Teller',
    netlifyLink: 'https://joke-teller-stefan.netlify.app/',
    description: 'Joke Teller is a web application that fetches jokes from an API and converts them into voice using the VoiceRSS JavaScript SDK.'
  },
  {
    title: 'Pong Game',
    image: 'projects-pong.png',
    githubLink: 'https://github.com/StefanSchutte/Stefan-s_pong_game',
    netlifyLink: 'https://stefan-pong-game.netlify.app/',
    description: 'Pong is a two-dimensional sports game that simulates table tennis.'
  },
  {
    title: 'My Website',
    image: 'projects-web.png',
    githubLink: 'https://github.com/StefanSchutte/my-portfolio-resume-project',
    netlifyLink: 'https://my-website-stefan-schutte.netlify.app',
    description: 'This website is designed to provide visitors with a comprehensive overview of my background, skills, and projects. Whether you\'re an employer, colleague, or simply interested in learning more about me, this site offers valuable insights into my professional journey and achievements.'
  },
]);

let currentIndex = 0;
const isOverlayVisible = ref(false);
let loadedImages = 0;

const onImageLoad = () => {
  loadedImages++;
  if (loadedImages === projects.value.length) {
    isLoading.value = false;
  }
};

const toggleView = () => {
  isCarouselView.value = !isCarouselView.value;
};

/**
 * Moves the carousel to the previous slide.
 */
const prevSlide = () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
};

/**
 * Moves the carousel to the next slide.
 */
const nextSlide = () => {
  if (currentIndex < projects.value.length - 1) {
    currentIndex++;
    updateCarousel();
  }
};

/**
 * Updates the carousel's transform property to show the correct slide.
 */
const updateCarousel = () => {
  const carousel = document.querySelector('.carousel');
  const projectCards = document.querySelectorAll('.project-card');
  const cardWidth = projectCards[0].offsetWidth;
  carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
};

/**
 * Displays the overlay with the project details.
 * @param {number} index - The index of the project to display in the overlay.
 */
const showOverlay = (index) => {
  currentIndex = index;
  isOverlayVisible.value = true;
};

/**
 * Hides the overlay with the project details.
 */
const hideOverlay = () => {
  isOverlayVisible.value = false;
};
</script>

<style>
/* Styles for carousel container and controls */
.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
  height: 60%;
  position: relative;
}

.carousel-control {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  background: #434141;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 20;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-control:hover {
  background-color: #28b128;
  transition: background-color 0.3s ease;
}

.prev {
  left: 0;
}

.next {
  right: 0;
}

/* Styles for project cards */
h4 {
  margin: 1rem;
  color: #b84d4d;
  font-size: large;
}

.project-card {
  flex: 0 0 auto;
  margin-right: 20px;
  width: 30rem;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.5s ease;
}
.project-card:hover {
  transform: scale(1.05);
}

.project-card img {
  width: 100%;
  height: 50%;
  object-fit: cover;
}

.project-card h3 {
  font-size: 1.4rem;
  color: #813a3a;
}

.project-card p {
  font-size: medium;
  color: #333;
}

.header-section {
  position: relative;
  padding: 3%;
}

#projects {
  font-family: "Oswald", sans-serif;
  font-size: 5vh;
  display: flex;
  justify-content: center;

}

.view-toggle {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
}

/* Styles for project links */
.linksGitDep {
  display: flex;
}

.linksGitDep a {
  color: #8f8c8c;
  margin-right: 10px;
  padding: 8px 16px;
  border: 1px solid #8f8c8c;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.linksGitDep a:hover {
  color: #075c07;
  transition: background-color 0.3s ease;
}

/* Styles for overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.overlay-content {
  position: relative;
  background-color: #292626;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 30;
}

.overlay button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.overlay-image {
  max-width: 25rem;
  height: 15rem;
}

.overlay h3 {
  color: #aa5454;
  font-size: 2rem;
}

/*list*/
.toggle-view-btn {
  margin: 1rem auto;
  display: block;
  font-size: large;
  cursor: pointer;
  color: #8f8c8c;
  padding: 8px 16px;
  border: 1px solid #8f8c8c;
  border-radius: 4px;
  background-color: transparent;
  font-family: inherit;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.toggle-view-btn:hover {
  transform: scale(1.10);
  color: #075c07;
  transition: background-color 0.3s ease;
}

.list-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.list-item {
  display: flex;
  gap: 1rem;
  border: 1px solid #8f8c8c;
  padding: 1rem;
  border-radius: 8px;
  background-color: #292626;
}

.list-image {
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.list-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.list-details h3 {
  margin: 0;
  color: #b84d4d;
}

.list-details p {
  margin: 0.5rem 0;
  color: #c8c3c3;
}



.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.grid-item {
  background-color: #292626;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.grid-item:hover {
  transform: scale(1.05);
}

.grid-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.grid-title {
  color: #b84d4d;
  text-align: center;
  padding: 1rem;
  margin: 0;
  font-size: 1.2rem;
}

/* Responsive styles */
@media (max-width: 486px) {
  .list-item {
    flex-direction: column; /* Stack items vertically */
    align-items: flex-start; /* Align items to the start */
  }

  .list-image {
    width: 100%;
    height: auto;
  }

  .list-details {
    text-align: left;
    margin-top: 0.5rem;
  }
}

@media only screen and (max-width: 768px) {
  .view-toggle {
    position: static;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    transform: none;
  }
}

@media only screen and (max-width: 550px) {

  .project-card {
    flex: 0 0 auto;
    margin-right: 20px;
    width: 250px;
    height: 400px;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.5s ease;
  }
  .overlay-image {
    max-width: 10rem;
    height: 5rem;
  }

  h4 {
    font-size: medium;
  }
}

/* Responsive adjustments for grid */
@media (max-width: 1200px) {
  .grid-view {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .grid-view {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid-view {
    grid-template-columns: 1fr;
  }

  .grid-item {
    max-width: 100%;
  }
}
</style>