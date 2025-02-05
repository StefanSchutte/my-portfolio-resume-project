<template>
<div class="about-sub-nav-bar">
  <router-link to="/about"><div class="nav-item"><img src="/information-button.png" alt="About" title="About"/>About</div></router-link>
  <router-link to="/education"><div class="nav-item"><img src="/graduation.png" alt="Education" title="Education"/>Education</div></router-link>
  <router-link to="/experience"><div class="nav-item"><img src="/portfolio.png" alt="Experience" title="Experience"/>Experience</div></router-link>
  <router-link to="/skills"><div class="nav-item"><img src="/skills.png" alt="Skills" title="Skills"/>Skills</div></router-link>
</div>
</template>

<style>
.about-sub-nav-bar{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #494949;
  padding: 1rem;
  font-family: "Oswald", sans-serif;
}


</style>
<script setup lang="ts">
</script>