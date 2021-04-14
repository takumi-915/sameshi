import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../axios-auth";
import router from '../router';
import axiosRefresh from '../axios-refresh'
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
    autoLogin({ commit, dispatch }) {
      const idToken = localStorage.getItem('idToken');
      if (!idToken) return;
      const now = new Date();
      const expiryTimeMs = localStorage.getItem('expiryTimeMs')
      const isExpired = now.getTime() >= expiryTimeMs;
      const refreshToken = localStorage.getItem('refreshToken');
      if (isExpired) {
        dispatch('refreshIdToken')
      } else {
        const expiresInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch('refreshIdToken', refreshToken);
        }, expiresInMs);
        commit('updateIdToken', idToken)
      }
    },
    login({ dispatch }, authData) {
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
          dispatch('setAuthData', {
            idToken: response.data.idToken,
            expiresIn: response.data.expiresIn,
            refreshToken: response.data.refreshToken,
          });
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
    refreshIdToken({ dispatch }, refreshToken) {
      axiosRefresh.post('/token?key=AIzaSyB1OCfEstfBozmI8v1_tipkdyf9WEwL06M', { grant_type: 'refresh_token', refresh_token: refreshToken }).then(response => {
        dispatch('setAuthData', {
          idToken: response.data.id_Token,
          expiresIn: response.data.expires_In,
          refreshToken: response.data.refresh_Token,
        });
      });
    },
    signUp({ dispatch }, authData) {
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
          dispatch('setAuthData', {
            idToken: response.data.idToken,
            expiresIn: response.data.expiresIn,
            refreshToken: response.data.refreshToken,
          });
          router.push('/')
        });
    },
    setAuthData({ commit, dispatch }, authData) {
      const now = new Date();
      const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
      commit('updateIdToken', authData.id_Token);
      localStorage.setItem('idToken', authData.idToken);
      localStorage.setItem('expiryTimeMs', expiryTimeMs);
      localStorage.setItem('refreshToken', authData.refreshToken);
      setTimeout(() => {
        dispatch('refreshIdToken', authData.refreshToken)
      }, authData.expiresIn * 1000);
    }
  }
});
