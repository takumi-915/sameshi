<template>
  <div>
    <header>
      <nav>
        <router-link to="/">サ飯log</router-link>
      </nav>
      <nav>
        <router-link to="/login" class="headerLink">ログイン</router-link>
        <router-link to="/signup" class="headerLink">新規登録</router-link>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
// import Main from "./components/Main";

export default {
  name: "App",

  // components: {
  //   Main,
  // },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
header {
  width: auto;
  height: 70px;
  background-color: #f78a00a6;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
}
.headerLink {
  margin-right: 10px;
}
</style>
