import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/PageHome.vue'
import Label from './components/PageLabel.vue'
import CreateLabel from './components/PageCreateLabel.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
    {path: '/label/:id', component: Label},
    {path: '/create-label', component: CreateLabel},
  ]
})
