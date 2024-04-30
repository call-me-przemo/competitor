<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <nav>
    <Navbar />
  </nav>
  <main>
    <RouterView />
  </main>
</template>
