
<template>
  <AboutMeSection/>
  <div>
    <h2 id="experience">EXPERIENCE</h2>
    <div class="experience_info">
      <div v-for="(experience, index) in experiences" :key="index">
        <div class="experienceHeadingContainer">
          <h3 class="experienceHeading" @click="toggleParagraph(index)">
            {{ experience.title }}
            <p>{{experience.place}}</p>
            <p class="experienceDate">{{experience.date}}</p>
          </h3>
        </div>
        <p v-show="experience.show">
          <div v-for="item in experience.description.split('\n')" :key="item">{{ item }}</div>
          <div class="exp-skill">{{experience.skills}}</div>
        </p>
      </div>
    </div>
  </div>
</template>

<style>

/* Styles the experience heading. Sets the font size to 5% of the viewport height. Uses flexbox for layout. Centers the content horizontally.*/
#experience {
  font-family: "Oswald", sans-serif;
  font-size: 5vh;
  display: flex;
  justify-content: center;
  padding: 3%;
}

/* Styles the experience title headings. Sets the font size to large. Adds cursor pointer for better UX. Sets the text color.
 Adds margin to the right, padding, border, rounded corners, transition effect. Removes text decoration. */
.experienceHeading {
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

/* Styles for hovering over experience headings. Slightly enlarges the element. Changes text color and border.*/
.experienceHeading:hover {
  transform: scale(1.01);
  color: #075c07;
  border: 1px solid #525952;
}

/* Styles the experience date.  Sets the font size to medium. Sets the text color. */
.experienceDate {
  font-size: medium;
  color: rgb(127, 131, 127);

}

/* Container for experience headings. Aligns items vertically. */
.experienceHeadingContainer {
  align-items: center;
}

/* Styles for paragraph elements within the experience heading container. Removes left margin. Sets the text color.*/
.experienceHeadingContainer p {
  margin-left: 0rem;
  color: rgb(127, 131, 127);
}

/* Styles the experience information container. Uses grid layout. Two columns. Adds margin. Aligns items vertically.*/
.experience_info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2rem;
  align-items: center;
}

/* Styles for experience list. Remove default list styles. Remove default padding */
.experienceList {
  list-style-type: none;
  padding: 0;
}

/* Styles for list items within the experience list. Add spacing between list items. Add a border between list items.
Add padding to the bottom of each list item. */
.experienceList li {
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

/* Styles for experience skills. Adds margin. */
.exp-skill {
  margin: 1rem;
}

/* Media query for screens with a max width of 1000px. Uses grid layout. One column. Adds gap between items.*/
@media only screen and (max-width: 1000px) {

  .experience_info {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import AboutMeSection from "../Components/Nav/AboutMeSection.vue";

const experiences = ref([

  /**
   * Array of experiences
   */
  {
    date: "July 2024 - January 2025",
    title: "Junior Software Developer",
    place: "Meshed Group",
    description: "- Worked as a junior/intern software developer for an accounting automation web app.\n" +
        "- I fixed issues/bugs that came in the form of tickets. \n" +
        "- Built new features for the app.",
    skills: "Skills: C#, JavaScript, ASP.NET MVC, MS SQL",
    show: false
  },

  {
    date: "June 2021 - July 2023",
    title: "Teacher",
    place: "Talking Club Academy",
    description: "- English elementary school students teacher. \n" +
        "- Rigid syllabus. \n" +
        "- Administrative responsibilities. \n" +
        "- Report cards.",
    skills: "Skills: Teaching English as a Foreign Language · Teacher Training · Teaching · Language Teaching · Computer Literacy · Communication · Problem Solving · Adaptability · Attention to Detail · Organization Skills · Microsoft Word · Microsoft Excel",
    show: false
  },

  {
    date: "April 2020 - May 2021",
    title: "Program Specialist",
    place: "Sunday's River Citrus Company",
    description: "- Utilizing CMS system.\n" +
        "- Ensure compliance with market specifications and volume requirements.\n" +
        "- Executed packing programs.\n" +
        "- Inform role-players of status of packing.\n" +
        "- Facilitated time effective change-overs.",
    skills: "Skills: CMS · Communication · Computer Literacy · Local Area Network (LAN) · Analytical Skills · Instructional Skills · Problem Solving · Soft Skills · Microsoft Office · Microsoft Word · Microsoft Excel · Microsoft Outlook",
    show: false
  },

  {
    date: "October 2018 - October 2019",
    title: "Teacher",
    place: "EBY Talking Cub",
    description: "- English teacher for elementary, middle school and adult students. \n" +
        "- Teaching. \n" +
        "- Administrative duties. \n" +
        "- Report cards.",
    skills: "Skills: English · Teaching English as a Foreign Language · Language Teaching · Microsoft Excel · Microsoft Word · Administration · Writing",
    show: false
  },

  {
    date: "April - October 2018",
    title: "Quality Assurance Specialist",
    place: "FQMS, Tru-Cape, & SRCC",
    description: "- Fruit Quality Inspector/Auditor. \n" +
        "- Quality inspection of fruit in pack houses throughout the Langkloof area for Tru-Cape. \n" +
        "- Reports and databases on inspections. \n" +
        "- Auditing the program specifications for SRCC.",
    skills: "Quality Assurance · Quality Control · Quality System · Quality Auditing · Microsoft Excel · Microsoft Office · Cloud Storage · Communication",
    show: false
  },
  {
    date: "November 2017 - April 2018",
    title: "Quality Assurance Manager",
    place: "Hochland/Courageous Cat",
    description: "- Courageous Cats / UFF / Old Mutal Agri-investment Farms.\n" +
        "- Quality control manager.\n" +
        "- Fruit quality standards fulfillment. \n" +
        "- Monitoring samples. \n" +
        "- Databases to combat claims from buyers and exporters. \n" +
        "- Assisting Line manager with pack machine and operations.\n" +
        "- Logistic databases on daily pack out. \n" +
        "- Daily quality report.",
    skills: "Skills: Microsoft Office · Microsoft Excel · Microsoft Word · Quality Assurance · Quality Control · Logistics · Cloud Storage · Quality System · Import/Export Operations",
    show: false
  },
  {
    date: "April 2016 - November 2017",
    title: "General Foreman",
    place: "Cristoffel Loock Boerdery",
    description: "- General foreman.\n" +
        "- General farm operations and activities. \n" +
        "- Repairing motorized vehicles and implements.\n" +
        "- Repairing pipes and electrical lines. \n" +
        "- Roof construction, painting. \n" +
        "- Planting of grains. \n" +
        "- Pruning supervision. \n" +
        "- Conveyance of new orchards and irrigation system. \n" +
        "- Livestock and wild life animals. \n" +
        "- Hunting activities. \n" +
        "- Co-managed the pack house. \n" +
        "- Labelling, packing, quality, production and operations.",
    skills: "Skills: Time Management · Team Management · Teamwork · Construction · Mechanical, Electrical, and Plumbing (MEP) · Hunting · Import/Export Operations",
    show: false
  },
]);

/**
 * Toggles the visibility of the description for the given experience.
 * experiences is an array of experience objects, each containing details like date, title, place, description, skills, and a show property for toggling visibility.
 * toggleParagraph is a function that toggles the visibility of the description for a specific experience based on its index.
 * @param {number} index - The index of the experience to toggle
 */
const toggleParagraph = (index: number) => {
  experiences.value[index].show = !experiences.value[index].show;
};
</script>