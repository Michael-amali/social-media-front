<template>
  <v-navigation-drawer
    color="grey lighten-5"
    floating
    class="pa-4 mt-16"
    app
    v-model="drawer"
    width="280" :permanent="$vuetify.breakpoint.mdAndUp"
  >
    <v-list nav dense class="">
      <v-list-item-group active-class="#E7596F--text">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Feed</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-compass-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Explore</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-pound</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Trending</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-check-decagram</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Top Post</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>People</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-bell-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Notification</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-send-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Direct</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-chart-pie</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Status</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",

  components: {},
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = true;
    },
  },
  methods: {},
};
</script>

<style>
.v-avatar.outlined {
  border: 2px solid #e7596f;
  background-color: transparent;
  border-radius: 50%;
  height: 100px;
  width: 100px;
}
</style>