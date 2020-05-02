import Vue from 'vue'
import VueRouter from 'vue-router'
import NotesList from '../views/NotesList.vue'
import NoteActions from '../views/NoteActions.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Notes list',
    component: NotesList
  },
  {
    path: '/createNote',
    name: 'Note creation',
    component: NoteActions
  }
]

const router = new VueRouter({
  routes
})

export default router
