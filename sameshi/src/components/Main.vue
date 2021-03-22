<template>
  <v-app class="main" style="background-color: #eceff1">
    <h2 class="introduction">
      サ飯とは？<br />- サウナで「ととのった」後に食べるご飯 -
    </h2>
    <div class="button">
      <router-link to="/post" class="postLink"
        ><v-btn depressed elevation="6" large color="#00B0FF" class="postButton"
          ><span class="btnText">投稿する</span></v-btn
        >
      </router-link>
    </div>
    <v-row style="height: auto" align-content="center" class="contents">
      <v-col cols="4" v-for="post in posts" :key="post.id" class="card">
        <v-card class="mx-auto" max-width="344">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>
          <v-card-title>{{ post.fields.menu.stringValue }}</v-card-title>
          <v-card-subtitle>{{
            post.fields.restaurant.stringValue
          }}</v-card-subtitle>
          <v-card-actions>
            <v-btn color="orange lighten-2" text>地図を見る</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>
                詳細：{{ post.fields.detail.stringValue }}<br />
                サウナ：{{ post.fields.sauna.stringValue }}
                <v-btn class="button_link" @click="deletePost(post)"
                  >削除する</v-btn
                >
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
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
      show: false,
    };
  },
  // computed: {
  //   idToken() {
  //     return this.$store.getters.idToken;
  //   },
  // },
  methods: {
    deletePost(post) {
      // 追加
      // this.$store.dispatch("deletePost", post);
      console.log(post);
    },
  },
  created() {
    axios.get("/posts").then((response) => {
      this.posts = response.data.documents;
    });
  },
};
</script>

<style scoped>
.main {
  background-color: #eceff1;
}
.introduction {
  text-align: center;
  margin: 3% 0;
}
.button {
  width: 100%;
  text-align: center;
  padding: 2% 2% 0 2%;
}
.postButton {
  height: 50px;
  width: 30%;
}
.postLink {
  text-decoration: none;
}
.btnText {
  color: #ffffff;
}
.contents {
  margin: 5% 2% 10% 2%;
}
.card {
  width: 37%;
}

.mx-auto {
  margin: 10% 0;
}
</style>
