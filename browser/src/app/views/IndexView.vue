<script setup lang="ts">
import Galleria from 'primevue/galleria';

const images = [
  {
    src: '/images/braden-collum-9HI8UJMSdZA-unsplash.jpg',
    alt: 'braden-collum-9HI8UJMSdZA-unsplash',
  },
  {
    src: '/images/brian-erickson-XFneC_rHR48-unsplash.jpg',
    alt: 'brian-erickson-XFneC_rHR48-unsplash',
  },
  {
    src: '/images/chander-r-AtfA8NDgpKA-unsplash.jpg',
    alt: 'chander-r-AtfA8NDgpKA-unsplash',
  },
  {
    src: '/images/chander-r-z4WH11FMfIQ-unsplash.jpg',
    alt: 'chander-r-z4WH11FMfIQ-unsplash',
  },
  {
    src: '/images/chermiti-mohamed-FdsqHM4fawg-unsplash.jpg',
    alt: 'chermiti-mohamed-FdsqHM4fawg-unsplash',
  },
  {
    src: '/images/lucas-favre-JnoNcfFwrNA-unsplash.jpg',
    alt: 'lucas-favre-JnoNcfFwrNA-unsplash',
  },
  {
    src: '/images/martins-zemlickis-NPFu4GfFZ7E-unsplash.jpg',
    alt: 'martins-zemlickis-NPFu4GfFZ7E-unsplash',
  },
];
</script>
<template>
  <section class="flex justify-center">
    <Galleria
      :value="images"
      :circular="true"
      :showItemNavigators="true"
      :showThumbnails="false"
      :showItemNavigatorsOnHover="true"
      :showIndicators="true"
      :autoPlay="true"
      :transitionInterval="2000"
      :showIndicatorsOnItem="true"
      :pt="{
        root: { class: 'lg:w-3/4 2xl:w-1/2' },
      }"
    >
      <template #item="slotProps">
        <img :src="slotProps.item.src" :alt="slotProps.item.alt" />
      </template>
    </Galleria>
  </section>
</template>
