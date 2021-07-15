<template>
  <form @submit.prevent="submit">
    <div v-if="message" class="alert alert-danger mt-4">
      {{ message }}
    </div>
    <input v-model="note.title" class="form-control mb-2">
    <textarea v-model="note.description" class="form-control mb-2"></textarea>
    <button type="submit" class="btn btn-primary">Create note</button>
  </form>
</template>

<script>
module.exports = {
  data() { return {
    message: null,
    note: {
      title: '',
      description: '',
    },
  }},
  methods: {
    submit() {
      const {title, description} = this.note

      if (title === '') {
        this.message =  'Title cannot be empty'
        return
      }

      this.message = null

      this.$emit('form-submit', {
        title,
        description,
        date: new Date(Date.now()).toLocaleString()
      })
      this.note.title = ''
      this.note.description = ''
    }
  }
}
</script>