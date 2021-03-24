import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../axios-auth";
import router from '../router';
// import axiosRefresh from '../axios-refresh'
import firebase from 'firebase'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    googleLogin_user: null,
    posts: [],
    idToken: null
  },
  getters: {
    idToken: state => state.idToken,
    userName: state => state.googleLogin_user ? state.googleLogin_user.displayName : '',
    uid: state => state.googleLogin_user ? state.googleLogin_user.uid : null
  },
  mutations: {
    setLoginUser(state, user) {
      state.googleLogin_user = user
    },
    deleteLoginUser(state) {
      state.googleLogin_user = null
    },
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
    addPost(state, post) {
      state.addPost.push(post)
    },
    DELETE_POST(state, postId) { // 追加 ②
      const posts = state.posts.filter(b => b.id != postId)
      state.posts = posts
    }
  },
  actions: {
    login({ commit, dispatch }, authData) {
      axios
        .post(
          "/accounts:signInWithPassword?key=AIzaSyB1OCfEstfBozmI8v1_tipkdyf9WEwL06M",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          commit('updateIdToken', response.data.idToken);
          setTimeout(() => {
            dispatch('refreshIdToken', response.data.refreshToken)
          }, response.data.expiresIn * 1000);
          router.push('/');
        });
    },
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user);
      router.push('/');
    },
    googleLogin() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    googleLogout() {
      firebase.auth().signOut()
      router.replace('/');
    },
    logout({ commit }) {
      commit('updateIdToken', null);
      router.replace('/')
    },
    addPost({ getters, commit }, post) {
      if (getters.uid) firebase.firestore().collection(`users/${getters.uid}/posts`).add(post)
      commit('addPost', post)
    },
    // refreshToken({ commit, dispatch }, refreshToken) {
    //   axiosRefresh.post('/token?key=AIzaSyB1OCfEstfBozmI8v1_tipkdyf9WEwL06M', { grant_type: 'refresh_token', refresh_token: refreshToken }).then(response => {
    //     commit('updateIdToken', response.data.id_token);
    //     setTimeout(() => {
    //       dispatch('refreshIdtToken', response.data.id_token);
    //     }, response.data.expires_in * 1000)
    //   });
    // },
    signUp({ commit }, authData) {
      axios
        .post(
          "/accounts:signUp?key=AIzaSyB1OCfEstfBozmI8v1_tipkdyf9WEwL06M",
          {
            name: authData.name,
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          commit('updateIdToken', response.data.idToken);
          router.push('/')
        });
    },
    async deletePost({ commit }, post) { // 追加 ①
      await axios.delete(`/posts/${post.id}`, post)
      commit('DELETE_POST', post.id)
    }
  }
});
