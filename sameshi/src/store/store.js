import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []//④
  },
  mutations: {
    FETCH_POSTS(state, posts) {//③
      state.posts = posts
    }
  },
  actions: {
    async fetchPosts({ commit }) {//①
      await axios().get('/post')
        .then(res => {
          commit('FETCH_POSTS', res.data)//②
        })
        .catch(e => console.log(e))
    }
  }
})
