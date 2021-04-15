<template>
  <v-app style="background-color: #eee">
    <div style="margin-top: 10%">
      <v-card
        :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
        class="mx-auto fill-width"
        flat
        max-width="640"
      >
        <v-card-title class="text-center pa-8">
          <h4 class="fill-width">会員情報入力</h4>
        </v-card-title>
        <v-divider></v-divider>
        <div class="px-6 py-8">
          <div style="max-width: 344px" class="mx-auto">
            <div>
              <v-btn
                class="fill-width text-capitalize caption"
                height="48px"
                outlined
                style="border-color: #979797"
                tile
              >
                <img
                  class="button-logo-img mr-4"
                  src="https://madeby.google.com/static/images/google_g_logo.svg"
                  style="height: 24px"
                />
                Googleで登録
              </v-btn>
              <v-btn
                class="fill-width mt-5 text-capitalize caption"
                color="#00acee"
                dark
                depressed
                height="48px"
                tile
              >
                <img class="button-logo-img mr-4" style="height: 24px" />
                Twitterで登録
              </v-btn>
            </div>
            <div class="separator separator_login_page">
              <div class="middle_separator">または</div>
            </div>
            <div class="pt-6">
              <div>
                <v-text-field
                  autofocus
                  dense
                  height="48px"
                  outlined
                  placeholder="ユーザー名"
                  id="name"
                  type="text"
                  v-model="name"
                ></v-text-field>
                <v-text-field
                  autofocus
                  dense
                  height="48px"
                  outlined
                  placeholder="メールアドレス"
                  id="email"
                  type="email"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  dense
                  height="48px"
                  name="input-password"
                  outlined
                  placeholder="パスワード"
                  @click:append="passwordShow = !passwordShow"
                  id="password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </div>
              <div class="login-btn pb-8">
                <v-btn
                  class="fill-width caption"
                  color="#FFCB00"
                  depressed
                  height="48px"
                  tile
                  @click="signUp"
                >
                  会員登録
                </v-btn>
              </div>
              <v-divider></v-divider>
              <div class="pt-8 pb-4">
                <span>すでにアカウントをお持ちですか？</span><br />
                <router-link to="/login">ログインに移動</router-link>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </v-app>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
// import axios from "../axios-auth";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    toTop() {
      this.$router.push("/");
    },
    signUp() {
      this.$store.dispatch("signUp", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      this.name = "";
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
.fill-width {
  text-align: center;
  width: 100%;
}
.separator {
  margin-top: 30px;
  margin-bottom: 30px;
  height: 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #fff;
  position: relative;
}
.middle_separator {
  position: absolute;
  padding: 0 16px;
  color: #ccc;
  background: #fff;
  font-size: 11px;
  text-shadow: 0 1px 0 #fff;
  text-transform: uppercase;
  top: -7px;
  left: 30%;
}
.middle_separator {
  color: #777;
  font-size: 13px;
  top: -9px;
  left: 41%;
}
</style>
