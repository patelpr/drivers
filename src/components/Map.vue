<template>
  <div id="theMap">
    <v-map
      ref="myMap"
      v-if="$store.state.load"
      :bounds="
        [
          [$store.state.load.route.bbox[1], $store.state.load.route.bbox[0]],
          [$store.state.load.route.bbox[3], $store.state.load.route.bbox[2]],
        ] || [
          [38.6185221, -92.7914713],
          [33.889239, -84.226134],
        ]
      "
      style="height: 100vh; z-index: 0"
    >
      <v-tilelayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        :attribution="attribution"
      >
      </v-tilelayer>
      <v-marker
        v-if="$store.state.driver.location"
        :lat-lng="[
          $store.state.driver.location.lat,
          $store.state.driver.location.lng,
        ]"
      ></v-marker>
      <l-polyline :lat-lngs="$store.state.load.poly" lineCap lineJoin>
      </l-polyline>
    </v-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPolyline } from "vue2-leaflet";
// import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
// import H from "../assets/fastpolylines";
export default {
  data: () => ({
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
  }),
  computed: {
    ...mapGetters({
      user: "getCurrentUser",
      driver: "getCurrentDriver",
      load: "getCurrentLoad",
      location: "getDriverLocation",
      poly: "getPoly",
    }),
    // user: null,
    // load: null,
    // selectedLoad: null,
    // lat: "",
    // lng: "",
    // poly: null,
    // origin: null,
    // destination: null,
  },
  components: {
    "v-map": LMap,
    "v-tilelayer": LTileLayer,
    "v-marker": LMarker,
    "l-polyline": LPolyline,
  },
  props: {
    carrier: { type: String },
    id: { type: String },
  },
  mounted() {
    this.setDriver;
    this.setLoad;
    // firebase.auth().onAuthStateChanged((user) => (this.user = user));
    // this.startLocationUpdates();
    // this.getLoad(this.carrier, this.id);
  },
  methods: {
    ...mapActions({
      setUser: "setUser",
      setDriver: "setDriver",
      setLoad: "setLoad",
    }),

    startLocationUpdates() {
      navigator.geolocation.watchPosition(
        (position) => this.$store.dispatch("updateLocation", position),
        (error) => {
          console.log(error.message);
        }
      );
    },
  },
};
</script>

<style scoped>
@import "~leaflet/dist/leaflet.css";
</style>
