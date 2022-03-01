<template>
  <v-app>
    <v-main>
      <!-- v-bind key ensure there's reload of page-->
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { setAuthToken, setUserId } from "./services/auth";
import { BASE_URL } from "../env";

export default {
  name: "App",

  data: () => ({
    //
  }),

  methods: {
    googleSignIn() {
      axios
        .get(`${BASE_URL}/login/success`, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          setAuthToken(res.data.accessToken);
          setUserId(res.data.user._id);
          this.$store.dispatch("setCurrentUserInState", res.data.user);
          this.$store.dispatch("setIsLoggedIn", res.data);
          this.$store.dispatch("setUserId", res.data.user);
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("email", res.data.user.email);
          localStorage.setItem("username", res.data.user.username);
          localStorage.setItem("userId", res.data.user._id);
        })
        .catch((err) => console.log(err));
    },
  },

  // created() {
  //   this.$watch(
  //     () => this.$route.params,
  //     () => {
  //       this.googleSignIn();
  //     },
  //     { immediate: true }
  //   );
  // },

  created() {
    this.googleSignIn();
  },
  watch: {
    $route: "googleSignIn",
  },

  // beforeRouteEnter(to, from, next) {
  //   next((vm) => vm.googleSignIn());
  // },
};
</script>
