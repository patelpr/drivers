<template>
  <div>
    <v-main>
      <Map :load="load" />
      <v-bottom-sheet inset v-if="value > 1">
        <Upload v-if="value == 1" />
        <Info v-if="value == 2" :load="load" />
        <Map v-if="value == 3" :load="load" />
      </v-bottom-sheet>
    </v-main>
    <Login v-if="!user" />
    <v-bottom-navigation v-model="value" dark fixed bottom>
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
        <span>Image</span>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import Login from "./components/Login.vue";
import Upload from "./components/Upload.vue";
import Info from "./components/Info.vue";
import firebase from "firebase";
export default {
  data: () => ({
    value: 0,
    user: null,
    driver: null,
    load: null,
  }),
  components: {
    Map,
    Login,
    Upload,
    Info,
  },
  methods: {
    async getLoad(carrier, id) {
      console.log(this.driver);
      await firebase
        .firestore()
        .collection("users")
        .doc(carrier)
        .collection("loads")
        .where("driver", "==", id)
        .onSnapshot((doc) => doc.forEach((nd) => (this.load = nd.data())));
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      firebase
        .firestore()
        .collection("drivers")
        .where("email", "==", user.email)
        .onSnapshot((doc) => {
          doc.forEach((nd) => {
            if (nd.exists) {
              this.driver = nd.data();
              this.user = user;
              this.getLoad(nd.data().carrier, nd.data().id);
            } else {
              this.user = null;
              this.driver = null;
              firebase.auth().signOut();
            }
          });
        });
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
