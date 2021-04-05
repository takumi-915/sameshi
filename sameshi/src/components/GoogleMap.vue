<template>
  <div>
    <h1>Google Map</h1>
    <div ref="map" style="height: 500px; width: 800px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: "",
    };
  },
  mounted() {
    let timer = setInterval(() => {
      if (window.google) {
        clearInterval(timer);
        this.map = new window.google.maps.Map(this.$refs.map, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
      }
    }, 500);
  },
};
</script>
