<template>
  <span class="px-2 rounded" :style="labelStyle">{{ label.text }}</span>
</template>

<script>
function isLight(color) {
  const [red, green, blue] = [
    color.slice(1, 3),
    color.slice(3, 5),
    color.slice(5),
  ].map(i => parseInt(i, 16))
  return red + green + blue > 255 * 1.5
}

export default {
  props: {
    label: {
      type: Object,
      required: true,
    }
  },
  computed: {
    labelStyle() {
      return {
        'background-color': this.label.color,
        color: isLight(this.label.color) ? 'black' : 'white'
      }
    }
  }
}
</script>
