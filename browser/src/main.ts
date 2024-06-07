import router from './app/router';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './app/App.vue';

import './assets/main.css';
import 'primevue/resources/themes/aura-dark-teal/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

createApp(App).use(router).use(PrimeVue, { ripple: true }).mount('#root');
