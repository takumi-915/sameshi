import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import store from './store/store';
import firebase from "./firebase/firebase"

Vue.config.productionTip = false

axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/sameshi-b785e/databases/(default)/documents";

new Vue({
  vuetify,
  router,
  store,
  firebase,
  render: h => h(App)
}).$mount('#app')
