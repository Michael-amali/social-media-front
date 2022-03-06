<template>
  <v-container fill-height class="backgroudImage" fluid>
    <v-row>
      <v-col>
        <v-card flat outlined max-width="500" class="mx-auto">
          <v-form ref="form" v-model="formValid" lazy-validation>
            <v-card-text>
              <v-container>
                <v-card-text class="text-center pa-0 text-h6 mb-6">
                  Reset Password
                </v-card-text>
                <div v-if="this.resetPasswordLinkSent" class="subtitle-1">
                  If we found an account associated with that email, we've sent
                  password reset instructions to the primary email address on
                  the account.
                </div>
                <div v-if="!this.resetPasswordLinkSent">
                  <v-text-field
                    label="E-mail Address"
                    name="email"
                    :rules="emailRules"
                    v-model="email"
                    type="email"
                    color="primary"
                    outlined
                    required
                    placeholder="Email"
                  ></v-text-field>

                  <v-btn
                    color="primary darken-1"
                    block
                    :loading="loader"
                    :disabled="!formValid"
                    class="text-capitalize"
                    @click="sendResetLink()"
                  >
                    Send Reset Instructions
                  </v-btn>
                </div>
                <v-col class="mt-7 px-0">
                  <div class="d-flex justify-center">
                    <span>Return to</span
                    ><span
                      @click="goToLogin()"
                      class="ml-2 white primary--text cursor-pointer"
                      >Login &nbsp;</span
                    >page
                  </div>
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
import { BASE_URL } from "../../env.js";

export default {
  name: "ForgotPassword",

  components: {},
  data() {
    return {
      email: "",
      loader: false,
      loading: false,
      formValid: true,
      emailRules: [
        (value) => !!value || "E-mail is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
      resetPasswordLinkSent: false,

      snackBarText: "",
      snackbar: false,
      snackbarColor: null,
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    sendResetLink() {
      if (!this.$refs.form.validate()) return;
      this.loader = true;
      axios
        .put(`${BASE_URL}/api/auth/forgot-password`, {
          email: this.email,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.loader = false;
            this.resetPasswordLinkSent = true;

            // this.$router.push("/login");
            // location.reload();
          }
        })
        .catch((err) => {
          let errorMsg = err.response.data;
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
          this.loader = false;
        });
    },
  },
};
</script>

<style scoped>
.cursor-pointer:hover {
  cursor: pointer;
}

.v-application .backgroudImage {
  background: url("../assets/forgotPassword.jpg") !important;
}
</style>
