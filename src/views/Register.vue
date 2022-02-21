<template>
  <v-container fill-height>
    <v-row>
      <v-col>
        <v-card flat outlined>
          <v-row>
            <v-col class="hidden-sm-and-down"><v-img :src="registerImage" height="600"></v-img></v-col>
            <v-col class="" align-self="center">
              <v-card-text>
                <v-form
                  ref="signUpForm"
                  v-model="signUpFormValid"
                  lazy-validation
                >
                  <v-card-text>
                    <v-container>
                      <v-card-text class="text-center pa-0 text-h6 mb-4">
                        Create New Account
                      </v-card-text>
                      <v-text-field
                        label="Username"
                        name="username"
                        :rules="nameRules"
                        v-model="signUpName"
                        type="text"
                        color="primary"
                        required
                        placeholder="Username"
                      ></v-text-field>
                      <v-text-field
                        label="E-mail Address"
                        name="email"
                        :rules="signUpEmailRules"
                        v-model="signUpEmail"
                        type="email"
                        color="primary"
                        required
                        placeholder="Email"
                      ></v-text-field>

                      <v-text-field
                        label="Password"
                        name="password"
                        :rules="signUpPasswordRules"
                        v-model="signUpPassword"
                        :append-icon="
                          signUpPasswordShow ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        @click:append="signUpPasswordShow = !signUpPasswordShow"
                        :type="signUpPasswordShow ? 'text' : 'password'"
                        color="primary"
                        required
                        placeholder="Password"
                      ></v-text-field>
                      <v-btn
                        color="primary darken-1"
                        block
                        :loading="loadingBtn"
                        :disabled="!loginFormValid"
                        @click="register"
                      >
                        SIGN UP
                      </v-btn>
                      <v-col class="mt-3">
                        <span>Already have an Account?</span
                        ><span
                          @click="goToLogin()"
                          class="ml-2 white primary--text cursor-pointer"
                          >Login</span
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
  name: "Register",

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
      message: "",
      loadingBtn: false,
      loading: false,
      signUpFormValid: true,
      snackBarText: "",
      loginFormValid: true,
      snackbar: false,
      upgradeValue: null,
      nameRules: [(value) => !!value || "Username is required"],
      selectRules: [(v) => !!v || "Select a payment option"],
      messageRules: [(v) => !!v || "Message is required"],
      registerImage: require("../assets/registerImag.jpeg"),
      signUpName: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpPasswordShow: false,
      signUpEmailRules: [
        (value) => !!value || "E-mail is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
      signUpPasswordRules: [
        (value) => !!value || "Password is required",
        // (value) => value > 5 || "Password must be valid",
      ],
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    register() {
      axios
        .post("http://localhost:4000/api/auth/register", {
          username: this.signUpName,
          email: this.signUpEmail,
          password: this.signUpPassword,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.$router.push("/login");
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
