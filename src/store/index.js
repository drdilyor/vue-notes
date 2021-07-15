import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    _noteId: 0,
    notes: []
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes
    },
    createNote(state, note) {
      state.notes.push({
        ...note,
        id: state.noteId++,
        date: new Date,
      })
    },
    removeNote(state, note) {
      state.notes = state.notes.filter(i => i.id != note.id)
    },
    editNote(state, {id, ...newNote}) {
      state.notes = state.notes.map(i => i.id == id ? {...i, ...newNote} : i)
    }
  },
  actions: {
  },
  modules: {
  },
})

let saved = JSON.parse(localStorage.getItem('saved'))
if (saved) {
  for (let key in saved) {
    store.state[key] = saved[key]
  }
}

window.onbeforeunload = function() {
  localStorage.setItem('saved', JSON.stringify(store.state))
}

export default store
