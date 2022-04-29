<template>
  <v-container>
    Upload
    <v-row>
      <v-file-input
        type="file"
        @change="fileInput"
        filled
        accept="image/*"
        capture
      ></v-file-input>
    </v-row>
  </v-container>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return { data: "fuel", driver: null, user: null, load: null };
  },
  //   props: {
  //     id: {
  //       type: String,
  //     },
  //     carrier: {
  //       type: String,
  //     },
  //   },
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
      firebase
        .firestore()
        .collection("users")
        .doc(this.driver.carrier)
        .collection("loads")
        .where("driver", "==", this.driver.id)
        .onSnapshot((doc) => doc.forEach((nd) => (this.load = nd.data())));
    });
  },
  methods: {
    urltoFile(url, filename, mimeType) {
      return fetch(url)
        .then((res) => res.arrayBuffer())
        .then((buf) => new File([buf], filename, { type: mimeType }));
    },
    fileInput(e) {
      this.urltoFile(e, `${this.data}.png`, "image/png").then((file) =>
        firebase
          .storage()
          .ref()
          .child(`${this.load.id}/${this.data}.png`)
          .put(file)
      );
    },
  },
};
</script>