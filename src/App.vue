<template>
  <div class="app">
    <app-sidebar ref="sidebar" />
    <div class="app-content container pt-2">
      <div class="navbar-light mb-4 d-lg-none">
        <span class="navbar-toggler-icon pointer" @click="toggleSidebar"/>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import AppSidebar from './components/AppSidebar.vue'

export default {
  components: {AppSidebar},
  methods: {
    toggleSidebar() {
      this.$refs.sidebar.toggle()
    }
  }
}
</script>

<style>
.app {
  display: flex;
}
.app-content {
  flex-grow: 1;
}
</style>

