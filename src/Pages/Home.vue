<template>
  <div>
<!--    <div v-if="isLoading" class="loader-overlay">
      <div class="loader"></div>
    </div>-->
    <Loader :show="isLoading" />

  <aside v-show="!isLoading">
    <div class="img" @click="openModal">
      <picture >
        <img
            src="/stefan.jpeg"
            alt="img"
            width="70"
            height="100"
            @load="checkAsideAssetsLoaded('profileImg')"
        >
      </picture>
    </div>
    <div>
      <header>
        <h1>Stefan Schutte</h1>
      </header>
    </div>
  </aside>
    <PhotoModal
        :isOpen="isModalOpen"
        :photos="photoGallery"
        @close="closeModal"
    />
  <Foot />
  </div>
</template>

<script>
import Foot from '../Components/Contact/Foot.vue'
import {defineComponent} from "vue";
import ThemeToggle from "../Components/Utils/ThemeToggle.vue";
import PhotoModal from '../Components/Utils/PhotoModal.vue';
import Loader from "../Components/Utils/Loader.vue";
/**
 * Hero section with a dimmed background image.
 * It includes a profile picture, a header with the name "Stefan Schutte", and a footer component.
 * The background image is dimmed using the CSS filter property.
 *
 * @component
 */
export default defineComponent({
  components: {ThemeToggle, Foot, PhotoModal, Loader},
    data() {
      return {
        isModalOpen: false,
        photoGallery: [
          '/img1.jpg',
          '/IMG-9965.JPG',
          '/stefan.jpeg',
          '/IMG-6869.JPG',
        ],
        isLoading: true,
        assetsLoaded: {
          profileImg: false,
          backgroundImg: false,
        },
      };
    },
    methods: {
      /**
       * Opens the photo modal by setting isModalOpen to true.
       */
      openModal() {
        this.isModalOpen = true;
      },
      /**
       * Closes the photo modal by setting isModalOpen to false.
       */
      closeModal() {
        this.isModalOpen = false;
      },
      checkAsideAssetsLoaded(asset) {
        this.assetsLoaded[asset] = true;

        // Check if both profileImg and backgroundImg are loaded
        if (this.assetsLoaded.profileImg && this.assetsLoaded.backgroundImg) {
          this.isLoading = false;
        }
      },
      preloadBackgroundImage() {
        const img = new Image();
        img.src = '/wp4009210-digital-wallpapers.jpg';
        img.onload = () => {
          this.checkAsideAssetsLoaded('backgroundImg');
        };
      },
    },
  mounted() {
    this.preloadBackgroundImage();
  },
});



</script>
<style scoped>

/* Styles for the aside element, setting up the flex container, background image, and dimming effect */
aside {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 70vh;
  width: 100%;
  background-image: url(/wp4009210-digital-wallpapers.jpg);
  filter: brightness(80%);
  background-position: center;
  background-size: cover;
}

/* Styles for the header, setting font size and alignment */
header {
  font-size: 8vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 5rem;
}

/* Styles for the h1 element inside the header, setting color, font, and text effects */
h1 {
  color: #fafafa;
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  font-optical-sizing: auto;
  font-weight: 900;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2);
  letter-spacing: 1px;
  text-align: center;
  margin-top: 20px;
}

/* Styles for the p element inside the header */
header p {
  font-size: 3vh;
  color: rgb(66, 66, 66);
}

/* Styles for the img container, making it a circle and setting size and animation */
.img {
  overflow: hidden;
  border-radius: 50%;
  max-width: 350px;
  height: 350px;
  display: flex;
  align-items: flex-start;
  animation: imgSlide 2s ease forwards;
  cursor: pointer;
}

.img:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
}


/* Keyframes for the imgSlide animation */
@keyframes imgSlide {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(15%);
  }
}

/* Styles for the img element inside the img container */
.img img {
  width: 100%;
  height: 100%;
}


/* Responsive styles for screens 1000px wide or less */
@media only screen and (max-width: 1000px) {

  aside {
    flex-direction: row;
    align-items: center;
  }

  .img {
    max-width: 280px;
    height: 280px;
    margin-top: 10px;
    animation: imgSlide 2s ease forwards;
  }

  header {
    font-size: 3vh;
    margin-top: -60px;
    margin-left: 3rem;

  }

  header p {
    font-size: 2vh;
    padding: 1px;
  }

}

/* Responsive styles for screens 550px wide or less */
@media only screen and (max-width: 550px) {
  body {
    font-size: 15px;
  }

  aside {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .img {
    margin: 0;
    max-width: 250px;
    height: 250px;
    margin-top: 15px;
    animation: none;
  }

  header {
    font-size: 25px;
    margin: 0;
    margin-top: 30px;
    text-align: center;
    animation: none;
  }

  header p {
    font-size: 2vh;
    padding: 1px;
  }
}

/* Loader overlay */
/*.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
}

!* Loader animation *!
.loader {
  border: 8px solid #8f8c8c;
  border-top: 8px solid #075c07;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

!* Keyframe for spinning loader *!
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}*/

</style>