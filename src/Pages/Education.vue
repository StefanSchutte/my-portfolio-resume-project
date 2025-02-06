<template>
  <AboutMeSection/>
  <div>
  <div class="header-section">
    <h2 id="education">EDUCATION</h2>
    <div class="view-toggle">
      <button
          @click="toggleView"
          class="toggle-view-btn"
      >
        {{ isGridView ? "Switch to List View" : "Switch to Grid View" }}
      </button>
    </div>
  </div>
  <!-- Timeline Container -->
  <div v-if="isGridView" class="timeline-container">
    <!-- Center Line -->
    <div class="center-line"></div>
    <!-- Education Items -->
    <div class="timeline-items">
      <div
          v-for="(education, index) in educations"
          :key="index"
          class="timeline-item"
          :class="{ 'right': index % 2 === 0, 'left': index % 2 === 1 }"
          @click="openModal(education)"
      >
        <div class="education-card">
          <span class="education-date">{{ education.date }}</span>
          <h3 class="education-title">{{ education.title }}</h3>
          <p class="education-place">{{ education.location }}</p>
        </div>
        <!-- Timeline Node -->
        <div class="timeline-node"></div>
      </div>
    </div>
  </div>
  <!-- List View -->
  <div v-else class="list-view">
    <div
        class="list-item"
        v-for="(education, index) in educations"
        :key="index"
        @click="openModal(education)"
    >
      <div class="list-content">
        <p class="list-date">{{ education.date }}</p>
        <h3>{{ education.title }}</h3>
        <p class="list-place">{{ education.location }}</p>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <Transition name="modal">
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="modal-body">
          <img
              v-if="selectedEducation?.certImg"
              :src="selectedEducation.certImg"
              :alt="selectedEducation.title"
              class="certificate-image"
          />

        </div>

        <div class="modal-header">
          <h3>{{ selectedEducation?.title }}</h3>
          <p class="modal-date">{{ selectedEducation?.date }}</p>
          <p class="modal-place">{{ selectedEducation?.location }}</p>
          <p class="modal-type">{{ selectedEducation?.grad }}</p>
        </div>

        <a
            v-if="selectedEducation?.website"
            :href="selectedEducation.website"
            target="_blank"
            rel="noopener noreferrer"
            class="website-link"
        >
          View Course
        </a>
      </div>
    </div>
  </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AboutMeSection from "../Components/Nav/AboutMeSection.vue";

interface Education {
  title: string;
  grad: string;
  date: string;
  location: string;
  certImg?: string;
  website?: string;
  show: boolean;
}

const isGridView = ref(true);
const isModalOpen = ref(false);
const selectedEducation = ref(null);

const educations = ref<Education[]>([
  {
    title: 'The Nuxt 3 Bootcamp - The Complete Developer Guide',
    grad:'Certificate',
    date: '2025',
    location: 'Laith Harb',
    certImg: '/certImgNuxt.jpeg',
    website:'https://www.udemy.com/course/the-nuxt-3-bootcamp-the-complete-developer-guide/',
    show: false
  },
  {
    title: 'ASP.NET MVC Complete Guide using .NET Core [.NET8 Updated]',
    grad:'Certificate',
    date: '2024',
    location: 'Sameer Saini',
    certImg: '/certImgasp.netmvcguide.jpg',
    website:'https://www.udemy.com/course/aspnet-mvc-course-aspnet-core/',
    show: false
  },
  {
    title: 'The Complete ASP.NET MVC 5 Course.',
    grad:'Certificate',
    date: '2024',
    location: 'Code With Mosh',
    certImg: '/certImgMosh.jpeg',
    website:'https://www.udemy.com/course/the-complete-aspnet-mvc-5-course/',
    show: false
  },
  {
    title: 'Software Development - C#/ OOP/ASP.NET MVC/MS SQL/ SQL Server.',
    grad:'Certificate',
    date: '2024',
    location: 'Bluelime Learning Solutions.',
    certImg: '/certImgblueline.jpg',
    website:'https://www.udemy.com/course/software-developer-coopaspnet-mvcms-sqlsql-server/',
    show: false
  },
  {
    title: 'Software Development/Web Development.',
    grad:'Bootcamp Certificate',
    date: '2024',
    location: 'CodeSpace Academy.',
    certImg: '/certImgCodeS.png',
    website:'https://www.codespace.co.za/programs/software-development/',
    show: false
  },
  {
    title: 'HTML, CSS & JavaScript Certification Course for Beginners.',
    grad:'Certificate',
    date: '2023',
    location: 'YouAccel Training',
    certImg: '/certImghtmlbeginer.jpeg',
    website:'https://www.udemy.com/course/html-css-javascript-certification-course-for-beginners/',
    show: false
  },
  {
    title: 'Ultimate CSS Grid Course: From Beginner to Advanced.',
    grad:'Certificate',
    date: '2023',
    location: 'Peter Sommerhoff',
    certImg: '/certImgCssGrid.jpeg',
    website:'https://www.udemy.com/course/css-grid/',
    show: false
  },
  {
    title: 'Automated Software Testing with Puppeteer.',
    grad:'Certificate',
    date: '2023',
    location: 'Kaniel Outis',
    certImg: '/certImgPuppeteer.jpeg',
    website:'https://www.udemy.com/course/automated-headless-browser-testing-with-puppeteer/',
    show: false
  },
  {
    title: 'JAVASCRIPT WEB PROJECTS; 20 PROJECTS TO BUILD YOUR PORTFOLIO.',
    grad:'Certificate',
    date: '2023',
    location: 'Zero to Master Academy',
    certImg: '/certImg20projects.jpeg',
    website:'https://www.udemy.com/course/javascript-web-projects-to-build-your-portfolio-resume/',
    show: false
  },
  {
    title: 'MAKE MUSIC WITH CODE: COMPLETE GUIDE TO CODING WITH SONIC PI.',
    grad:'Certificate',
    date: '2023',
    location: 'Steve Lydford',
    certImg: '/certImgSonicPi.jpeg',
    website:'https://www.udemy.com/course/make-music-with-code/',
    show: false
  },
  {
    title: 'THE COMPLETE JAVASCRIPT COURSE 2023: FROM ZERO TO EXPERT!',
    grad:'Certificate',
    date: '2022-2023',
    location: 'Jonas Schmedtmann',
    certImg: '/certImgJsBeginAdv.jpeg',
    website:'https://www.udemy.com/course/the-complete-javascript-course/',
    show: false
  },
  {
    title: 'AUDIO ENGINEERING FUNDAMENTALS CERTIFICATE',
    grad:'Certificate',
    date: '2021',
    location: 'Marco Galvan',
    certImg: '/certImgaudio.jpg',
    website:'https://www.udemy.com/course/audio-engineering-fundamentals/',
    show: false
  },
  {
    title: 'PADI OPEN WATER DIVER & PADI ADVANCED OPEN WATER DIVER',
    grad:'Certificate',
    date: '2019',
    location: 'Padi, Busan South Korea',
    certImg: '/certImgPadi.png',
    website:'https://store.padi.com/en-uk/courses/advanced-open-water/p/60463-1B2C/',
    show: false },
  {
    title: 'TEFL LEVEL 5 CERTIFICATE',
    grad:'Certificate',
    date: '2019',
    location: 'The TEFL Academy, England',
    certImg: '/certImgTefl.png',
    website:'https://www.theteflacademy.com/za/online-tefl-course/level-5/',
    show: false
  },
  {
    title: 'TEACHERS TRAINING COURSE CERTIFICATE',
    grad:'Certificate',
    date: '2018',
    location: 'Seoul, South Korea.',
    certImg: '/certImgTeach.png',
    website:'http://www.talkingclub.co.kr/default.aspx',
    show: false },
  {
    title: 'B.A. COMMUNICATION SCIENCE (MEDIA STUDIES AND JOURNALISM)',
    grad:'B.A. Communication Science Degree',
    date: '2012 - 2015',
    location: 'University of the Free State',
    certImg: '/certImgUni.png',
    website:'https://www.ufs.ac.za/humanities/departments-and-divisions/communication-science-home',
    show: false },
  {
    title: 'National Senior Certificate',
    grad:'Certificate',
    date: '2011',
    location: 'Uniondale High School, South Africa',
    certImg: '/certImgSchool.png',
    show: false
  },
]);

const toggleView = () => {
  isGridView.value = !isGridView.value;
};

const openModal = (education) => {
  selectedEducation.value = education;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedEducation.value = null;
};
</script>

<style scoped>
.header-section {
  position: relative;
  padding: 2rem 1rem;
  background: linear-gradient(to right, #1a1a1a, #2d2d2d);
  border-radius: 20px;
  margin: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
#education {
  font-family: "Oswald", sans-serif;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  color: #ffffff;
  margin: 0;
  letter-spacing: 2px;
  position: relative;
}
#education::after {
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

/* Timeline Styles */
.timeline-container {
  position: relative;
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
}

.center-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background: #059669;
  border-radius: 2px;
}

.timeline-items {
  position: relative;
}

.timeline-item {
  position: relative;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
}

.timeline-item.left {
  justify-content: flex-start;
  padding-right: 50%;
}

.timeline-item.right {
  justify-content: flex-end;
  padding-left: 50%;
}

.education-card {
  background: #1f2937;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 90%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.education-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #059669;
}

.timeline-node {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: #059669;
  border: 4px solid #1f2937;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-node {
  background: #34d399;
  transform: translateX(-50%) scale(1.2);
}

.education-date {
  color: #059669;
  font-size: 0.775rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
}

.education-title {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.education-place {
  color: #9ca3af;
  font-size: 0.775rem;
}

.certificate-image {
  width: 350px;
  height: auto;
  margin-top: 10px;
}

/* toggle button */
.view-toggle {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
}

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

/* List View Styles */
.list-view {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.list-item {
  background: #1f2937;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.list-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.3);
  border-color: #059669;
}

.list-content h3 {
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.list-date {
  color: #059669;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.list-place {
  color: #9ca3af;
  margin: 0.5rem 0;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: #1f2937;
  border-radius: 1rem;
  max-width: 42rem;
  width: 100%;
  padding: 2rem;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close {
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

.modal-close:hover {
  background-color: rgba(255, 59, 59, 0.9);
  transform: rotate(90deg);
}

.modal-header {
  margin-bottom: 2rem;
}

.modal-header h3 {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.modal-date {
  color: #059669;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.modal-place {
  color: #9ca3af;
}

.modal-type {
  color: #34d399;
  margin-top: 0.5rem;
}

.certificate-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
}

.website-link {
  display: block;
  width: fit-content;
  text-align: center;
  margin: 1rem auto;
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

.website-link:hover {
  color: white;
  background-color: #059669;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1.02) translateZ(0);
}

@media only screen and (max-width: 768px) {
  .view-toggle {
    position: static;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    transform: none;
  }

  .timeline-item.left,
  .timeline-item.right {
    padding: 0;
    justify-content: flex-end;
  }

  .center-line {
    left: 3rem;
  }

  .timeline-node {
    left: 1rem;
  }

  .education-card {
    width: calc(100% - 4rem);
    margin-left: 4rem;
  }

  .modal-content {
    margin: 1rem;
    padding: 1.5rem;
  }
}
@media only screen and (max-width: 550px) {
  .education-card {
    padding: 1rem;
  }

  .education-title {
    font-size: 1rem;
  }

  .list-content h3 {
    font-size: 1.25rem;
  }

  .modal-content {
    padding: 1rem;
  }
}
</style>