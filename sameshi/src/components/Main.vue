<template>
  <v-app class="main">
    <div class="button">
      <router-link to="/post" class="postLink"
        ><v-btn depressed elevation="6" large color="accent" class="postButton"
          >投稿する</v-btn
        >
      </router-link>
    </div>
    <v-col cols="8">
      <div v-for="post in posts" :key="post.name">
        <div>店名：{{ post.fields.restaurant.stringValue }}</div>
        <div>メニュー：{{ post.fields.menu.stringValue }}</div>
        <div>詳細：{{ post.fields.detail.stringValue }}</div>
        <div>サウナ：{{ post.fields.sauna.stringValue }}</div>
      </div>
    </v-col>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      restaurant: [],
      menu: [],
      detail: [],
      sauna: [],
      posts: [],
    };
  },
  // computed: {
  //   idToken() {
  //     return this.$store.getters.idToken;
  //   },
  // },
  created() {
    axios.get("/posts").then((response) => {
      this.posts = response.data.documents;
    });
  },
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
