<template>
    <v-navigation-drawer v-model="drawer" flat app temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="(item, i) in navigationItems" :key="i">
            <v-list-item-icon>
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="popUpDrawer(item)">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
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
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    register() {
      //   auth
      //     .createUserWithEmailAndPassword(this.signUpEmail, this.signUpPassword)
      //     .then((user) => {
      //       db.collection("profiles")
      //         .doc(user.user.uid)
      //         .set({
      //           name: this.signUpName,
      //         })
      //         .then(() => {
      //           console.log("Document successfully written!");
      //         })
      //         .catch((error) => {
      //           console.error("Error writing document: ", error);
      //         });
      //       this.credentialDialog = false;
      //       this.snackbar = true;
      //       this.upgradeValue = true;
      //       this.snackBarText = "Sign Up was successful";
      //       this.$router.push("/admin/overview");
      //       console.log(user);
      //     })
      //     .catch((error) => {
      //       var errorCode = error.code;
      //       var errorMessage = error.message;
      //       if (errorCode == "auth/weak-password") {
      //         alert("The password is too weak.");
      //       } else {
      //         alert(errorMessage);
      //       }
      //       console.log(error);
      //     });

      axios
        .post("http://localhost:5000/api/auth/register", {
          username: this.signUpName,
          email: this.signUpEmail,
          password: this.signUpPassword,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.credentialDialog = false;
            this.snackbar = true;
            this.upgradeValue = true;
            this.snackBarText = "Sign Up was successful";
            // localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("access", 6876);
            this.$router.push("/admin/overview");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login() {
      //   auth
      //     .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
      //     .then((user) => {
      //       this.credentialDialog = false;
      //       this.snackbar = true;
      //       this.upgradeValue = true;
      //       this.snackBarText = "Login was successful";
      //       this.$router.push("/admin/overview");
      //       console.log(user);
      //     })
      //     .catch(function (error) {
      //       var errorCode = error.code;
      //       var errorMessage = error.message;
      //       if (errorCode === "auth/wrong-password") {
      //         alert("Wrong password.");
      //       } else {
      //         alert(errorMessage);
      //       }
      //       console.log(error);
      //     });
      axios
        .post("http://localhost:5000/api/auth/login", {
          email: this.loginEmail,
          password: this.loginPassword,
        })
        .then((res) => {
          this.credentialDialog = false;
          this.snackbar = true;
          this.upgradeValue = true;
          this.snackBarText = "Login was successful";
          localStorage.setItem("token", res.data.accessToken);
          if (res.data.isAdmin) {
            this.$router.push("/admin/overview");
            location.reload();
          }
        });
    },
    popUpDrawer(item) {
      if (item.text == "Login") {
        this.tab = "tab-1";
        this.credentialDialog = true;
      } else if (item.text == "Sign Up") {
        this.tab = "tab-2";
        this.credentialDialog = true;
      } else if (item.text == "Cart") {
        this.$store.dispatch("changeCart", true);
      } else if (item.text == "Products") {
        this.goToProducts();
      } else if (item.text == "About") {
        this.goToAbout();
      }
    },
    goToHome() {
      this.$router.push("/");
    },
    goToAbout() {
      this.$router.push("/about");
    },
    goToProducts() {
      this.$router.push("/products");
    },
  },

  components: {},
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
