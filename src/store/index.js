import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notesList: [],        // список заметок
    noteAction: "create",        // действие с заметкой (создание или редактирование)
    editNote: {},        // заметка для редактирования
  },
  mutations: {
    addNote (state, note) {
      state.notesList.push(note)
    },
    deleteNote (state, noteId) {
      state.notesList.splice(noteId, 1)
    },
    setAction (state, action) {
      state.noteAction = action
    },
    setEditNote (state, editNote) {
      state.editNote = _.cloneDeep(editNote)
    }
  },
  actions: {
    addNoteAction ({commit}, note) {
      commit("addNote", note)
    },
    deleteNoteAction ({commit}, noteId) {
      commit("deleteNote", noteId)
    },
    setNoteAction ({commit}, action) {
      commit("setAction", action)
    },
    setEditNoteAction ({commit}, editNote) {
      commit("setEditNote", editNote)
    }
  },
  getters: {
    notesList: state => state.notesList,
    noteAction: state => state.noteAction,
    editNote: state => state.editNote
  },
  plugins: [createPersistedState()]
})
