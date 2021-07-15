<template>
  <div
    class="d-flex p-2 mb-2 border rounded"
    :class="!expanded ? '' : 'flex-column align-items-start' "
    @click="expanded = !expanded"
  >
    <template v-if="!expanded">
      <span>{{ note.title }}</span>
      <span class="flex-grow-1 ms-2 text-muted">{{ note.description }}</span>
    </template>
    <template v-else>
      <div class="d-flex align-self-stretch justify-content-between">
        <h3 @click.stop="edit('title')">{{ note.title }}</h3>

        <span class="text-danger pointer" @click.stop="remove">&cross;</span>
      </div>
      <p class="mb-0" @click.stop="edit('description')">{{ note.description }}</p>
      <p class="text-muted mb-0">{{ note.date.toString() }}</p>
    </template>
  </div>
</template>

<script>
export default {
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
    expanded: false
  }),
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
