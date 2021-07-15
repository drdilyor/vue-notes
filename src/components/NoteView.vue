<template>
  <div>
    <div class="card mb-4">
      <div class="card-body">
        <h3 class="card-title text-primary clearfix">
          <span v-if="!editingTitle" @click="editTitle">{{ note.title }}</span>
          <input
            v-else
            v-model="note.title"
            v-focus
            @click="editTitle"
            @keydown.enter.escape="editTitleComplete"
            @blur="editTitleComplete">

          <span
            @click="$emit('remove-note')"
            class="btn-delete text-muted">&cross;</span>
        </h3>
        <p>{{ note.description }}</p>
        <span class="text-muted">{{ note.date }}</span>
      </div>
    </div>
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
  data() {
    return {
      editingTitle: false,
    }
  },
  methods: {
    editTitle() {
      this.editingTitle = true
    },
    editTitleComplete() {
      this.editingTitle = false
    }
  },
}
</script>

<style scoped>
.btn-delete {
  float: right;
  cursor: pointer;
}
</style>
