<script>
  import Taskbar from '@/components/Taskbar.vue';
  import StartMenu from '@/components/StartMenu.vue';

  export default {
      name: "App",
      components: { Taskbar, StartMenu }
  };  
</script>

<template>
  <Taskbar />
  <StartMenu />
</template>

<style scoped lang="ts">
</style>
