<template>
  <div class="about-sub-nav-bar">
    <router-link class="nav-item" to="/tools/kanban">
      <img src="/dashboard.png" alt="Kanban" title="Kanban" />Kanban Board
    </router-link>
    <router-link class="nav-item" to="/tools/paint">
      <img src="/paint-roller.png" alt="Paint" title="Paint" />Paint Clone
    </router-link>
    <router-link class="nav-item" to="/tools/pong">
      <img src="/ping-pong.png" alt="Pong" title="Pong" />Pong Game
    </router-link>
    <router-link class="nav-item" to="/tools/calculator">
      <img src="/calculator.png" alt="Pong" title="Calculator" />Calculator
    </router-link>
  </div>

  <router-view></router-view>
</template>

<style>
.about-sub-nav-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #272727;
  padding: 1rem;
  font-family: 'Oswald', sans-serif;
  color: black;
}

.nav-item {
  margin: 0 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.nav-item img {
  width: 24px;
  height: 24px;
}

/* Hide the about-sub-nav-bar when the screen width is less than 550px */
@media only screen and (max-width: 550px) {
  .about-sub-nav-bar {
    display: none;
  }
}
</style>
<script setup lang="ts">
</script>