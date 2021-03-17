<template>
  <v-app>
    <div>
      <h2>あなたのサ飯を教えてください</h2>
      <v-row>
        <v-col cols="4">
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
              color="accent"
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
      axios.post("/posts", {
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
      });
      this.restaurant = "";
      this.menu = "";
      this.detail = "";
      this.sauna = "";
      router.push("/");
    },
  },
};
</script>

<style scoped>
</style>
