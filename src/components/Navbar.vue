<template>
  <div>
    <v-app-bar flat app fixed clipped-right clipped-left color="" clipped>
      <h2 @click="goToHome" class="cursor-pointer">Legends</h2>
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="search"
            append-icon="mdi-search"
            label="Search"
            single-line
            hide-details
            rounded
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>
      <v-btn
        dark
        depressed
        color="#E7596F"
        class="text-none mr-5"
        @click="goToLogin()"
      >
        <span class="mr-2">Login </span>
      </v-btn>
      <v-btn dark depressed color="#E7596F" class="text-none mr-5">
        <span class="mr-2"> Sign Up </span>
      </v-btn>
      <v-btn icon class="mr-2">
        <v-icon>mdi-email-outline</v-icon>
      </v-btn>
      <v-btn icon class="mr-5">
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

      <v-menu left bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="30">
              <img
                lazy-src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                alt="John"
              />
            </v-avatar>
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in menuList"
            :key="item.title"
            @click="popUpDrawer(item)"
          >
            <v-list-item-title> {{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Navbar",

  components: {},
  data() {
    return {
      search: null,
      menuList: [{ title: "Profile" }, { title: "Log Out" }],
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
      singleUser: {},
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    goToProfile() {
      this.$router.push(`/profile/${this.username}/${this.userId}`);
      location.reload();
    },
    goToHome() {
      this.$router.push("/");
    },
    popUpDrawer(item) {
      if (item.title === "Log Out") {
        this.logOut();
      } else if (item.title === "Profile") {
        this.goToProfile();
        location.reload();
      }
    },
    logOut() {
      localStorage.clear();
      this.$router.push("/login");
    },

    getSingleUser() {
      axios
        .get(
          `http://localhost:4000/api/users/find?userId=${this.userId}&username=${this.username}`
        )
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.singleUser = { ...res.data };
          }
        })
        .catch((err) => console.log(err));
    },
  },

  mounted() {
    this.getSingleUser();
  },
};
</script>

<style scoped>
.cursor-pointer:hover {
  cursor: pointer;
}
</style>
