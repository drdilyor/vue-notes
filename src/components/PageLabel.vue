<template>
  <div v-if="label">
    <h2>Notes labeled
      <note-label class="fs-6" :label="label" />
    </h2>
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
  }
}
</script>
