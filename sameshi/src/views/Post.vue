<template>
  <v-app class="body">
    <div class="main">
      <h2 class="title">あなたのサ飯を教えてください</h2>
      <v-row>
        <v-col cols="7" class="contents">
          <form>
            <v-text-field v-model="restaurant" label="店名"></v-text-field>
            <v-text-field v-model="menu" label="メニュー"></v-text-field>
            <v-textarea
              v-model="detail"
              label="詳細(感想や価格など)"
            ></v-textarea>
            <v-text-field v-model="sauna" label="近隣サウナ"></v-text-field>
            <!-- <v-text-field v-model="image" label="画像"></v-text-field> -->
            <v-btn
              depressed
              elevation="6"
              large
              color="#00B0FF"
              class="post"
              @click="onSubmit"
              >投稿する</v-btn
            >
          </form>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  methods: {
    onSubmit() {
      axios
        .post("/posts", {
          fields: {
            restaurant: {
              stringValue: this.restaurant,
            },
            menu: {
              stringValue: this.menu,
            },
            detail: {
              stringValue: this.detail,
            },
            sauna: {
              stringValue: this.sauna,
            },
          },
        })
        .then((response) => {
          console.log(response);
        });
      router.push("/postDone");
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
}
.title {
  text-align: center;
  margin: 5% 0;
  font-weight: bold;
}
.body {
  background-color: #eceff1;
}
.contents {
  margin: 0 auto;
  background-color: #ffffff;
}
.post {
  color: #ffffff;
  height: 50px;
  width: 20%;
  margin-top: 5%;
}
</style>
