<template>
  <div class="row note-list">
    <NoteView
      v-for="(note, index) in notes"
      :class="getClass"
      :key="index"
      :note="note"
      @remove-note="$emit('remove-note', index)" />
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
    expanded: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    getClass() {
      return [this.expanded ? 'col-12' : 'w-50']
    }
  }
}
</script>
