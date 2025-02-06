<template>
  <AboutMeSection />
  <div class="header-section">
    <h2 class="about">ABOUT</h2>
    <div class="button-wrapper">
      <DownloadResume />
    </div>
  </div>
  <div class="about_info">
    <p class="quote">"As an enthusiastic and dedicated entry-level Software Developer, I bring a unique blend of academic excellence,
      diverse professional experiences, and a relentless commitment to continuous learning. My foundation in Communication Science,
      coupled with practical skills honed at CodeSpace Academy and Udemy courses, positions me as a versatile individual ready to make
      a meaningful impact in the dynamic field of software development."</p>

    <p>I worked as a Software Developer at Meshed360, where I expanded my skills in a real-world development environment. This experience has strengthened my understanding of development practices and allowed me to build my knowledge of C#, ASP.NET, and MS SQL in practical settings. I am eager to continue growing and to contribute meaningfully to any project or team.</p>

    <p>I completed my Software Development course at CodeSpace Academy.
      I have also completed many courses on Udemy and plan to continue expanding my knowledge through learning and practical application.
      My studies have prepared me to be able to learn rapidly and I am committed to learning new technologies and programming languages.
      Languages that I have learned about includes: HTML, CSS, JavaScript and JS frameworks.</p>

    <p>I earned my B.A. in Communication Science with a focus on Media Studies and Journalism in 2015 from the University of the Free State. After university, I worked in the fruit industry and also taught English as a foreign language.</p>

    <p>I am ready for a challenge and eager to prove myself. I am seeking experience in the software development industry and believe that I would be an asset to any business because I am willing to go above and beyond. I believe life is about experiences, and I want to gain as much as possible while learning everything I can. I strongly feel that my work becomes the center of my life, and therefore, I am looking for a challenge that will allow me to define myself within it.</p>

  </div>
</template>

<style>
.header-section {
  position: relative;
  padding: 2rem 1rem;
  background: linear-gradient(to right, #1a1a1a, #2d2d2d);
  border-radius: 20px;
  margin: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.about {
  font-family: "Oswald", sans-serif;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  color: #ffffff;
  margin: 0;
  letter-spacing: 2px;
  position: relative;
}

.about::after {
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

.button-wrapper {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
}

.about_info {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: "Mukta", sans-serif;
  font-size: 1rem;
  line-height: 1.8;
  color: #ffffff;
}

.about_info p {
  background: rgba(41, 38, 38, 0.7);
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about_info p:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Update highlight effect */
.highlight {
  background: linear-gradient(120deg, #059669 0%, #34d399 100%);
  color: white;
  padding: 0.2em 0.1em;
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* Add animation for word hover */
.word {
  display: inline-block;
  transition: all 0.3s ease;
  padding: 0.1em 0.2em;
  border-radius: 4px;
}

.word:hover {
  transform: scale(1.1);
}

/* First paragraph special styling */
.about_info p:first-child {
  font-size: 1.2rem;
  font-weight: 500;
  border-left: 4px solid #059669;
  background: rgba(5, 150, 105, 0.1);
  color: var(--text-color, #333);
}

/* Responsive styles */
@media only screen and (max-width: 768px) {
  .header-section {
    padding: 2rem 1rem;
    margin: 1rem;
  }

  .about {
    font-size: 2.5rem;
  }

  .button-wrapper {
    position: static;
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    transform: none;
  }

  .about_info {
    padding: 0 1rem;
    margin: 2rem auto;
  }

  .about_info p {
    padding: 1.5rem;
  }
}

/* Add smooth transitions */
* {
  transition: all 0.3s ease-in-out;
}

</style>

<script setup lang="ts">
import AboutMeSection from "../Components/Nav/AboutMeSection.vue";
import { onMounted } from 'vue';
import DownloadResume from "../Components/Utils/DownloadResume.vue";

/**
 * Wraps each word in the provided element with a span element.
 * Function: Takes an HTML element, splits its text content into individual words, wraps each word in a <span> element,
 * and sets the inner HTML of the element to these wrapped words.
 * @param {HTMLElement} element - The HTML element whose text content will be wrapped in span elements.
 */
const wrapWordsWithSpan = (element: HTMLElement) => {
  const text = element.textContent || '';
  const words = text.split(' ').map(word => `<span class="word">${word}</span>`);
  element.innerHTML = words.join(' ');
};

/**
 * Adds hover effect to each word within the provided element.
 * Function: Adds mouseover and mouseout event listeners to each word.
 * When a word is hovered over, it adds the highlight class, and removes it when the mouse moves out.
 * @param {HTMLElement} element - The HTML element containing words to which hover effect will be added.
 */
const addHoverEffect = (element: HTMLElement) => {
  element.addEventListener('mouseover', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('word')) {
      target.classList.add('highlight');
    }
  });

  element.addEventListener('mouseout', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('word')) {
      target.classList.remove('highlight');
    }
  });
};

/**
 * Lifecycle hook that runs after the component is mounted.
 * It wraps words with spans and adds hover effect to paragraphs inside .about_info.
 * Lifecycle Hook: Runs after the component is mounted.
 * It selects all paragraphs within .about_info, wraps each word in a <span>, and adds the hover effect to each word.
 */
onMounted(() => {
  const paragraphs = document.querySelectorAll('.about_info p');
  paragraphs.forEach(paragraph => {
    wrapWordsWithSpan(paragraph as HTMLElement);
    addHoverEffect(paragraph as HTMLElement);
  });
});
</script>