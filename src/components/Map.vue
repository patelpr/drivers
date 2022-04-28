<template>
  <div id="theMap">
    <v-map
      ref="myMap"
      v-if="load"
      :bounds="
        [
          [load.route.bbox[1], load.route.bbox[0]],
          [load.route.bbox[3], load.route.bbox[2]],
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
      <v-marker :lat-lng="[lat, lng]" />
      <l-polyline :lat-lngs="poly.geometry.coordinates" lineCap lineJoin>
      </l-polyline>
    </v-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPolyline } from "vue2-leaflet";
import firebase from "firebase";
import H from "../assets/fastpolylines";
export default {
  data() {
    return {
      load: null,
      selectedLoad: null,
      lat: "",
      lng: "",
      poly: null,
      origin: null,
      destination: null,
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    };
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
    this.startLocationUpdates();
    this.getLoad(this.carrier, this.id);
  },
  methods: {
    async getLoad(carrier, id) {
      await firebase
        .firestore()
        .collection("users")
        .doc(carrier)
        .collection("loads")
        .where("driver", "==", id)
        .onSnapshot((doc) =>
          doc.forEach(
            (nd) => (
              (this.load = nd.data()),
              (this.poly = this.decode(this.load.route.geometry.coordinates))
            )
          )
        );
    },
    startLocationUpdates() {
      navigator.geolocation.watchPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        },
        (error) => {
          console.log(error.message);
        }
      );
    },

    decode(str) {
      let lines = H.decode(str);
      return {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: lines.polyline,
        },
      };
    },
  },
};
</script>

<style scoped>
@import "~leaflet/dist/leaflet.css";
</style>
