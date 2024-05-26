<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footerbar from './components/Footerbar.vue';
</script>

<template>
  <div class="min-h-screen flex flex-column">
    <nav>
      <Navbar />
    </nav>
    <main class="m-auto h-max">
      <RouterView />
    </main>
    <footer>
      <Footerbar />
    </footer>
  </div>
</template>
