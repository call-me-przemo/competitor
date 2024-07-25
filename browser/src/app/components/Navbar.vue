<script setup lang="ts">
import Menubar from 'primevue/menubar';
import { MenuItem } from 'primevue/menuitem';
import Image from 'primevue/image';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const items = ref<MenuItem[]>([
  {
    label: 'Example',
    url: 'https://example.com',
  },
  {
    label: 'Also example',
    url: 'https://example.com',
  },
]);
</script>
<template>
  <Menubar
    :model="items"
    class="rounded-none border-0 shadow-xl dark:shadow-gray-700 bg-primary-500"
    :pt="{
      rootList: {
        class: 'ml-auto text-lg lg:shadow-none shadow-xl dark:shadow-gray-700',
      },
      itemContent: {
        class:
          'bg-inherit hover:text-primary-500 lg:hover:text-primary-contrast',
      },
      button: {
        class: 'ml-auto bg-inherit',
      },
      buttonIcon: {
        class: 'text-color size-10',
      },
    }"
  >
    <template #start>
      <RouterLink :to="{ name: 'index' }" class="flex">
        <Image src="/icon.png" alt="app logo" class="mr-2 w-10" />
        <p class="text-3xl">Competitor</p>
      </RouterLink>
    </template>
  </Menubar>
</template>
