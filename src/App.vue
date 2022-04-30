<template>
  <div>
    <v-main>
      <Map v-if="value == 0 && $store.state.user" />
      <Upload v-if="value == 1" />
      <Info v-if="value == 2" />
      <Profile v-if="value == 3" />
    </v-main>
    <Login v-if="!$store.state.user" />
    <v-bottom-navigation v-model="value" app dark fixed bottom>
      <v-btn @click="value = 0">
        <span>Map</span>
      </v-btn>

      <v-btn @click="value = 1">
        <span>Upload</span>
      </v-btn>

      <v-btn @click="value = 2">
        <span>Info</span>
      </v-btn>

      <v-btn @click="value = 3">
        <span>Profile</span>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import firebase from "firebase";
import Login from "./components/Login.vue";
import Profile from "./components/Profile.vue";
import Upload from "./components/Upload.vue";
import Info from "./components/Info.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    value: 0,
  }),
  computed: {
    ...mapGetters({
      user: "getCurrentUser",
      driver: "getCurrentDriver",
      load: "getCurrentLoad",
      location: "getDriverLocation",
      poly: "getPoly",
    }),
  },
  components: {
    Map,
    Profile,
    Login,
    Upload,
    Info,
  },
  methods: {
    ...mapActions({
      setUser: "setUser",
      setDriver: "setDriver",
      setLoad: "setLoad",
    }),
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      user
        ? this.$store.commit("storeUser", user)
        : this.$store.commit("storeUser", null);
      this.$store.dispatch("setDriver");
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
