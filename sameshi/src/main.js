import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import store from './store/store';

Vue.config.productionTip = false
axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/sameshi-b785e/databases/(default)/documents";

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
