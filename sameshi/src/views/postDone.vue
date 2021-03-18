<template>
  <v-app style="background-color: #ddd">
    <div style="margin-top: 10%">
      <v-card
        :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
        class="mx-auto fill-width"
        flat
        max-width="640"
      >
        <v-card-title class="text-center pa-10">
          <h3 class="Done">投稿が完了しました！</h3>
        </v-card-title>
        <v-card-text>
          <router-link to="/"
            ><p class="clickHome">クリックしてホームに戻る</p></router-link
          >
        </v-card-text>
        <div></div>
      </v-card>
    </div>
  </v-app>
</template>

<script>
</script>

<style scoped>
.Done {
  width: 100%;
  text-align: center;
}
.clickHome {
  width: 100%;
  text-align: center;
}
</style>
