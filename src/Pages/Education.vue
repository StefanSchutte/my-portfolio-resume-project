<template>
  <AboutMeSection/>
  <div class="education-container">
    <h2 id="education">EDUCATION</h2>
    <ul class="education">
      <li v-for="(education, index) in educations" :key="index">
        <h3 class="educationHeading" @click="toggleParagraph(index)">
          {{ education.title }}
        </h3>
        <p v-show="education.show">{{ education.grad }}</p>
        <p v-show="education.show">{{ education.date }}</p>
        <p v-show="education.show">{{ education.location }}</p>
        <a
            v-if="education.show && education.certImg"
            :href="education.website"
            target="_blank"
            rel="noopener noreferrer"
        >
        <img
             :src="education.certImg"
             alt="Certificate Image"
             class="certificate-image"/>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AboutMeSection from "../Components/Nav/AboutMeSection.vue";

const educations = ref([
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
    grad:'Certificate',
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
    grad:'B.A. Communication Studies Degree',
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

const toggleParagraph = (index: any) => {
  educations.value[index].show = !educations.value[index].show;
};
</script>

<style>

#education {
  font-family: "Oswald", sans-serif;
  font-size: 5vh;
  display: flex;
  justify-content: center;
  padding: 3%;
}

.educationHeading {
  font-size: large;
  cursor: pointer;
  color: #8f8c8c;
  margin-right: 10px;
  padding: 8px 16px;
  border: 1px solid #8f8c8c;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.educationHeading:hover {
  transform: scale(1.10);
  color: #075c07;
  transition: background-color 0.3s ease;
}

.education {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 50px;
  margin: 2rem;
}

.education-container {
  margin-left: -2rem;
}

.certificate-image {
  width: 350px;
  height: auto;
  margin-top: 10px;
}

@media only screen and (max-width: 1000px) {

  .education {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
}

@media only screen and (max-width: 550px) {
  .education {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .certificate-image {
    width: 220px;
  }
}
</style>