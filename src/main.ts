import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import vuetify from './plugins/vuetify'
import '@/scss/style.scss'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
// import Maska from 'maska';

const app = createApp(App)
app.use(createPinia())
    .use(router)
    .use(PerfectScrollbarPlugin)
    .use(VueTablerIcons)
    // .use(Maska)
    .use(VueApexCharts)
    .use(vuetify)
app.mount('#app')
