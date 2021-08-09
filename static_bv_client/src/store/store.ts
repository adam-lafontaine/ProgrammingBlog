import Vue from 'vue'
import Vuex from 'vuex'
import post_module from './modules/post/post.module'

Vue.use(Vuex)

export default new Vuex.Store({
  //state: {},
  //mutations: {},
  //actions: {},
  modules: {
    post_module,
  }
})