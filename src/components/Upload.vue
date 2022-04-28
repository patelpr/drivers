<template>
    <v-sheet class="text-center" height="200px">
      <input
        type="file"
        @change="fileInput"
        accept="image/*"
        capture="camera"
      />
    </v-sheet>
</template>

<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>

<script>
export default {
  data() {
    return { image: "" };
  },
  methods: {
    fileInput(e) {
      console.log(e);
    },
  },
};
</script>