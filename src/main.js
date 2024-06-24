import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import About from './Pages/About.vue'
import Education from './Pages/Education.vue'
import Experience from './Pages/Experience.vue'
import Projects from './Pages/Projects.vue'
import Skills from './Pages/Skills.vue'
import Hero from "./Pages/Home.vue";
import Stefan from "./Pages/ContactMe.vue";
import AboutMeSection from "./Components/Nav/AboutMeSection.vue";
import './assets/themes.css';
import KanBanBoard from "./Components/Tools/KanBanBoard.vue";
import Tools from "./Components/Nav/Tools.vue";
import PaintClone from "./Components/Tools/PaintClone.vue";
import PongGame from "./Components/Tools/PongGame.vue";
import Calculator from "./Components/Tools/Calculator.vue";

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Hero },
    { path: '/about', component: About },
    { path: '/education', component: Education },
    { path: '/experience', component: Experience },
    { path: '/projects', component: Projects },
    { path: '/skills', component: Skills },
    { path: '/stefan', component: Stefan },
    { path: '/aboutMeSection', redirect: '/about' },
    {
        path: '/aboutMeSection',
        component: AboutMeSection,
        children: [
            { path: '', redirect: '/aboutMeSection/about' },
            { path: 'about', component: About },
            { path: 'education', component: Education },
            { path: 'experience', component: Experience },
            { path: 'skills', component: Skills }
        ]
    },
    {
        path: '/tools',
        component: Tools,
        children: [
            { path: '', redirect: '/tools/project' },
            { path: 'project', component: Projects },
            { path: 'kanban', component: KanBanBoard },
            { path: 'paint', component: PaintClone },
            { path: 'pong', component: PongGame },
            { path: 'calculator', component: Calculator },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')

// Vue.config.productionTip = false;

// new Vue({
//     render: h => h(App),
// }).$mount('#app');