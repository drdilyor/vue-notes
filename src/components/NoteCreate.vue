<template>
  <form @submit.prevent="submit">
    <div class="d-flex mb-2">
      <input
        class="flex-grow-1 form-control"
        v-model="title"
        required
        placeholder="Create note"
        tabindex="1"
      >
      <button
        class="flex-shrink-0 ms-2 btn btn-primary"
        type="submit"
        tabindex="3"
      >
        <span class="d-none d-lg-block">Create</span>
        <span class="d-block d-lg-none">+</span>
      </button>
    </div>
    <textarea
      v-show="title.length"
      class="form-control mb-2"
      v-model="description"
      required
      placeholder="Description*"
      tabindex="2"
    />
  </form>
</template>

<script>
export default {
  data: () => ({
    title: '',
    description: '',
    expand: false,
  }),
  methods: {
    submit() {
      console.assert(this.title && this.description)
      this.$store.commit('createNote', {
        title: this.title,
        description: this.description,
      })
      this.title = this.description = ''
    }
  }
}
</script>
