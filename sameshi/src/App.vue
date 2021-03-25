<template>
  <div>
    <v-app-bar :clipped-left="clipped" app style="background-color: #ff8f00">
      <v-toolbar-title class="title">
        <router-link to="/" class="headerLink-left-text">サ飯Log</router-link>
      </v-toolbar-title>
      <v-tabs hide-slider class="header-menu" style="padding-left: 30px">
        <v-tabs-slider />
        <v-tab class="header-menu-list">
          <router-link to="/" style="color: #ffffff; text-decoration: none">
            ホーム
          </router-link>
        </v-tab>
        <v-tab class="header-menu-list">
          <span style="color: #ffffff">サ飯とは</span>
        </v-tab>
      </v-tabs>
      <nav
        class="headerLink-right"
        v-if="!isAutenticated && !$store.state.googleLogin_user"
      >
        <v-btn text class="ml-4 mr-2">
          <router-link to="/login" class="headerLink-right-text"
            >ログイン</router-link
          >
        </v-btn>
        <v-btn text class="ml-4 mr-2">
          <router-link to="/signup" class="headerLink-right-text"
            >新規登録</router-link
          >
        </v-btn>
      </nav>
      <nav class="headerLink-right" v-if="isAutenticated">
        <nav>ここにユーザーネームを入れる</nav>
        <nav class="headerLink-right-text" @click="logout">ログアウト</nav>
      </nav>
      <nav class="headerLink-right" v-if="$store.state.googleLogin_user">
        <nav>{{ userName }}</nav>
        <nav class="headerLink-right-text" @click="googleLogout">
          ログアウト
        </nav>
      </nav>
    </v-app-bar>
    <img src="../public/サウナ.jpg" class="headerImage" />

    <router-view></router-view>

    <footer>
      <v-card-title class="text-center pa-130">
        <h5 class="footerTitle">© 2021 サ飯Log</h5>
      </v-card-title>
    </footer>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  computed: {
    isAutenticated() {
      return this.$store.getters.idToken !== null;
    },
    ...mapGetters(["userName"]),
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user);
      } else {
        this.deleteLoginUser();
      }
    });
  },
  methods: {
    ...mapActions(["setLoginUser", "deleteLoginUser", "googleLogout"]),
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
header {
  /* width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between; */
  background-color: #ff8f00;
}
.header-menu {
  width: 10%;
}
.title {
  color: #fff;
  font-size: 35px;
  font-family: "Fraunces", serif;
  margin-left: 10px;
}
.headerImage {
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-top: 56px;
}
.headerLink-left {
  margin: 2%;
}
.headerLink-left-text {
  color: #ffffff;
  text-decoration: none;
}
.headerLink-right {
  margin: 2%;
  display: flex;
}
.headerLink-right-text {
  text-decoration: none;
  color: #ffffff;
  padding-right: 3px;
  cursor: pointer;
  font-weight: bold;
}
footer {
  height: 70px;
  background-color: #ff8f00;
}
.footerTitle {
  width: 100%;
  text-align: left;
  color: #ffffff;
  text-align: center;
}
</style>
