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

axios.defaults.withCredentials = true;

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//ApexCharts
import VueApexCharts from "vue3-apexcharts";

import router from "./router";

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
app.use(VueTippy);
app.use(VueApexCharts);
app.use(stores)
app.use(Toast, options);
app.use(vuetify)
app.use(createPinia())
app.use(router).mount("#app");