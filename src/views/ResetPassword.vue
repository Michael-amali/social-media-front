<template>
  <v-container fill-height class="backgroudImage" fluid>
    <v-row>
      <v-col>
        <v-card flat outlined max-width="500" class="mx-auto">
          <v-form ref="form" v-model="formValid" lazy-validation>
            <v-card-text>
              <v-container>
                <v-card-text class="text-center pa-0 text-h6 mb-6">
                  New Password
                </v-card-text>
                <div>
                  <v-text-field
                    label="New Password"
                    name="password"
                    :rules="passwordRules"
                    v-model="password"
                    :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="passwordShow = !passwordShow"
                    :type="passwordShow ? 'text' : 'password'"
                    color="primary"
                    outlined
                    required
                    placeholder="New Password"
                  ></v-text-field>

                  <v-btn
                    color="primary darken-1"
                    block
                    :loading="loader"
                    :disabled="!formValid"
                    class="text-capitalize"
                    @click="sendNewPassword()"
                  >
                    Submit
                  </v-btn>
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
                </div>
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
  name: "ResetPassword",

  components: {},
  data() {
    return {
      password: "",
      passwordShow: false,
      loader: false,
      loading: false,
      formValid: true,
      passwordRules: [
        (value) => !!value || "Password is required",
        // (value) => value < 5 || "Password must be valid",
      ],

      snackBarText: "",
      snackbar: false,
      snackbarColor: null,
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    sendNewPassword() {
      if (!this.$refs.form.validate()) return;
      this.loader = true;
      axios
        .put(`${BASE_URL}/api/auth/reset-password`, {
          newPass: this.password,
          resetLink: this.$route.params.token,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.loader = false;

            this.snackbarColor = true;
            this.snackBarText = `Password reset was successful`;
            this.snackbar = true;

            setTimeout(() => this.$router.push("/login"), 3000);
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
  background: url("../assets/resetPassword.jpg") center !important;
}
</style>
