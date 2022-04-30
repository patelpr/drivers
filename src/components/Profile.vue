<template>
  <div><v-btn @click="signOut">asdf</v-btn></div>
  <!-- <v-container fluid>
    <v-row>
      <v-col offset-md="2">
        <h1>Profile</h1>
        <hr class="my-4" />
      </v-col>
    </v-row>
    <v-row align-h="center">
      <v-col cols="6" md="2" class="my-4">
        <v-img-lazy
          thumbnail
          rounded="circle"
          src="https://picsum.photos/250/250/?image=33"
          alt="Image 1"
        >
        </v-img-lazy>
      </v-col>

      <v-col cols="12" md="10">
        <v-tabs content-class="mt-3" card id="app">
          <v-tab title="Info" active>
            <v-list-group>
              <v-list-group-item>
                <span class="p-1 mr-3"> <v-avatar icon="person" /></span>
                John Doe
              </v-list-group-item>
              <v-list-group-item>
                <span class="p-1 mr-3"> <v-avatar icon="phone" /></span>
                +1 123 456 7891
              </v-list-group-item>
              <v-list-group-item>
                <span class="p-1 mr-3"> <v-avatar icon="at" /></span>
                john@doe.test
              </v-list-group-item>
            </v-list-group>
            <br />
            <v-button variant="outline-danger" @click="deleteAccount">
              Delete Account
            </v-button>
          </v-tab>
          <v-tab title="Tab 2">
            <v-list-group>
              <v-list-group-item>Contents of TAB 2</v-list-group-item>
            </v-list-group>
          </v-tab>
          <v-tab title="Tab 3" lazy>
            <v-list-group>
              <v-list-group-item>Contents of TAB 3</v-list-group-item>
            </v-list-group>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container> -->
</template>

<script>
import firebase from "firebase";
export default {
  name: "Profile",
  methods: {
    signOut: () => firebase.auth().signOut(),
  },
};
</script>