<template>
  <v-app style="background-color: rgb(251, 251, 251)">
    <div>
      <h1 class="mainIntroduction">PLACE</h1>
      <h2 class="subIntroduction">気になったお店の場所を検索！</h2>
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
            this.map.setZoom(14);
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
.mainIntroduction,
.subIntroduction {
  text-align: center;
  font-family: "Fraunces", serif;
  animation: zoomIn 4s cubic-bezier(0.25, 1, 0.5, 1) 1 forwards;
}
.mainIntroduction {
  margin-top: 5%;
  font-size: 65px;
}
.subIntroduction {
  font-size: 20px;
  color: #708090;
  margin-bottom: 1.5rem;
}
@keyframes zoomIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
