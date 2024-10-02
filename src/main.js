import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import stores from "./stores";
import App from "@/App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from 'axios';
import VueTippy from 'vue-tippy';
import "tippy.js/dist/tippy.css";
import "@assets/styles/index.css"
import { createI18n } from 'vue-i18n';
import { translations } from './translation';

axios.defaults.withCredentials = true;

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//ApexCharts
import VueApexCharts from "vue3-apexcharts";

import router from "./router";

let savedLocale = localStorage.getItem('isLangmode');

if (!savedLocale) {
  savedLocale = 'false';  // Default locale
  localStorage.setItem('isLangmode', savedLocale); // Simpan nilai default ke localStorage
}

const locale = savedLocale === 'true' ? 'id' : 'en'; // Mengatur locale

const i18n = createI18n({
  locale: locale, // Set default locale
  messages: translations, // Ganti dengan translations
});

const vuetify = createVuetify({
    components,
    directives,
  })
  
  const options = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
  }

const app = createApp(App)
app.use(i18n);
app.use(VueTippy);
app.use(VueApexCharts);
app.use(stores)
app.use(Toast, options);
app.use(vuetify)
app.use(createPinia())
app.use(router).mount("#app");

export { i18n };