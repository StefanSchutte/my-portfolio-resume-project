<template>

  <div class="footerContainer">
    <footer class="footer">
      <div class="header-section">
        <h1>Contact Me</h1>
        <div class="button-wrapper">
          <DownloadResume />
        </div>
      </div>
      <div id="contactLinks" class="contactDetailSection">
        <div class="contact">
          <a href="https://github.com/StefanSchutte"
             target="_blank">
            <img src="/gh.png" alt="github" width="100" height="100" title="Github">
            <div class="contactInnerContainer">
              <span>My Github Account</span>
              <p>https://github.com/StefanSchutte</p>
            </div>
          </a>
        </div>
        <div class="contact">
          <a href="https://www.linkedin.com/in/stefan-schutte-668578292/" target="_blank">
            <img src="/lk.png" alt="linkin" width="100" height="100" title="Linkedin">
            <div class="contactInnerContainer">
              <span>My Linkedin Profile</span>
              <p>https://www.linkedin.com/in/stefan-schutte/</p>
          </div>
          </a>
        </div>
        <div class="contact">
          <a href="https://www.instagram.com/stefan.schutte/" target="_blank">
            <img src="/ig.png" alt="Instagram" width="100" height="100" title="Instagram">
            <div class="contactInnerContainer">
              <span>My Instagram</span>
              <p>https://www.instagram.com/stefan.schutte/</p>
            </div>
          </a>
        </div>
        <div class="contact">
          <a href="https://www.facebook.com/stefan.schutte1" target="_blank">
            <img src="/fb.png" alt="Facebook" width="100" height="100" title="Facebook">
            <div class="contactInnerContainer">
              <span>My Facebook</span>
              <p>https://www.facebook.com/stefan.schutte1</p>
          </div>
          </a>
        </div>
        <div class="contact">
          <a href="https://www.youtube.com/channel/UCPkJAECROt6Wqdns2yD4msw" target="_blank">
            <img src="/yt.png" alt="youtube" width="100" height="100" title="Youtube">
            <div class="contactInnerContainer">
              <span>My Youtube Account</span>
              <p></p>
            </div>
          </a>
        </div>
        <div class="contact">
          <a href="mailto:stefanschutte@icloud.com" target="_blank">
            <img src="/ml.png" alt="stefanschutte@icloud.com" width="100" height="100" title="Email">
            <div class="contactInnerContainer">
              <span>My E-mail Address</span>
              <p>stefanschutte@icloud.com</p>
            </div>
          </a>
        </div>
        <div class="contact">
          <a href="tel:+27672658798" target="_blank">
            <img src="/pn.png" alt="+27672658798" width="100" height="100" title="Call">
            <div class="contactInnerContainer">
              <span>Call Me</span>
              <p>+27 67 2658 798</p>
            </div>
          </a>
        </div>
        <div class="contact">
          <a href="tel:+27765314027" target="_blank">
            <img src="/wa.png" alt="whatsapp" width="100" height="100" title="Whatsapp">
            <div class="contactInnerContainer">
              <span>Send Me a Whatsapp</span>
              <p>+27 76 531 4027</p>
            </div>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.header-section {
  position: relative;
  padding: 1rem;
}
/* Styles the main heading */
h1 {
  color: white;
  margin: 0;
  font-family: "Oswald", sans-serif;
  font-size: 5vh;
  display: flex;
  justify-content: center;
}

.button-wrapper {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
}

.button-wrapper :deep(.download-button-container) {
  margin-bottom: 0;
}

/* Styles the container for the footer */
.footerContainer {
  text-align: center;
}

/* Styles the footer element */
.footer {
  margin-bottom: 0;
  padding: 2rem 0;
}

/* Styles the contact detail section to display items in a grid layout */
.contactDetailSection {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
}

/* Styles individual contact items */
.contact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: right;
  padding: 1rem;
  border-radius: 15px;
  box-sizing: border-box;
  border: 2px solid gray;
  margin: 1rem;
  height: 18vh;
}

/* Styles the inner container for contact details */
.contactInnerContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Styles the contact images */
.contact img {
  overflow: hidden;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
}

/* Styles the links within the footer */
footer a {
  font-size: 100%;
  text-decoration: none;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  margin-top: 15px;
}

/* Adds a hover effect to contact items */
.contact:hover {
  background-color: rgb(40, 177, 40);
  transform: scale(1.01);
}

/* Styles the text within the span element */
span {
  color: white;
  margin-left: 2rem;
  text-align: center;
  padding: 1rem;
  font-size: medium;
}

@media only screen and (max-width: 1100px) {

  .contactDetailSection {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
  }

  .contact {
    justify-content: center;
    border-radius: 15px;
    box-sizing: border-box;
    border: 2px solid gray;
    margin: 0.5rem;
    width: 40vw;
    height: 12vh;
  }

  p {
    font-size: small;
  }
}

@media only screen and (max-width: 768px) {
  .button-wrapper {
    position: static;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    transform: none;
  }
}

@media only screen and (max-width: 550px) {

.contactDetailSection {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
}

.contact {
  width: 90vw;
  height: 20vh;
}

p {
  font-size: small;
}
}
</style>
<script setup lang="ts">
import DownloadResume from "../../Components/Utils/DownloadResume.vue";
</script>