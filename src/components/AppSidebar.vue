<template>
  <div class="sidebar bg-dark text-light" :class="{open}">
    <div class="d-flex justify-content-between mb-2 p-2">
      <h3>Notes</h3>
      <svg class="pointer d-lg-none" style="width:24px;height:24px" viewBox="0 0 24 24" @click="toggle">
        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
      </svg>
    </div>
    <router-link tag="div" class="sidebar-item" exact-active-class="bg-white text-dark" to="/">
      <div class="label-color" />
      All
    </router-link>
    <router-link
      v-for="label in $store.state.labels"
      :key="label.id"
      tag="div"
      class="sidebar-item"
      exact-active-class="bg-white text-dark"
      :to="'/label/'+label.id"
    >
      <div class="label-color" :style="{'background-color': label.color}" />
      {{ label.text }}
    </router-link>
  </div>
</template>

<script>
export default {
  data: () => ({
    open: false,
  }),
  methods: {
    toggle() {
      this.open = !this.open
    }
  }
}
</script>

<style>
.sidebar {
  position: fixed;
  flex-shrink: 0;
  width: 15rem;
  height: 100vh;
  transform: translateX(-100%);
  transition: transform .2s;
}

.sidebar.open {
  transform: none;
}

@media screen and (min-width: 992px) {
  .sidebar {
    position: static;
    transform: none;
  }
}

.sidebar-item {
  display: flex;
  align-items: baseline;
  padding: .5em 1em;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.sidebar-item:hover {
  background: rgba(255,255,255,.15);
}
.sidebar-item:active {
  background: rgba(255,255,255,.25);
}

.label-color {
  width:12px;
  height:12px;
  margin-right: .5rem;
}
</style>
