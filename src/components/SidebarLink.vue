<template>
  <router-link
    tag="div"
    class="sidebar-item"
    exact-active-class="bg-white text-dark"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'SidebarLink',
}
</script>
