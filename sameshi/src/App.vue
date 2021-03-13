<template>
  <div>
    <header>
      <div class="headerImage">
        <nav>
          <router-link to="/" class="headerLink-left">サ飯log</router-link>
        </nav>
        <nav>
          <router-link to="/login" class="headerLink-right"
            >ログイン</router-link
          >
          <router-link to="/signup" class="headerLink-right"
            >新規登録</router-link
          >
        </nav>
      </div>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
// import Main from "./components/Main";
</script>

<style scoped>
header {
  width: 100%;
  height: 300px;
  /* display: flex;
  justify-content: space-between; */
  /* background-image: url(../public/サウナ画像.jpg);
  object-fit: cover;
  background-size: cover; */
}
.headerImage {
  width: 100%;
  height: 300px;
  background-image: url(../public/サウナ画像.jpg);
  -moz-background-size: auto 100%;
  background-size: auto 100%;
  object-fit: cover;
  display: flex;
  justify-content: space-between;
}
.headerLink-left {
  text-decoration: none;
  color: #ffffff;
}
.headerLink-right {
  margin-right: 10px;
  text-decoration: none;
  color: black;
}
</style>
