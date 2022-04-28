<template>
 <v-easy-camera
    v-model="image"></v-easy-camera>
</template>


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