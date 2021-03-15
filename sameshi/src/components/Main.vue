<template>
  <v-app class="main">
    <div class="button">
      <router-link to="/post" class="postLink"
        ><v-btn depressed elevation="6" large color="accent" class="postButton"
          >投稿する</v-btn
        >
      </router-link>
    </div>
    <h1>aaa</h1>
  </v-app>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({}),
};
</script>

<style scoped>
.button {
  width: 100%;
  text-align: center;
}
.postButton {
  width: 100px;
}
.postLink {
  text-decoration: none;
}
</style>
