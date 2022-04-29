<template>
  <div class="text-center">Profile</div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Profile",
  data: () => ({
    user: null,
  }),
  mounted() {
    firebase.auth().onAuthStateChanged((user) => (this.user = user));
  },
};
</script>

<style>
</style>