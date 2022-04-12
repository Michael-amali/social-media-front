<template>
  <div class="settings">
    <Navbar />
    <v-container class="pa-0 pa-sm-10 pa-md-15">
      <template>
        <v-row justify="center">
          <v-expansion-panels accordion>
            <v-expansion-panel class="pa-0">
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="12" class="pb-0 title">
                    <div>Username</div>
                  </v-col>
                  <v-col cols="12" class="">
                    <div>Edit your username</div>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-divider></v-divider>
              <v-expansion-panel-content>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="7" class="px-0 px-sm-2">
                      <v-text-field
                        label="Username"
                        name="username"
                        :rules="usernameRules"
                        v-model="username"
                        type="text"
                        color="primary"
                        outlined
                        required
                        placeholder="Username"
                      ></v-text-field>
                      <v-btn
                        color="primary darken-1"
                        outlined
                        class="text-capitalize"
                        @click="updateUsername()"
                      >
                        Update username
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="12" class="pb-0 title">
                    <div>Email Address</div>
                  </v-col>
                  <v-col cols="12" class="">
                    <div>Edit your email address</div>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-divider></v-divider>
              <v-expansion-panel-content>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="7" class="px-0 px-sm-2">
                      <v-text-field
                        label="E-mail Address"
                        name="email"
                        :rules="emailRules"
                        v-model="emailValue"
                        type="email"
                        color="primary"
                        outlined
                        required
                        placeholder="Email"
                      ></v-text-field>
                      <v-btn
                        color="primary darken-1"
                        outlined
                        class="text-capitalize"
                        @click="updateUserEmail()"
                        >Update Email
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="12" class="pb-0 title">
                    <div>Password</div>
                  </v-col>
                  <v-col cols="12" class="">
                    <div>Change your password</div>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-divider></v-divider>
              <v-expansion-panel-content>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="7">
                      <v-text-field
                        label="Password"
                        name="passwordValue"
                        :rules="passwordValueRules"
                        v-model="passwordValue"
                        :append-icon="passwordValueShow ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="passwordValueShow = !passwordValueShow"
                        :type="passwordValueShow ? 'text' : 'password'"
                        color="primary"
                        outlined
                        required
                        placeholder="Password"
                      ></v-text-field>
                      <v-btn color="primary darken-1" outlined> Save </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel> -->
          </v-expansion-panels>
        </v-row>
      </template>
    </v-container>
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
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import axios from "axios";
import { BASE_URL } from "../../env.js";

export default {
  name: "Settings",

  components: { Navbar },
  data() {
    return {
      emailValue: "",
      passwordValue: "",
      username: "",
      passwordValueShow: false,
      usernameRules: [(value) => !!value || "Username is required"],
      passwordValueRules: [(value) => !!value || "Password is required"],
      emailRules: [
        (value) => !!value || "E-mail is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
      snackBarText: "",
      snackbar: false,
      snackbarColor: null,
    };
  },
  methods: {
    updateUserEmail() {
      axios
        .put(`${BASE_URL}/api/users/${this.computedCurrentUser._id}`, {
          userId: this.computedCurrentUser._id,
          email: this.emailValue,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.snackBarText = res.data.messsage;
            this.snackbar = true;
            this.snackbarColor = true;
            this.$store.dispatch("updateCurrentUserInState", res.data);
          }
        });
    },

    updateUsername() {
      axios
        .put(`${BASE_URL}/api/users/${this.computedCurrentUser._id}`, {
          userId: this.computedCurrentUser._id,
          username: this.username,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.snackBarText = res.data.message;
            this.snackbar = true;
            this.snackbarColor = true;
            // localStorage.setItem("email", this.computedCurrentUser.email);
            localStorage.setItem("username", this.username);
            this.$store.dispatch("updateCurrentUserInState", res.data);
          }
        });
    },
  },
  computed: {
    computedCurrentUser() {
      return this.$store.state.currentUser;
    },
  },
};
</script>
