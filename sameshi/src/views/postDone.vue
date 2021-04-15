<template>
  <v-app style="background-color: #eee">
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
        <v-img
          src="https://1.bp.blogspot.com/-f3RpEHd25R4/X79cj7SEo_I/AAAAAAABce8/tPhWRoxKbOAvUNRcwqxK1YmVyKrKCNapwCNcBGAsYHQ/s400/ofuro_sauna_gaikiyoku.png"
          height="200px"
          width="200px"
          style="margin: auto"
        ></v-img>
        <v-card-text>
          <router-link to="/"
            ><p class="clickHome">ホームに戻る</p></router-link
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
