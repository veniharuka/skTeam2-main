import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.css';
// import '/assetss/html.css';
import './assets/Home.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import '@mdi/font/css/materialdesignicons.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(BootstrapVue3);
app.use(pinia);
app.use(router);

app.mount('#app');
