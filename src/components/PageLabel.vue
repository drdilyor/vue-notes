<template>
  <div v-if="label">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Notes labeled
        <note-label class="fs-6" :label="label" />
      </h2>
      <button class="btn btn-sm btn-danger" @click="remove">Remove</button>
    </div>
    <note-list :notes="notes"></note-list>
  </div>
</template>

<script>
import NoteList from './NoteList.vue'
import NoteLabel from './NoteLabel.vue'

export default {
  components: {
    NoteLabel,
    NoteList,
  },
  computed: {
    label() {
      return this.$store.getters.labelsById[this.$route.params.id]
    },
    notes() {
      return this.$store.state.notes.filter(i => i.labels.includes(this.$route.params.id))
    }
  },
  methods: {
    remove() {
      this.$store.commit('removeLabel', this.$route.params.id)
      this.$router.push('/')
    }
  }
}
</script>
