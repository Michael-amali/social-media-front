<template>
  <v-container fill-height class="backgroudImage" fluid>
    <v-row>
      <v-col>
        <v-card flat outlined max-width="600" class="mx-auto">
          <v-form ref="loginForm" v-model="loginFormValid" lazy-validation>
            <v-card-text>
              <v-container>
                <!-- <div class="d-flex justify-center mb-10">
                  <a
                    class="login-with-google-btn"
                    href="https://social-media-myk.herokuapp.com/auth/google"
                    >Sign in with Google</a
                  >
                </div> -->

                <v-card-text class="text-center pa-0 text-h6 mb-6">
                  Login with your credentials
                </v-card-text>
                <v-text-field
                  label="E-mail Address"
                  name="email"
                  :rules="loginEmailRules"
                  v-model="loginEmail"
                  type="email"
                  color="primary"
                  required
                  placeholder="Email"
                ></v-text-field>

                <v-text-field
                  label="Password"
                  name="password"
                  :rules="loginPasswordRules"
                  v-model="loginPassword"
                  :append-icon="loginPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="loginPasswordShow = !loginPasswordShow"
                  :type="loginPasswordShow ? 'text' : 'password'"
                  color="primary"
                  required
                  placeholder="Password"
                ></v-text-field>
                <v-card-text class="text-right pr-0">
                  <span
                    class="white primary--text reset cursor-pointer"
                    @click="goToForgotPassword()"
                    >Forgot your password?</span
                  >
                </v-card-text>
                <v-btn
                  color="primary darken-1"
                  block
                  :loading="loginLoader"
                  :disabled="!loginFormValid"
                  @click="login"
                >
                  LOGIN
                </v-btn>

                <v-col class="mt-3">
                  <span>Not registered yet?</span
                  ><span
                    @click="goToRegister()"
                    class="ml-2 white primary--text cursor-pointer"
                    >Register here</span
                  >
                </v-col>
              </v-container>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      timeout="4000"
      top
      center
      shaped
      :color="snackbarColor ? 'green' : 'red darken-2'"
    >
      {{ snackBarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          outlined
          fab
          v-bind="attrs"
          x-small
          color=""
          @click="snackbar = false"
        >
          <v-icon>mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import { setAuthToken, setUserId } from "../services/auth";
import { BASE_URL } from "../../env.js";

export default {
  name: "Login",

  components: {},
  data() {
    return {
      drawer: false,
      group: null,
      selectedItem: 1,
      navigationItems: [
        { title: "login", icon: "login", text: "Login" },
        { title: "signUp", icon: "kodi", text: "Sign Up" },
        { title: "product", icon: "redhat", text: "Products" },
        { title: "about", icon: "poker-chip", text: "About" },
        { title: "about", icon: "cart", text: "Cart" },
      ],
      credentialDialog: false,
      loginEmail: "",
      loginPassword: "",
      loginPasswordShow: false,
      signUpName: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpPasswordShow: false,
      message: "",
      loginLoader: false,
      loading: false,
      loginFormValid: true,
      signUpFormValid: true,
      snackBarText: "",
      snackbar: false,
      snackbarColor: null,
      nameRules: [(value) => !!value || "Username is required"],
      loginEmailRules: [
        (value) => !!value || "E-mail is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
      signUpEmailRules: [
        (value) => !!value || "E-mail is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
      loginPasswordRules: [
        (value) => !!value || "Password is required",
        // (value) => value < 5 || "Password must be valid",
      ],
      signUpPasswordRules: [
        (value) => !!value || "Password is required",
        // (value) => value > 5 || "Password must be valid",
      ],
      selectRules: [(v) => !!v || "Select a payment option"],
      messageRules: [(v) => !!v || "Message is required"],
      loginImage: require("../assets/blueflowers.jpeg"),
    };
  },

  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
    login() {
      if (!this.$refs.loginForm.validate()) return;
      this.loginLoader = true;
      axios
        .post(`${BASE_URL}/api/auth/login`, {
          email: this.loginEmail,
          password: this.loginPassword,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            setAuthToken(res.data.accessToken);
            setUserId(res.data._id);
            this.$store.dispatch("setCurrentUserInState", res.data);
            this.$store.dispatch("setIsLoggedIn", res.data);
            this.$store.dispatch("setUserId", res.data);
            /**  this.$store.commit("SET_USER_ROLE_IN_STATE", res.data);*/
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("userId", res.data._id);
            this.loginLoader = false;
            this.snackbarColor = true;
            this.snackBarText = `Login success`;
            this.snackbar = true;
            this.$router.push("/");
            location.reload();
          }
        })
        .catch((err) => {
          let errorMsg = err.response
            ? err.response.data
            : "An unexpected error occurred";
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
          this.loginLoader = false;
        });
    },

    goToForgotPassword() {
      this.$router.push("/forgot_password");
    },
  },
};
</script>

<style scoped>
.cursor-pointer:hover {
  cursor: pointer;
}

.login-with-google-btn {
  transition: background-color 0.3s, box-shadow 0.3s;

  padding: 9px 28px 9px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);

  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;

  text-decoration: none;
}

.v-application .backgroudImage {
  background: url("../assets/loginPage.jpg") center !important;
}
</style>
