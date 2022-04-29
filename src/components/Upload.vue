<template>
  <v-easy-camera ref="camera" fullscreen v-on:input="fileInput" v-model="image"></v-easy-camera>
</template>


<script>
import EasyCamera from "easy-vue-camera";

export default {
  components: {
    "v-easy-camera": EasyCamera,
  },
  data() {
    return { image: "" };
  },
  mounted() {
    this.$refs.camera.start();
  },
  methods: {
    fileInput(e) {
      console.log(e);
    },
  },
};
</script>