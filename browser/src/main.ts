import router from './app/router';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './app/App.vue';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import './assets/main.css';
import 'primeicons/primeicons.css';

const preset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: '{orange.500}',
      600: '{orange.600}',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}',
    },
  },
});

createApp(App)
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset,
      ripple: true,
      options: {
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, primevue, tailwind-utilities',
        },
      },
    },
  })
  .mount('#root');
