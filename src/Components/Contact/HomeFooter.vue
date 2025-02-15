<template>
  <div class="footerContainer">
    <footer class="footer">
      <div id="contactLinks" class="contactDetailSection">
        <div class="contact" v-for="contact in contacts" :key="contact.url">
          <a :href="contact.url" target="_blank" :title="contact.title">
            <div class="iconWrapper">
              <component :is="contact.icon" :size="20" class="icon" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MessageCircle
} from 'lucide-vue-next';

const contacts = [
  {
    icon: Github,
    url: "https://github.com/StefanSchutte",
    title: "Github"
  },
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/stefan-schutte-668578292/",
    title: "Linkedin"
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/stefan.schutte/",
    title: "Instagram"
  },
  {
    icon: Facebook,
    url: "https://www.facebook.com/stefan.schutte1",
    title: "Facebook"
  },
  {
    icon: Youtube,
    url: "https://www.youtube.com/channel/UCPkJAECROt6Wqdns2yD4msw",
    title: "Youtube"
  },
  {
    icon: Mail,
    url: "mailto:stefanschutte@icloud.com",
    title: "Email"
  },
  {
    icon: Phone,
    url: "tel:+27672658798",
    title: "Call"
  },
  {
    icon: MessageCircle,
    url: "https://wa.me/27765314027",
    title: "Whatsapp"
  }
];
</script>

<style scoped>
.footerContainer {
  text-align: center;
}

.footer {
  background-color: #5c5a5a;
  margin-bottom: 0;
}

.contactDetailSection {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  justify-content: center;
  align-items: center;
}

.contact {
  transition: all 0.3s ease;
}

.iconWrapper {
  width: 2rem;
  height: 2rem;
  background-color: #374151;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
}

.icon {
  color: #d1d5db;
}

.contact:hover {
  background-color: #059669;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1.02) translateZ(0);
  border-radius: 5px;
}

.contact:hover .icon {
  color: white;
}

@media only screen and (max-width: 1000px) {
  .contactDetailSection {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr 1fr;
  }
}

@media only screen and (max-width: 550px) {
  .contactDetailSection {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>