<template>
  <div class="pa-2">
    <v-layout>
      <v-card height="300" width="100%">
        <v-img
          height="300"
          lazy-src="https://images.pexels.com/photos/10196058/pexels-photo-10196058.jpeg?cs=srgb&dl=pexels-imad-clicks-10196058.jpg&fm=jpg"
          src="https://images.pexels.com/photos/10196058/pexels-photo-10196058.jpeg?cs=srgb&dl=pexels-imad-clicks-10196058.jpg&fm=jpg"
          alt="John"
        ></v-img>
      </v-card>
    </v-layout>
    <v-layout class="mt-4 subtitle-2 grey--text">
      Uzir is a freelance developer based in Cedar Rapids IA, Always interested
      in learning about new Technologies and projects!
      <br />
      <br />Moved to the US 7 years ago for college and now working as a full
      time software developer and helping people reach their goals through
      entrepreneurship!
    </v-layout>
    <v-layout class="mt-5">
      <v-flex>
        <div class="subtitle-2">Locations</div>
        <div class="subtitle-2 grey--text">Based in Cedar Rapids, IA.</div>
      </v-flex>
    </v-layout>
    <v-layout class="mt-5">
      <v-flex>
        <div class="subtitle-2">Profession</div>
        <div class="subtitle-2 grey--text">Developer</div>
      </v-flex>
    </v-layout>

    <!-- friends -->
    <div>
      <div class="title mt-8">Online Friends</div>
      <div class="py-5">
        <span class="mr-4">
          <v-badge bordered right color="green" offset-x="15" offset-y="15">
            <v-avatar size="50">
<v-img src="https://cdn.vuetifyjs.com/images/lists/3.jpg"></v-img>
            </v-avatar> </v-badge
        ></span>
        <span class="subtitle-1">Pamela Kim </span>
      </div>
      <div>
        <span class="mr-4">
          <v-badge bordered right color="green" offset-x="15" offset-y="15">
            <v-avatar size="50">
              <v-img src="https://cdn.vuetifyjs.com/images/lists/5.jpg"></v-img>
            </v-avatar> </v-badge></span
        ><span class="subtitle-1">Rema Newton</span>
      </div>
      <div class="py-5">
        <span class="mr-4">
          <v-badge bordered right color="green" offset-x="15" offset-y="15">
            <v-avatar size="50">
              <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
            </v-avatar> </v-badge></span
        ><span class="subtitle-1">Victony </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      friendsList: [],
    };
  },
};
</script>

<style></style>
