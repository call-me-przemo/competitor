import router from './app/router';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './app/App.vue';
import { primeVueConfig } from './primevueConfig';
import './assets/main.css';
import 'primeicons/primeicons.css';

createApp(App).use(PrimeVue, primeVueConfig).use(router).mount('#root');
