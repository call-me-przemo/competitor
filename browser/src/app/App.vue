<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="min-h-screen flex flex-column">
    <nav>
      <Navbar />
    </nav>
    <main class="m-auto">
      <RouterView />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
