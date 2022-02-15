<template>
  <v-container fill-height>
    <v-row>
      <v-col>
        <v-card flat outlined>
          <v-row>
            <v-col><v-img :src="loginImage" height="600"></v-img></v-col>
            <v-col class="" align-self="center">
              <v-card-text>
                <v-form
                  ref="loginForm"
                  v-model="loginFormValid"
                  lazy-validation
                >
                  <v-card-text>
                    <v-container>
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
                        :append-icon="
                          loginPasswordShow ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        @click:append="loginPasswordShow = !loginPasswordShow"
                        :type="loginPasswordShow ? 'text' : 'password'"
                        color="primary"
                        required
                        placeholder="Password"
                      ></v-text-field>
                      <v-card-text class="text-right pr-0">
                        <span class="white primary--text reset"
                          >Forgot your PIN?</span
                        >
                      </v-card-text>
                      <v-btn
                        color="primary darken-1"
                        block
                        :loading="loadingBtn"
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
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

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
      tab: "tab-1",
      loginEmail: "",
      loginPassword: "",
      loginPasswordShow: false,
      signUpName: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpPasswordShow: false,
      message: "",
      loadingBtn: false,
      loading: false,
      loginFormValid: true,
      signUpFormValid: true,
      snackBarText: "",
      snackbar: false,
      upgradeValue: null,
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
      axios
        .post("http://localhost:4000/api/auth/login", {
          email: this.loginEmail,
          password: this.loginPassword,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("userId", res.data._id);
            this.$router.push("/");
            location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.cursor-pointer:hover {
  cursor: pointer;
}
</style>
