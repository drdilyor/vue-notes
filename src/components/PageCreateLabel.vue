<template>
  <form @submit.prevent="create">
    <h2>Create label</h2>
    <input class="form-control" v-model="text" placeholder="Label text" required>
    <h3 class="mt-2">{{ custom ? 'Custom color' : 'Color' }}</h3>
    <div v-if="!custom" class="d-flex flex-wrap colors">
      <div
        v-for="(color, index) in colors"
        class="color h-50 w-25 pointer"
        :class="{active: colorSelected == index}"
        :style="{'background-color': color}"
        @click="colorSelected = index"
      />
      <div class="h-50 w-25 d-flex justify-content-center align-items-center pointer" @click="customClick">Custom</div>
    </div>
    <div v-else class="d-flex">
      <input class="form-control color-control" type="color" v-model="customColor">
      <div class="btn btn-outline-primary ms-2" @click="custom = false">Presets</div>
    </div>
    <button class="btn btn-primary mt-2" type="submit">Create</button>
  </form>
</template>

<script>
export default {
  data: () => ({
    text: '',
    colors: [
      '#dc3545', // red
      '#ffc107', // yellow
      '#198754', // green
      '#0d6efd', // blue
      '#0dcaf0', // cyan
      '#6c757d', // gray
      '#212529', // black
    ],
    colorSelected: 0,
    customColor: '#000000',
    custom: false,
  }),
  methods: {
    customClick() {
      this.custom = -1
    },
    create() {
      if (!this.text) return
      if (this.$store.getters.labelsByText[this.text]) {
        return alert('Such label already exists')
      }
      this.$store.commit('addLabel', {
        text: this.text,
        color: this.custom ? this.customColor : this.colors[this.colorSelected]
      })
      this.$router.push('/label/' + this.$store.getters.labelsByText[this.text].id)
    },
  },
}
</script>

<style>
.colors {
  height: 8rem;
  max-width: 40rem;
}
.color.active {
  outline: 4px solid white;
  outline-offset: -4px;
}

.color-control {
  max-width: 20rem;
}
</style>
