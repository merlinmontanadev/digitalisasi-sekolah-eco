import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from 'axios';
axios.defaults.withCredentials = true;


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//ApexCharts
import VueApexCharts from "vue3-apexcharts";
//VBlur


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

app.use(VueApexCharts);

app.use(Toast, options);
app.use(vuetify)
app.use(createPinia())
app.use(router).mount("#app");