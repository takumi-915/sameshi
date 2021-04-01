<template>
  <v-app class="body">
    <div class="main">
      <h2 class="title">あなたのサ飯を教えてください</h2>
      <v-row>
        <v-col cols="7" class="contents">
          <form>
            <v-text-field v-model="restaurant" label="店名"></v-text-field>
            <v-text-field v-model="menu" label="メニュー名"></v-text-field>
            <v-text-field v-model="price" label="価格"></v-text-field>
            <v-textarea
              v-model="detail"
              label="詳細(感想や価格など)"
            ></v-textarea>
            <img
              v-if="uploadImageUrl"
              :src="this.uploadImageUrl"
              class="imageFile"
            />
            <v-file-input
              v-model="input_image"
              type="file"
              accept="image/*"
              show-size
              label="画像ファイルをアップロードしてください"
              prepend-icon="mdi-image"
              @change="onImagePicked"
            ></v-file-input>
            <v-text-field v-model="sauna" label="近隣サウナ"></v-text-field>
            <v-btn
              depressed
              elevation="6"
              large
              color="#ef6c00"
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
// import axios from "axios";
import router from "../router";
import firebase from "firebase/app";
import "firebase/storage";
// import { mapActions } from "vuex";
import { db } from "../firebase/firebase";

export default {
  data() {
    // 画像表示
    return {
      uploadImageUrl: "",
      errorMessage: "",
      reset: true,

      // post: {},
    };
  },
  methods: {
    onImagePicked(file) {
      if (!file.type.includes("image")) {
        this.errorMessage = "画像を指定してください";
        this.inputFileReset();
        return;
      }

      const storageRef = firebase.storage().ref(file.name);
      storageRef.put(file).then(() => {
        firebase
          .storage()
          .ref(file.name)
          .getDownloadURL()
          .then((url) => {
            this.post.image = url;
          })
          .catch((err) => {
            this.errorMessage = err;
          });

        if (file !== undefined && file !== null) {
          if (file.name.lastIndexOf(".") <= 0) {
            return;
          }
          const fr = new FileReader();
          fr.readAsDataURL(file);
          fr.addEventListener("load", () => {
            this.uploadImageUrl = fr.result;
          });
        } else {
          this.uploadImageUrl = "";
        }
      });
    },

    onSubmit() {
      // this.addPost(this.post);
      // router.push("/postDone");
      // this.post = {};
      // axios
      //   .post("/posts", {
      //     fields: {
      //       restaurant: {
      //         stringValue: this.restaurant,
      //       },
      //       menu: {
      //         stringValue: this.menu,
      //       },
      //       detail: {
      //         stringValue: this.detail,
      //       },
      //       sauna: {
      //         stringValue: this.sauna,
      //       },
      //     },
      //   })
      //   .then((response) => {
      //     this.inputFileReset();
      //     console.log(response);
      //   });
      // コメントをFirestoreへ登録
      db.collection("posts").add({
        restaurant: this.restaurant,
        menu: this.menu,
        price: this.price,
        detail: this.detail,
        // input_image: this.input_image,
        sauna: this.sauna,
      });
      router.push("/postDone");
    },
    inputFileReset() {
      this.reset = false;
      this.$nextTick(function () {
        this.reset = true;
      });
    },
    // ...mapActions(["addPost"]),
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
.imageFile {
  width: 100%;
  height: 300px;
  object-fit: scale-down;
}
</style>
