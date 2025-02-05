<template>
  <div class="download-button-container">
    <a
        :href="resumeLink"
        download="Stefan_Schutte_Resume.pdf"
        class="button"
    >
      Download Resume
    </a>
  </div>
</template>

<script>
export default {
  name: "DownloadResumeButton",
  data() {
    return {
      resumeLink: "/Stefan_Schutte_Resume.pdf",
    };
  },
};
</script>

<style scoped>
.download-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.button {
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

.button:hover {
  color: white;
  background-color: #059669;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1.02) translateZ(0);
}
</style>