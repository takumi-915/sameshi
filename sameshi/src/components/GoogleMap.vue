<template>
  <v-app style="background-color: rgb(251, 251, 251)">
    <div>
      <h1 style="text-align: center">気になったお店の場所を検索！</h1>
      <v-text-field
        v-model="address"
        solo
        label="店名を入力"
        prepend-inner-icon="mdi-magnify"
        style="padding: 28%"
        class="py-2"
        @keydown.enter="search"
      />
      <div ref="map" class="map"></div>
    </div>
    <footer>
      <v-card-title class="text-center pa-130">
        <h5 class="footerTitle">© 2021 サ飯Log</h5>
      </v-card-title>
    </footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      map: "",
      marker: null,
      geocoder: {},
      address: "",
    };
  },
  mounted() {
    let timer = setInterval(() => {
      if (window.google) {
        clearInterval(timer);
        this.map = new window.google.maps.Map(this.$refs.map, {
          center: { lat: 35.658517, lng: 139.745493 },
          zoom: 8,
        });
        this.geocoder = new window.google.maps.Geocoder();
      }
    }, 500);
    // this.map = new google.maps.Map(document.getElementById("map"));
    // this.geocoder = new google.maps.Geocoder();
  },
  methods: {
    search() {
      this.geocoder.geocode(
        {
          address: this.address,
        },
        (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            this.map.setCenter(results[0].geometry.location);
            // 緯度経度の取得
            // results[0].geometry.location.lat();
            // results[0].geometry.location.lng();
            this.marker = new window.google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location,
            });
            this.map.setZoom(12);
          }
        }
      );
    },
  },
};
</script>

<style scoped>
.map {
  height: 700px;
  width: 80%;
  margin: auto;
  margin-bottom: 100px;
}
footer {
  height: 70px;
  background-color: #ef6c00;
}
.footerTitle {
  width: 100%;
  text-align: left;
  color: #ffffff;
  text-align: center;
  font-family: "Fraunces", serif;
}
</style>
