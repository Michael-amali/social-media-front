<template>
  <div>
    <Navbar />
    <LeftSidebar />
    <v-row>
      <v-col cols="7">
        <PostSection />
      </v-col>
      <v-col cols="5">
        <RightSidebar />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LeftSidebar from "../components/LeftSidebar.vue";
import RightSidebar from "../components/RightSidebar.vue";
import PostSection from "../components/PostSection.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",

  components: { LeftSidebar, RightSidebar, PostSection, Navbar },
  data() {
    return {};
  },
  methods: {},
};
</script>
