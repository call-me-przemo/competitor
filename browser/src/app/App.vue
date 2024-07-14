<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <nav>
      <Navbar />
    </nav>
    <main class="m-auto p-8">
      <RouterView />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
