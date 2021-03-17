<template>
  <div>
    <header>
      <nav class="headerLink-left">
        <router-link to="/" class="headerLink-left-text">サ飯log</router-link>
      </nav>
      <nav class="headerLink-right" v-if="!isAutenticated">
        <router-link to="/login" class="headerLink-right-text"
          >ログイン</router-link
        >
        <router-link to="/signup" class="headerLink-right-text"
          >新規登録</router-link
        >
      </nav>
      <nav class="headerLink-right" v-if="isAutenticated">
        <nav>ここにユーザーネームを入れる</nav>
        <nav class="headerLink-right-text" @click="logout">ログアウト</nav>
      </nav>
    </header>
    <img src="../public/サウナ.jpg" class="headerImage" />

    <router-view></router-view>

    <footer>
      <p>footer</p>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isAutenticated() {
      return this.$store.getters.idToken !== null;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: orange;
}
.headerImage {
  width: 100%;
  height: 300px;
  object-fit: cover;
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
}
footer {
  height: 200px;
  background-color: orchid;
}
</style>
