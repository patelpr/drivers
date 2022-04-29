<template>
  <div>
    <v-main>
      <Map v-if="value == 0" :carrier="driver.carrier" :id="driver.id" />
      <Upload v-if="value == 1" :id="load.id" :carrier="driver.carrier" />
      <Info v-if="value == 2" :load="load" />
      <Profile v-if="value == 3" :user="user" />
    </v-main>
    <Login v-if="!user" />
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
import Login from "./components/Login.vue";
import Profile from "./components/Profile.vue";
import Upload from "./components/Upload.vue";
import Info from "./components/Info.vue";
import firebase from "firebase";
export default {
  data: () => ({
    value: 2,
    user: null,
    driver: { carrier: null },
    load: null,
  }),
  components: {
    Map,
    Profile,
    Login,
    Upload,
    Info,
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
