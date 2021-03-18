import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../axios-auth";
import router from '../router';
import axiosRefresh from '../axios-refresh'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null
  },
  getters: {
    idToken: state => state.idToken
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
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
            dispatch('refreshIdtoken', response.data.refreshToken)
          }, response.data.expiresIn * 1000);
          router.push('/');
        });
    },
    logout({ commit }) {
      commit('updateIdToken', null);
      router.replace('/')
    },
    refreshToken({ commit, dispatch }, refreshToken) {
      axiosRefresh.post('/token?key=AIzaSyB1OCfEstfBozmI8v1_tipkdyf9WEwL06M', { grant_type: 'refresh_token', refresh_token: refreshToken }).then(response => {
        commit('updateIdToken', response.data.id_token);
        setTimeout(() => {
          dispatch('refreshIdtToken', response.data.id_token);
        }, response.data.expires_in * 1000)
      });
    },
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
    }
  }
});
