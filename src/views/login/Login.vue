<script setup>
import Login from '@/components/Login/Login.vue';
</script>
<template>
<Login/>
</template>
<style>
@import '@/assets/styles/index.css';
@import url('https://fonts.googleapis.com/css2?family=Public+Sans&display=swap');
.font-base {
  font-family: 'Public Sans', sans-serif;
}

@media only screen and (min-width: 600px) {
  .pc-styling {
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@media only screen and (max-width: 600px) {
  .mobile-styling {
  z-index: 3;
  top: 57%;
  left: 0%;
  transform: translate(10%, -50%);
}
}
</style>
  <script>
  </script>
