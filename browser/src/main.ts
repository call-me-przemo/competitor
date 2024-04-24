import router from './router';
import PrimeVueStyled from 'primevue/styled';
import { createApp } from 'vue';
import App from './app/App.vue';

createApp(App).use(router).use(PrimeVueStyled).mount('#root');
