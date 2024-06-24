<template>
  <AboutMeSection />

  <h2 class="about">ABOUT</h2>
  <div class="about_info">
    <p>"As an enthusiastic and dedicated entry-level Software Developer, I bring a unique blend of academic excellence,
      diverse professional experiences, and a relentless commitment to continuous learning. My foundation in Communication Science,
      coupled with practical skills honed at CodeSpace Academy and Udemy courses, positions me as a versatile individual ready to make
      a meaningful impact in the dynamic field of software development."</p>

    <p>I am looking for a position where I can learn on the job. I completed my Software Development course at CodeSpace Academy.
      I have also completed many courses on Udemy and plan to continue expanding my knowledge through learning and practical application.
      My studies have prepared me to be able to learn rapidly and I am committed to learning new technologies and programming languages.
      Languages that I have learned about includes: HTML, CSS, JavaScript and JS frameworks.</p>

    <p>I earned my B.A. in Communication Science with a focus on Media Studies and Journalism in 2015 from the University of the Free State. After university, I worked in the fruit industry and also taught English as a foreign language.</p>

    <p>I am ready for a challenge and eager to prove myself. I am seeking experience in the software development industry and believe that I would be an asset to any business because I am willing to go above and beyond. I believe life is about experiences, and I want to gain as much as possible while learning everything I can. I strongly feel that my work becomes the center of my life, and therefore, I am looking for a challenge that will allow me to define myself within it.</p>

  </div>
</template>

<style>
.about {
  font-family: "Oswald", sans-serif;
  font-size: 5vh;
  display: flex;
  justify-content: center;
}

.about_info {
  margin: 2rem;
  margin-bottom: 5rem;
  font-family: "Mukta", sans-serif;
  font-size: large;
}

.highlight {
  background-color: #bfa719;
  transition: background-color 0.3s ease;
}
</style>

<script setup lang="ts">
import AboutMeSection from "../Components/Nav/AboutMeSection.vue";
import { onMounted } from 'vue';

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