<template>
  <div class="theme-toggle">
    <label class="switch">
      <input type="checkbox" id="theme-switch" @change="toggleTheme" />
      <span class="slider round"></span>
    </label>
<p>MODE</p>
  </div>
</template>

<script>
export default {
  name: "ThemeToggle",
  data() {
    return {
      isDarkMode: false
    };
  },
  methods: {
    toggleTheme() {
      if (this.isDarkMode) {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        this.isDarkMode = false;
      } else {
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        this.isDarkMode = true;
      }
    },
    setInitialTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        this.isDarkMode = true;
      } else {
        document.documentElement.classList.add('light');
        this.isDarkMode = false;
      }
    }
  },
  mounted() {
    this.setInitialTheme();
  }
}
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: black;
  margin-left: 1rem;
}
p {
  font-family: "Oswald", sans-serif;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}



.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

@media screen and (max-width: 500px) {
  .switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 24px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }



  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:checked + .slider:before {
    transform: translateX(7px);
  }

  p {
    display: none;
  }

}
</style>