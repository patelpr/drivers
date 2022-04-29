<template>
  <div>{user.photoUrl}</div>
</template>

<script>
import firebase from "firebase";

export default {
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