<template>
  <div>
    <note-view
      v-for="note in notes"
      :key="note.id"
      :note="note" />
  </div>
</template>

<script>
import NoteView from './NoteView.vue'

export default {
  components: {NoteView},
  props: {
    notes: {
      type: Array,
      required: true,
    },
  },
}
</script>
