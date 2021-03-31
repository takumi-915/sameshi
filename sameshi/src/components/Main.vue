<template>
  <v-app class="main" style="background-color: rgb(251, 251, 251)">
    <h1 class="mainIntroduction">あなたの「サ飯」教えてください</h1>
    <h3 class="introduction">
      サ飯とは？<br />ー サウナで「ととのった」後に食べるご飯 ー
    </h3>
    <div class="button">
      <router-link to="/post/:post_id?" class="postLink"
        ><v-btn depressed elevation="6" large color="#EF6C00" class="postButton"
          ><span class="btnText">投稿お願いします</span></v-btn
        >
      </router-link>
    </div>
    <v-row style="height: auto" align-content="center" class="contents">
      <v-col
        cols="4"
        v-for="(post, index) in posts"
        :key="post.id"
        class="card"
        :id="'id-' + index"
      >
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
            <v-row justify="space-around" style="margin-right: 44%">
              <v-col cols="auto">
                <v-dialog transition="dialog-top-transition" max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#90A4AE"
                      v-bind="attrs"
                      v-on="on"
                      style="color: #ffffff"
                      >地図を見る</v-btn
                    >
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="#ff8f00" dark>{{
                        post.fields.restaurant.stringValue
                      }}</v-toolbar>
                      <v-card-text>
                        <div class="text-h2 pa-12">ここに地図を埋め込む</div>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">閉じる</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </v-row>
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
                サウナ：{{ post.fields.sauna.stringValue }}<br />
                <v-btn
                  class="button_link"
                  color="#EF5350"
                  style="color: white; margin-top: 2%"
                  @click="deletePost(post.id)"
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
import { db } from "../firebase/firebase";

// export default {
//   name: "Main",
//   data: () => ({
//     posts: [],
//   }),
//   firestore() {
//     return {
//       // firestoreのcommentsコレクションを参照
//       posts: db.collection("posts").orderBy("createdAt"),
//     };
//   },

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
    deletePost(id) {
      db.collection("posts").doc(id).delete();
    },
  },
  created() {
    // this.posts = this.$store.state.posts;
    axios.get("/posts").then((response) => {
      this.posts = response.data.documents;
    });
  },
};
</script>

<style scoped>
.mainIntroduction {
  text-align: center;
  margin-top: 5%;
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
  height: 57px !important;
  font-size: 15px;
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
