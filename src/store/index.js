import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const makeRandomMaker = () => {
  let i = 0;
  return () => `${i++}-${Date.now()}`
}

const nextNoteId = makeRandomMaker()
const nextLabelId = makeRandomMaker()

const store = new Vuex.Store({
  state: {
    notes: [],
    labels: [],
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes
    },
    createNote(state, {title, description}) {
      state.notes.push({
        title,
        description,
        labels: [],
        id: nextNoteId(),
        date: new Date,
      })
    },
    removeNote(state, note) {
      state.notes = state.notes.filter(i => i.id != note.id)
    },
    editNote(state, {id, ...newNote}) {
      state.notes = state.notes.map(i => i.id == id ? {...i, ...newNote} : i)
    },
    setNoteLabels(state, {noteId, labels}) {
      state.notes.filter(i => i.id == noteId).forEach(i => i.labels = labels)
    },
    addLabel(state, {text, color}) {
      console.assert(/#[0-9a-fA-F]{6}/.test(color))
      // Caller must check if text is unique
      state.labels.push({
        text,
        color,
        id: nextLabelId(),
      })
    },
    removeLabel(state, id) {
      state.labels = state.labels.filter(i => i.id != id)
      // remove the label from notes
      state.notes.forEach(note => {
        note.labels = note.labels.filter(i => i.id != id)
      })
    }
  },
  actions: {
  },
  getters: {
    labelsById(state) {
      return state.labels.reduce((result, i) => (result[i.id] = i, result), {})
    },
    labelsByText(state) {
      return state.labels.reduce((result, i) => (result[i.text] = i, result), {})
    }
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

window.store = store

export default store
