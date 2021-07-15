<template>
  <div class="wrapper">
    <div class="wrapper-content pt-4"><section><div class="container-xl">

      <note-form @form-submit="createNote"></note-form>

      <h1 class="mt-4">
        <span>{{ title }}</span>

        <input
          v-model="search"
          class="form-control w-auto"
          type="search"
          placeholder="Search">

        <span class="header-icons">
          <i class="fa fa-th-large"
            :class="{'text-primary': isGrid == false}"
            @click="isGrid = false"/>
          <i
            class="fa fa-columns"
            :class="{'text-primary': isGrid== true}"
            @click="isGrid = true"></i>
        </span>
      </h1>

      <note-list
        :notes="getNotes"
        @remove-note="removeNote"
        :expanded="!isGrid"></note-list>

    </div></section></div>
  </div>
</template>

<script>
import NoteForm from './components/NoteForm.vue';
import NoteList from './components/NoteList.vue'

export default {
  name: 'App',
  components: {
    NoteForm,
    NoteList,
  },

  data() { return {
    title: 'Notes app',
    isGrid: true,
    search: '',
    notes: [
      {
        title: 'First note',
        description: 'Description for the first note',
        date: new Date(Date.now()).toLocaleString(),
      },
      {
        title: 'Second note',
        description: 'Description for the second note',
        date: new Date(Date.now()).toLocaleString(),
      },
      {
        title: 'Third note',
        description: 'Description for the third note',
        date: new Date(Date.now()).toLocaleString(),
      },
    ]
  }},

  computed: {
    getNotes() {
      const s = this.search.trim().toLowerCase()
      return this.notes.filter(
        i => ~i.title.toLowerCase().indexOf(s)
          //|| ~i.description.toLowerCase().indexOf(s)
      )
    }
  },

  methods: {
    createNote(note) {
      this.notes.push(note)
    },
    removeNote(index) {
      console.log("Removed");
      console.log({ index });
      this.notes.splice(index, 1)
    }
  },
}
</script>

<style>
h1 {
  display: flex;
  justify-content: space-between;
}

.header-icons > * {
  margin-left: 1rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.header-icons i {
  cursor: pointer;
}
</style>
