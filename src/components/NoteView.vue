<template>
  <div
    class="d-flex align-items-start p-2 mb-2 border rounded"
    :class="expanded && 'flex-column'"
    @click="expanded = !expanded"
  >
    <template v-if="!expanded">
      <span>{{ note.title }}</span>
      <span class="flex-grow-1 ms-2 text-muted">{{ note.description }}</span>
      <note-label v-for="label in note.labels.slice(0, 1)" :key="label.id" :label="$store.getters.labelsById[label]" />
    </template>
    <template v-else>
      <div class="d-flex align-self-stretch justify-content-between">
        <h3 @click.stop="edit('title')">{{ note.title }}</h3>

        <span class="text-danger pointer" @click.stop="remove">&cross;</span>
      </div>
      <p class="mb-0" @click.stop="edit('description')">{{ note.description }}</p>
      <p class="text-muted mb-0">{{ note.date.toString() }}</p>
      <div v-if="!labelEditing" @click.stop="labelEditing = true">
        <note-label
          v-for="label in note.labels"
          :key="label.id"
          :label="$store.getters.labelsById[label]"
        />
        <button v-if="!note.labels.length" class="btn btn-sm btn-primary">Add label</button>
      </div>
      <div v-else class="align-self-stretch" @click.stop>
        <note-label-editor :note="note" @done="labelEditing = false" />
      </div>
    </template>
  </div>
</template>

<script>
import NoteLabel from './NoteLabel.vue'
import NoteLabelEditor from './NoteLabelEditor.vue'

export default {
  components: {
    NoteLabel,
    NoteLabelEditor,
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    }
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    expanded: false,
    labelEditing: false,
  }),
  watch: {
    expanded(_, value) {
      if (value === false)
        this.labelEditing = false
    }
  },
  methods: {
    remove() {
      this.$store.commit('removeNote', this.note)
    },
    edit(key) {
      const value = prompt(`Enter new ${key} for note "${this.note.title}"`)
      if (value) {
        this.$store.commit('editNote', {
          id: this.note.id,
          [key]: value,
        })
      }
    },
  }
}
</script>

<style>
.pointer {
  cursor: pointer;
  user-select: none;
}
</style>
