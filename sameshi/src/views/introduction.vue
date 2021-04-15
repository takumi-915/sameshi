<template>
  <v-app style="background-color: #eee; margin-bottom: 5%">
    <div style="margin-top: 10%">
      <v-card
        :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
        class="mx-auto fill-width"
        flat
        max-width="640"
      >
        <h2 class="introduction">
          サ飯とは<br />〜 サウナで「ととのった」後に食べるご飯 〜
        </h2>
        <v-img
          src="https://1.bp.blogspot.com/-f3RpEHd25R4/X79cj7SEo_I/AAAAAAABce8/tPhWRoxKbOAvUNRcwqxK1YmVyKrKCNapwCNcBGAsYHQ/s400/ofuro_sauna_gaikiyoku.png"
          height="200px"
          width="200px"
          style="margin: auto"
        ></v-img>
        <v-card-text>
          <h3 class="detail">なぜサウナ後はご飯を美味しく感じるのか？</h3>
          <p style="margin: 36px 0; font-size: 16px">
            結論を言うと、サウナで汗をかくことで、「塩味・甘味・酸味」が敏感になるからです。<br />
            <a
              href="https://saunology.hatenablog.com/entry/sauna-etcetera03"
              target="_blank"
              rel="noopener noreferrer"
              >こちら
            </a>
            のサイトに詳しくまとめられています。
          </p>
          <h3 class="detail">管理者がこのアプリを作ろうと思った理由</h3>
          <p style="margin-top: 36px; font-size: 16px">
            どこのサウナに行こうか迷った時、施設に関して共有するサイトは沢山あります。
            しかし、サ飯を共有サイトは見当たりませんでした。<br />
            サウナーにとっては、サウナに入って終わりではありません。<br />
            サ飯を食べるまでがルーティンの一貫なのです。<br />
            サ飯難民をサウナー同士で助け合う、そんなサイトがあればいいなと思い、作ろうと思いました。<br />
            そして、昨今猛威を振るっている新型コロナウィルスの影響で多くの飲食店が苦境に立たされていると思います。<br />
            そんな飲食店の手助けにもなれたらいいなと思っております。
          </p>
        </v-card-text>
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
.introduction {
  text-align: center;
  margin: 3% 0;
  font-family: "Fraunces", serif;
}
.detail {
  font-size: 22px;
  margin-top: 50px;
  font-weight: 700;
  line-height: 1.75;
  letter-spacing: 0.04em;
}
</style>
