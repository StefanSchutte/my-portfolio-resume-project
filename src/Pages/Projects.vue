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

    <div v-show="isCarouselView && !isLoading">
      <swiper
          :slides-per-view="1"
          :navigation="true"
          :pagination="{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 5
          }"
          :modules="[Navigation, Pagination]"
          :space-between="20"
          :breakpoints="{
      // Mobile (small)
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // Mobile (landscape) / Tablet (small)
      480: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // Tablet
      640: {
        slidesPerView: 2,
        spaceBetween: 25
      },
      // Tablet (landscape)
      768: {
        slidesPerView: 2,
        spaceBetween: 25
      },
      // Desktop (small)
      1024: {
        slidesPerView: 4,
        spaceBetween: 25
      },
      // Desktop (medium)
      1280: {
        slidesPerView: 4,
        spaceBetween: 25
      },
      // Desktop (large)
      1536: {
        slidesPerView: 5,
        spaceBetween: 25
      },
      // Desktop (extra large)
      1920: {
        slidesPerView: 5,
        spaceBetween: 25
      }
    }"
          class="project-swiper"
      >
        <swiper-slide v-for="(project, index) in projects" :key="index">
          <div class="project-card" @click="showOverlay(index)">
            <img
                :src="project.image"
                :alt="project.title"
                @load="onImageLoad"
                class="carousel-image"
            />
            <h4 class="carousel-title">{{ project.title }}</h4>
          </div>
        </swiper-slide>
      </swiper>
    </div>

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
        <button @click="hideOverlay">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
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

import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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

/* Styles for project cards */
h4 {
  margin: 1rem;
  color: #b84d4d;
  font-size: large;
}

.project-card {
  flex: 0 0 auto;
  width: 100%;
  max-width: 450px;
  background-color: #292626;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  margin: 0 auto;
}
.project-card:hover {
  transform: scale(1.05);
}

.carousel-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.carousel-title {
  color: #b84d4d;
  text-align: center;
  padding: 1rem;
  margin: 0;
  font-size: 1.2rem;
}

.project-card p {
  font-size: medium;
  color: #333;
}

.header-section {
  position: relative;
  padding: 2rem 1rem;
  background: linear-gradient(to right, #1a1a1a, #2d2d2d);
  border-radius: 20px;
  margin: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

#projects {
  font-family: "Oswald", sans-serif;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  color: #ffffff;
  margin: 0;
  letter-spacing: 2px;
  position: relative;
}
#projects::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: #059669;
  border-radius: 2px;
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
  color: white;
  background-color: #059669;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1.02) translateZ(0);
}

/* Styles for overlay */
.overlay {
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.overlay-content {
  position: relative;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 2.5rem;
  border-radius: 15px;
  align-items: center;
  width: 85%;
  max-width: 1000px;
  height: auto;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 30;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  animation: slideUp 0.4s ease-out;
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

.overlay button {
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

.overlay button:hover {
  background-color: rgba(255, 59, 59, 0.9);
  transform: rotate(90deg);
}

.overlay-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.overlay-image:hover {
  transform: scale(1.02);
}

.overlay h3 {
  color: #ff6b6b;
  font-size: 2.25rem;
  margin: 0;
  font-weight: 600;
  text-align: center;
}

.overlay p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #d1d1d1;
  margin: 0;
  text-align: center;
  max-width: 800px;
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
  color: white;
  background-color: #059669;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1.02) translateZ(0);
}
/*grid*/
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

/*Swiper-specific styles */
.project-swiper {
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
}

.swiper-wrapper {
  display: flex;
  align-items: stretch;
  height: auto;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.swiper-button-next,
.swiper-button-prev {
  color: #ffffff;
  background: #374151;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: #059669;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1.02) translateZ(0);
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 30px;
}

.swiper-pagination-bullet {
  background: #8597bc;
}

.swiper-pagination-bullet-active {
  background: #059669;
}

/* Responsive styles */
@media only screen and (max-width: 768px) {
  .view-toggle {
    position: static;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    transform: none;
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