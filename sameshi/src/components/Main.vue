<template>
  <v-app class="main" style="background-color: rgb(251, 251, 251)">
    <h1 class="mainIntroduction">あなたの「サ飯」教えてください</h1>
    <h2 class="introduction">
      サ飯とは？<br />〜 サウナで「ととのった」後に食べるご飯 〜
    </h2>
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
        v-for="(post, index) in displayPosts"
        :key="post.id"
        class="card"
        :id="'id-' + index"
      >
        <v-card class="mx-auto" max-width="344">
          <v-img
            src="https://photock.jp/photo/middle/photo0000-2657.jpg"
            height="200px"
          ></v-img>
          <v-card-title>{{ post.fields.menu.stringValue }}</v-card-title>
          <v-card-subtitle>{{
            post.fields.restaurant.stringValue
          }}</v-card-subtitle>
          <v-btn
            v-if="isAutenticated"
            class="button_link"
            color="#EF5350"
            style="color: white; margin: 2% 0 0 6%"
            @click="deletePost(post.id)"
            >削除する</v-btn
          >
          <v-container style="display: flex; justify-content: space-between">
            <v-card-actions>
              <v-row justify="space-around">
                <v-col cols="auto">
                  <v-dialog transition="dialog-top-transition" max-width="600">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="#90A4AE"
                        v-bind="attrs"
                        v-on="on"
                        style="color: #ffffff"
                        >詳しい情報を見る</v-btn
                      >
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar color="#ff8f00" dark>{{
                          post.fields.restaurant.stringValue
                        }}</v-toolbar>
                        <v-card-text>
                          <h4 class="detail">店舗基本情報</h4>
                          <table
                            class="c-table c-table--form rstinfo-table__table"
                          >
                            <tbody>
                              <tr>
                                <th>店名</th>
                                <td>〇〇店</td>
                              </tr>
                              <tr>
                                <th>メニュー名</th>
                                <td>〇〇定食</td>
                              </tr>
                              <tr>
                                <th>価格（税込み）</th>
                                <td>〇〇円</td>
                              </tr>
                              <tr>
                                <th>評価</th>
                                <td>☆〇点</td>
                              </tr>
                              <tr>
                                <th>感想</th>
                                <td>美味しかった</td>
                              </tr>
                              <tr>
                                <th>近隣サウナ</th>
                                <td>北欧</td>
                              </tr>
                            </tbody>
                          </table>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn text @click="dialog.value = false"
                            >閉じる</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-col>
              </v-row>
              <v-spacer></v-spacer>
              <!-- <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn> -->
            </v-card-actions>
            <div class="btn_area">
              <div>
                <button
                  v-if="!likedFlg"
                  @click="addLikeUsr()"
                  class="btn like-btn"
                >
                  <i class="fa fa-fw fa-thumbs-up"></i>
                </button>
                <button
                  v-if="likedFlg"
                  @click="delLikeUsr()"
                  class="btn like-btn"
                >
                  <i class="fa fa-fw fa-check"></i>
                </button>
                <span class="like-count">{{ likeSum }}いいね</span>
              </div>
            </div>
          </v-container>
          <!-- <v-expand-transition>
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
          </v-expand-transition> -->
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      :length="length"
      style="margin-bottom: 4%"
      @input="pageChange"
    ></v-pagination>
    <div>
      <google-map />
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import firebase from "../firebase/firebase";
import GoogleMap from "./GoogleMap.vue";
import { mapGetters } from "vuex";

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
var db = firebase.firestore();
export default {
  data() {
    return {
      posts: [],
      show: false,
      page: 1,
      displayPosts: [],
      pageSize: 9,
      length: 0,
      likeSum: 0,
    };
  },
  computed: {
    isAutenticated() {
      return this.$store.getters.idToken !== null;
    },
    ...mapGetters(["userName"]),
  },
  components: {
    GoogleMap,
  },
  // computed: {
  //   idToken() {
  //     return this.$store.getters.idToken;
  //   },
  // },
  methods: {
    // deletePost() {
    //   axios.delete("/posts/{postsID}").then(() => {
    //     console.log("Document successfully deleted!");
    //   });
    // },
    deletePost(id) {
      if (!confirm("コメントを削除してよろしいですか？")) {
        return;
      }
      db.collection("posts").doc(id).delete();
    },
    pageChange: function (pageNumber) {
      this.displayPosts = this.posts.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
  },
  created() {
    // this.posts = this.$store.state.posts;
    axios.get("/posts").then((response) => {
      this.posts = response.data.documents;
      this.displayPosts = this.posts.slice(0, this.pageSize);
      this.length = Math.ceil(this.posts.length / this.pageSize);
    });
  },
};
</script>

<style scoped>
.mainIntroduction {
  text-align: center;
  margin-top: 5%;
  font-family: "Fraunces", serif;
}
.introduction {
  text-align: center;
  margin: 3% 0;
  font-family: "Fraunces", serif;
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
  margin: 5% 2% 3% 2%;
}
.card {
  width: 37%;
}
.mx-auto {
  margin: 10% 0;
}
.detail {
  margin: 40px 0 30px 0;
  padding-left: 10px;
  border-left: solid 3px #fa0;
  color: #13131e;
  font-weight: bold;
  font-size: 1.4rem;
}
.c-table.c-table--form {
  border-collapse: separate;
  border-top: 1px solid #d6ceb4;
}
.c-table.c-table--form tbody tr th {
  border-top: 1px solid #fff;
  border-bottom: 1px solid #d6ceb4;
  background-color: #faf8f5;
  font-size: 13px;
  text-align: left;
}
.rstinfo-table__table {
  margin-bottom: 25px;
  line-height: 0.3;
  font-size: 1rem;
}
.rstinfo-table__table > tbody > tr > td {
  padding: 15px 0 15px 20px;
  vertical-align: middle;
}
.rstinfo-table__table > tbody > tr > th {
  padding: 20px;
  color: #463f2d;
  vertical-align: top;
  width: 14rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.c-table {
  border-collapse: collapse;
  width: 100%;
  background-color: #fff;
}
table {
  border-spacing: 0;
  border-collapse: separate;
  word-break: break-all;
  empty-cells: show;
}
.c-table tbody tr td {
  border-bottom: 1px solid #d6ceb4;
  vertical-align: inherit;
  padding: 1rem;
}
.container_area {
  width: 300px;
  margin-top: 50px;
  padding: 20px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}
.btn_area {
  margin-top: 3%;
}
.like-btn {
  font-size: 20px;
  color: #55c500;
  background-color: #fff;
  border: 2px solid #55c500;
  border-radius: 90%;
  outline: none;
}
.like-count {
  color: #55c500;
  margin-left: 5px;
}
.border-double {
  border: double 10px dimgray;
}
</style>
