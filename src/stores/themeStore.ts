import { ref } from 'vue'

export const useThemeStore = () => {
    const isDarkMode = ref(localStorage.getItem('theme') === 'dark')

    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value
        applyTheme(isDarkMode.value)
    }

    const applyTheme = (isDark: boolean) => {
        if (isDark) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('light')
            localStorage.setItem('theme', 'light')
        }
    }

    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme')
        isDarkMode.value = savedTheme === 'dark'
        applyTheme(isDarkMode.value)
    }

    return {
        isDarkMode,
        toggleTheme,
        initTheme
    }
}