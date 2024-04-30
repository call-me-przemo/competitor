<script setup lang="ts">
import Menubar from 'primevue/menubar';
import { MenuItem } from 'primevue/menuitem';
import Image from 'primevue/image';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const items = ref<MenuItem[]>([]);
</script>
<template>
  <Menubar :model="items">
    <template #start>
      <RouterLink :to="{ name: 'home' }" class="flex align-items-center">
        <Image src="/icon.png" alt="app logo" width="30" class="mr-2" />
        <p class="text-xl">Competitor</p>
      </RouterLink>
    </template>
  </Menubar>
</template>
