<template>
  <div class="contact-section">
    <div class="header-section">
      <h1>Get in Touch</h1>
      <p class="subtitle">Feel free to reach out through any of these platforms</p>
      <div class="button-wrapper">
        <DownloadResume />
      </div>
    </div>

    <div class="contact-grid">
      <a v-for="contact in contacts"
         :key="contact.url"
         :href="contact.url"
         target="_blank"
         class="contact-card">
        <div class="icon-wrapper">
          <component :is="contact.icon" class="icon" />
        </div>
        <div class="contact-info">
          <span class="contact-label">{{ contact.label }}</span>
          <p class="contact-value">{{ contact.value }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import DownloadResume from "../../Components/Utils/DownloadResume.vue";
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
    label: "My Github Account",
    value: "github.com/StefanSchutte",
    url: "https://github.com/StefanSchutte"
  },
  {
    icon: Linkedin,
    label: "My LinkedIn Profile",
    value: "stefan-schutte",
    url: "https://www.linkedin.com/in/stefan-schutte-668578292/"
  },
  {
    icon: Instagram,
    label: "My Instagram",
    value: "@stefan.schutte",
    url: "https://www.instagram.com/stefan.schutte/"
  },
  {
    icon: Facebook,
    label: "My Facebook",
    value: "stefan.schutte1",
    url: "https://www.facebook.com/stefan.schutte1"
  },
  {
    icon: Youtube,
    label: "My Youtube Account",
    value: "My Channel",
    url: "https://www.youtube.com/channel/UCPkJAECROt6Wqdns2yD4msw"
  },
  {
    icon: Mail,
    label: "My E-mail Address",
    value: "stefanschutte@icloud.com",
    url: "mailto:stefanschutte@icloud.com"
  },
  {
    icon: Phone,
    label: "Call Me",
    value: "+27 67 265 8798",
    url: "tel:+27672658798"
  },
  {
    icon: MessageCircle,
    label: "Send Me a Whatsapp",
    value: "+27 76 531 4027",
    url: "https://wa.me/27765314027"
  }
];
</script>

<style scoped>
.contact-section {
  width: 100%;
  padding: 1rem 1rem;
}

.header-section {
  position: relative;
  padding: 1rem 1rem;
  background: linear-gradient(to right, #1a1a1a, #2d2d2d);
  border-radius: 20px;
  margin: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header-section h1 {
  font-size: 2.25rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  font-family: "Oswald", sans-serif;
}

.subtitle {
  color: #9ca3af;
  max-width: 42rem;
  margin: 0 auto 2rem;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.contact-grid {
  display: grid;
  gap: 1.5rem;
  max-width: 72rem;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.contact-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  background-color: #1f2937;
  text-decoration: none;
  transform: translateZ(0);
}

.contact-card:hover {
  background-color: #059669;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1.02) translateZ(0);
}

.icon-wrapper {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #374151;
  border-radius: 9999px;
  margin-right: 1rem;
  transition: background-color 0.3s ease;
}

.contact-card:hover .icon-wrapper {
  background-color: #10b981;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #d1d5db;
}

.contact-card:hover .icon {
  color: white;
}

.contact-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.contact-label {
  color: #d1d5db;
  font-weight: 500;
  margin-bottom: 0.25rem;
  text-align: left;
  padding: 0;
  margin-left: 0;
}

.contact-value {
  color: #9ca3af;
  font-size: 0.875rem;
  margin: 0;
}

.contact-card:hover .contact-label,
.contact-card:hover .contact-value {
  color: white;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .button-wrapper {
    position: static;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    transform: none;
  }
}

@media (max-width: 640px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-card {
    width: 100%;
  }

  .header-section h1 {
    font-size: 1.875rem;
  }
}
</style>