<template>
  <v-app>
    <div>
      <h1 style="text-align: center">気になったお店の場所を検索！</h1>
      <v-text-field
        v-model="searchForm"
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
      }
    }, 500);
    // this.map = new google.maps.Map(document.getElementById("map"));
    // this.geocoder = new google.maps.Geocoder();
  },
  // methods: {
  //   search() {
  //     this.geocoder.geocode(
  //       {
  //         address: this.address,
  //       },
  //       (results, status) => {
  //         if (status === google.maps.GeocoderStatus.OK) {
  //           this.map.setCenter(results[0].geometry.location);
  //           // 緯度経度の取得
  //           // results[0].geometry.location.lat();
  //           // results[0].geometry.location.lng();
  //           this.marker = new google.maps.Marker({
  //             map: this.map,
  //             position: results[0].geometry.location,
  //           });
  //         }
  //       }
  //     );
  //   },
  // },
};
</script>

<style scoped>
.map {
  height: 700px;
  width: 80%;
  margin: auto;
}
</style>
