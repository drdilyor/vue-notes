<template>
  <div>
    <note-create />
    <note-list
      :notes="$store.state.notes"
    />
  </div>
</template>

<script>
import NoteCreate from './NoteCreate.vue'
import NoteList from './NoteList.vue'

export default {
  components: {
    NoteCreate,
    NoteList,
  }
}
</script>
