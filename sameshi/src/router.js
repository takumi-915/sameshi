import Vue from 'vue'
import Router from 'vue-router';
import Main from "./components/Main.vue";
import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{ path: '/', component: Main }, { path: '/login', component: Login }, { path: '/signup', component: SignUp }]
});
