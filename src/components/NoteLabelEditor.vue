<template>
  <div class="d-flex align-items-start">
    <div class="form-control d-flex align-items-center">
      <note-label
        v-for="label in labels"
        :key="label"
        :label="$store.getters.labelsById[label]"
        class="pointer"
        @click.native="removeLabel(label)"
      />
      <input
        class="border-0 outline-0 flex-grow-1"
        v-model="label"
        :list="dtId"
        placeholder="Label name..."
        @keydown.esc="canceled=true,$emit('done')"
        @keydown.enter="enter"
        @change="add"
      >
      <datalist :id="dtId">
        <option v-for="i in dtOptions" :value="i" />
      </datalist>
    </div>
    <button class="btn btn-primary ms-2" @mouseup="doneClick" @touchend="doneClick">
      Done
    </button>
  </div>
</template>

<script>
import NoteLabel from './NoteLabel.vue'

export default {
  props: {
    note: {
      type: Object,
      required: true,
    }
  },
  components: {
    NoteLabel,
  },
  data() {
    return {
      labels: [...this.note.labels],
      label: '',
      canceled: false,
    }
  },
  computed: {
    dtId() {
      return this.note.id + '-datalist'
    },
    dtOptions() {
      return this.$store.state.labels
        .filter(i => !this.labels.includes(i.id))
        .map(i => i.text)
    }
  },
  methods: {
    removeLabel(label) {
      console.log({removeLabel: label})
      this.labels = this.labels.filter(i => i != label)
    },
    enter(event) {
      if (this.label === '') {
        this.save()
        this.$emit('done')
      }
    },
    add() {
      const label = this.$store.getters.labelsByText[this.label]
      if (!label) {
        // TODO: add new label implicitly
        this.label = ''
      } else {
        this.label = ''
        this.labels.push(label.id)
      }
    },
    save() {
      this.$store.commit('setNoteLabels', {noteId: this.note.id, labels: this.labels})
    },
    doneClick() {
      this.save()
      this.$emit('done')
    },
  },
  beforeDestroy() {
    if (!this.canceled)
      this.save()
  }
}
</script>

<style>
.outline-0 {
  outline: 0;
}
</style>
