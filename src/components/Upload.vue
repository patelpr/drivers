<template>
  <v-sheet inset>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col
          ><v-file-input
            type="file"
            label="Upload"
            @change="fileInput"
            filled
            accept="image/*"
            capture
          ></v-file-input
        ></v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>


<script>
import { mapActions } from "vuex";

export default {
  data() {
    return { data: "fuel", driver: null, user: null, load: null };
  },
  methods: {
    ...mapActions({
      upload: "uploadToStorage",
    }),
    // urltoFile(url, filename, mimeType) {
    //   return fetch(url)
    //     .then((res) => res.arrayBuffer())
    //     .then((buf) => new File([buf], filename, { type: mimeType }));
    // },
    fileInput(e) {
      this.$store.dispatch("uploadToStorage", { file: e, data: "file" });
    },
  },
};
</script>