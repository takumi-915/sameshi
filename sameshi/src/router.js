import Vue from 'vue'
import Router from 'vue-router';
import Main from "./components/Main.vue";
import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import Post from "./views/Post.vue";
import store from './store/store';
import postDone from './views/postDone.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{ path: '/', component: Main }, {
    path: '/login', component: Login, beforeEnter(to, from, next) {
      if (store.getters.idToken) {
        next('/');
      } else {
        next();
      }
    }
  }, {
    path: '/signup', component: SignUp, beforeEnter(to, from, next) {
      if (store.getters.idToken) {
        next('/');
      } else {
        next();
      }
    }
  }, {
    path: '/post', component: Post
    // , beforeEnter(to, from, next) {
    //   if (store.getters.idToken) {
    //     next();
    //   } else {
    //     next('/login');
    //   }
    // }
  },
  { path: '/postDone', component: postDone },]
});
