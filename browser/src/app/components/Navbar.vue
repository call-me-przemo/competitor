<script setup lang="ts">
import Menubar from 'primevue/menubar';
import { MenuItem } from 'primevue/menuitem';
import Image from 'primevue/image';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const items = ref<MenuItem[]>([]);
</script>
<template>
  <Menubar
    :model="items"
    :pt="{
      root: {
        class: 'border-noround bg-primary',
      },
    }"
  >
    <template #start>
      <RouterLink :to="{ name: 'index' }" class="flex align-items-center">
        <Image src="/icon.png" alt="app logo" class="mr-2 w-3rem" />
        <p class="text-4xl">Competitor</p>
      </RouterLink>
    </template>
  </Menubar>
</template>
