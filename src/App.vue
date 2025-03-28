<script>
  import Taskbar from '@/components/Taskbar.vue';
  import StartMenu from '@/components/StartMenu.vue';
  import Notepad from './components/Notepad.vue';

  export default {
      name: "App",
      components: { Taskbar, StartMenu, Notepad }
  };  
</script>

<template>
  <Taskbar />
  <StartMenu />
  <Notepad/>
</template>

<style scoped lang="ts">
</style>
