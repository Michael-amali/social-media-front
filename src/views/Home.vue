<template>
  <div>
    <Navbar />
    <v-row>
      <v-col xs="12" sm="8" md="7">
        <PostSection />
      </v-col>
      <v-col xs="12" sm="4" md="5">
        <RightSidebar />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RightSidebar from "../components/RightSidebar.vue";
import PostSection from "../components/PostSection.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",

  components: { RightSidebar, PostSection, Navbar },
  data() {
    return {};
  },
  methods: {},
};
</script>
