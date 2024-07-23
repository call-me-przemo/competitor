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
    class="rounded-none border-0 shadow-xl dark:shadow-gray-700"
  >
    <template #start>
      <RouterLink :to="{ name: 'index' }" class="flex items-center">
        <Image src="/icon.png" alt="app logo" class="mr-2 w-14" />
        <p class="text-4xl">Competitor</p>
      </RouterLink>
    </template>
  </Menubar>
</template>
