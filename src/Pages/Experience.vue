<template>
  <AboutMeSection/>
  <div>
    <div class="header-section">
      <h2 id="experience">EXPERIENCE</h2>
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
      <!-- Experience Items -->
      <div class="timeline-items">
        <div
            v-for="(experience, index) in experiences"
            :key="index"
            class="timeline-item"
            :class="{ 'right': index % 2 === 0, 'left': index % 2 === 1 }"
        >
          <div @click="openModal(experience)" class="experience-card">
            <span class="experience-date">{{ experience.date }}</span>
            <h3 class="experience-title">{{ experience.title }}</h3>
            <p class="experience-place">{{ experience.place }}</p>
          </div>
          <!-- Timeline Node -->
          <div class="timeline-node"></div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="list-view">
      <div class="list-item" v-for="(experience, index) in experiences" :key="index">
        <div class="list-content">
          <h3>{{ experience.title }}</h3>
          <p class="list-date">{{ experience.date }}</p>
          <p class="list-place">{{ experience.place }}</p>

          <div class="list-description">
            <div v-for="item in experience.description.split('\n')" :key="item">{{ item }}</div>
          </div>
            <div class="list-skills">
              <div class="skills-container">
              <span v-for="(skill, index) in experience.skills.split('·')"
                    :key="index"
                    class="skill-tag">
                {{ skill.trim() }}
              </span>
              </div>
            </div>

        </div>
      </div>
    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">
            <X class="w-6 h-6" />
          </button>

          <div class="modal-header">
            <h3>{{ selectedExperience?.title }}</h3>
            <p class="modal-date">{{ selectedExperience?.date }}</p>
            <p class="modal-place">{{ selectedExperience?.place }}</p>
          </div>

          <div class="modal-body">
            <ul>
              <li v-for="(item, index) in selectedExperience?.description.split('\n')"
                  :key="index"
                  class="responsibility-item">
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="modal-skills">
            <div class="skills-container">
              <span v-for="(skill, index) in selectedExperience?.skills.split('·')"
                    :key="index"
                    class="skill-tag">
                {{ skill.trim() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>


  </div>
</template>

<script setup lang="ts">
import {onUnmounted, ref, watch} from 'vue';
import AboutMeSection from "../Components/Nav/AboutMeSection.vue";
import { X } from 'lucide-vue-next';

const isGridView = ref(true);
const isModalOpen = ref(false);
const selectedExperience = ref(null);

const experiences = ref([
  /**
   * Array of experiences
   */
  {
    date: "July 2024 - January 2025",
    title: "Junior Software Developer",
    place: "Meshed Group",
    description: "Junior/Intern Software Developer for an accounting automation ASP.NET MVC web app.\n" +
        "Developed and maintained software features for the Meshed 360 platform, focusing on backend enhancements and front-end improvements. \n" +
        "Conducted software maintenance and troubleshooting on Meshed 360 modules. \n" +
        "Performed testing, debugging, and performance tuning to ensure software reliability and efficiency. ",
    skills: "Skills: C# · JavaScript · ASP.NET MVC · MS SQL",
    show: false
  },

  {
    date: "June 2021 - July 2023",
    title: "Teacher",
    place: "Talking Club Academy",
    description: "English elementary school students teacher. \n" +
        "Rigid syllabus. \n" +
        "Administrative responsibilities. \n" +
        "Report cards.",
    skills: "Skills: Teaching English as a Foreign Language · Teacher Training · Teaching · Language Teaching · Computer Literacy · Communication · Problem Solving · Adaptability · Attention to Detail · Organization Skills · Microsoft Word · Microsoft Excel",
    show: false
  },

  {
    date: "April 2020 - May 2021",
    title: "Program Specialist",
    place: "Sunday's River Citrus Company",
    description: "Utilizing CMS system.\n" +
        "Ensure compliance with market specifications and volume requirements.\n" +
        "Executed packing programs.\n" +
        "Inform role-players of status of packing.\n" +
        "Facilitated time effective change-overs.",
    skills: "Skills: CMS · Communication · Computer Literacy · Local Area Network (LAN) · Analytical Skills · Instructional Skills · Problem Solving · Soft Skills · Microsoft Office · Microsoft Word · Microsoft Excel · Microsoft Outlook",
    show: false
  },

  {
    date: "October 2018 - October 2019",
    title: "Teacher",
    place: "EBY Talking Cub",
    description: "English teacher for elementary, middle school and adult students. \n" +
        "Teaching. \n" +
        "Administrative duties. \n" +
        "Report cards.",
    skills: "Skills: English · Teaching English as a Foreign Language · Language Teaching · Microsoft Excel · Microsoft Word · Administration · Writing",
    show: false
  },

  {
    date: "April - October 2018",
    title: "Quality Assurance Specialist",
    place: "FQMS, Tru-Cape, & SRCC",
    description: "Fruit Quality Inspector/Auditor. \n" +
        "Quality inspection of fruit in pack houses throughout the Langkloof area for Tru-Cape. \n" +
        "Reports and databases on inspections. \n" +
        "Auditing the program specifications for SRCC.",
    skills: "Quality Assurance · Quality Control · Quality System · Quality Auditing · Microsoft Excel · Microsoft Office · Cloud Storage · Communication",
    show: false
  },
  {
    date: "November 2017 - April 2018",
    title: "Quality Assurance Manager",
    place: "Hochland/Courageous Cat",
    description: "Courageous Cats / UFF / Old Mutal Agri-investment Farms.\n" +
        "Quality control manager.\n" +
        "Fruit quality standards fulfillment. \n" +
        "Monitoring samples. \n" +
        "Databases to combat claims from buyers and exporters. \n" +
        "Assisting Line manager with pack machine and operations.\n" +
        "Logistic databases on daily pack out. \n" +
        "Daily quality report.",
    skills: "Skills: Microsoft Office · Microsoft Excel · Microsoft Word · Quality Assurance · Quality Control · Logistics · Cloud Storage · Quality System · Import/Export Operations",
    show: false
  },
  {
    date: "April 2016 - November 2017",
    title: "General Foreman",
    place: "Cristoffel Loock Boerdery",
    description:
        "General farm operations and activities. \n" +
        "Repairing motorized vehicles and implements.\n" +
        "Repairing pipes and electrical lines. \n" +
        "Roof construction, painting. \n" +
        "Planting of grains. \n" +
        "Pruning supervision. \n" +
        "Conveyance of new orchards and irrigation system. \n" +
        "Livestock and wild life animals. \n" +
        "Hunting activities. \n" +
        "Co-managed the pack house. \n" +
        "Labelling, packing, quality, production and operations.",
    skills: "Skills: Time Management · Team Management · Teamwork · Construction · Mechanical, Electrical, and Plumbing (MEP) · Hunting · Import/Export Operations",
    show: false
  },
]);

const toggleView = () => {
  isGridView.value = !isGridView.value;
};

const toggleBodyScroll = (disable: boolean) => {
  if (disable) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Watch modal state and toggle body scroll
watch(isModalOpen, (newValue) => {
  toggleBodyScroll(newValue);
});

const openModal = (experience) => {
  selectedExperience.value = experience;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedExperience.value = null;
};

// Clean up on component unmount
onUnmounted(() => {
  toggleBodyScroll(false);
});

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

#experience {
  font-family: "Oswald", sans-serif;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  color: #ffffff;
  margin: 0;
  letter-spacing: 2px;
  position: relative;
}
#experience::after {
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

/* View Toggle Button Styles */
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
  padding: 2rem;
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
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.list-place {
  color: #9ca3af;
  margin: 0.5rem 0;
  font-size: 1rem;
}

.list-date {
  color: #059669;
  font-weight: 500;
  margin-bottom: 1rem;
}

.list-description {
  color: #d1d5db;
  margin-top: 1.5rem;
}

.list-description > div {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  text-align: left;
}

.list-description > div::before {
  content: "•";
  color: #059669;
  position: absolute;
  left: 0;
}

.list-skills {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

}

.skill-tag {
  background: rgba(5, 150, 105, 0.2);
  color: #34d399;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
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
  margin-bottom: 4rem;
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

.experience-card {
  background: #1f2937;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 90%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.experience-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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

.experience-date {
  color: #059669;
  font-size: 0.875rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
}

.experience-title {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.experience-place {
  color: #9ca3af;
  font-size: 1rem;
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

.modal-body {
  margin-bottom: 2rem;
}

.modal-body ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-body h4 {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.responsibility-item {
  color: #d1d5db;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  text-align: left;
}

.responsibility-item::before {
  content: "•";
  color: #059669;
  position: absolute;
  left: 0;
}

.modal-skills h4 {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: rgba(5, 150, 105, 0.2);
  color: #34d399;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
}

@media only screen and (max-width: 768px) {
  .view-toggle {
    position: static;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    transform: none;
  }

  .list-content h3 {
    font-size: 1.25rem;
  }

  .list-place, .list-date {
    font-size: 0.875rem;
  }

  .list-description > div {
    font-size: 0.875rem;
    padding-left: 1.25rem;
    line-height: 1.5;
  }

  .skill-tag {
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
  }

  .list-skills {
    margin-top: 1rem;
    padding-top: 1rem;
  }
}

@media only screen and (max-width: 550px) {
  .list-item {
    padding: 1rem;
  }

  .list-content h3 {
    font-size: 1.125rem;
  }

  .list-description {
    margin-top: 1rem;
  }

  .list-description > div {
    margin-bottom: 0.4rem;
  }

  .skills-container {
    gap: 0.4rem;
  }

  .experience-title {
    font-size: 0.75rem;
  }
  .experience-date {
    font-size: 0.75rem;
  }
  .experience-place {
    font-size: 0.75rem;
  }
}
</style>