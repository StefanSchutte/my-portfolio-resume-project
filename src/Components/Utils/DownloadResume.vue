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
  transform: scale(1.10);
  color: #075c07;
  transition: background-color 0.3s ease;
}
</style>