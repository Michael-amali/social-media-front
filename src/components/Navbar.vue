<template>
  <div class="mt-16">
    <!-- Navbar -->
    <v-app-bar color="blue-grey darken-2" flat dense dark height="65" fixed app>
      <v-app-bar-nav-icon
        @click="mini = !mini"
        v-show="$vuetify.breakpoint.smAndDown"
      ></v-app-bar-nav-icon>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="30"
      />

      <v-toolbar-title
        @click="goToHome"
        class="cursor-pointer"
        v-show="$vuetify.breakpoint.mdAndUp"
        >Legends</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-row class="ml-1">
        <v-col cols="12">
          <v-autocomplete
            v-model="model"
            :items="itemsItems"
            :loading="isLoading"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            item-text="Username"
            item-value="API"
            label="Search by username"
            placeholder="Start typing to Search"
            return-object
            ref="users"
            single-line
            hide-details
            rounded
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>

      <v-btn icon class="hidden-sm-and-down" @click="goToMessenger()">
        <v-icon>mdi-email-outline</v-icon>
      </v-btn>
      <v-menu left bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="mr-4">
            <v-badge right color="red" class="" offset-x="15" offset-y="10">
              <span slot="badge">{{
                updatedNotifications &&
                updatedNotifications[0] &&
                updatedNotifications[0].length
              }}</span>
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list
          v-if="
            updatedNotifications &&
            updatedNotifications[0] &&
            updatedNotifications[0].length > 0
          "
        >
          <v-list-item v-for="(n, idx) in updatedNotifications[0]" :key="idx">
            <v-list-item-title>
              {{ n.senderName }} sent a message</v-list-item-title
            >
          </v-list-item>
          <v-list-item class="d-flex justify-center">
            <v-btn color="primary darken-1" @click="resetNotifications"
              >Mark as read</v-btn
            >
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item>
            <v-list-item-title>No new messages</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu left bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="40">
              <img
                :src="
                  currentUserInStore.profilePicture
                    ? currentUserInStore.profilePicture
                    : profileImage
                "
                alt=""
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

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
      :mini-variant.sync="mini"
      permanent
      color="blue-grey darken-2"
      dark
    >
      <v-list-item></v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          class="my-6"
          @click="navigationDrawer(item)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="subtitle-1">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from "axios";
import { logoutUser } from "../services/auth";
import { BASE_URL } from "../../env.js";

export default {
  name: "Navbar",
  components: {},
  props: ["socket", "notifications"],

  data() {
    return {
      drawer: null,
      items: [
        { title: "Feed", icon: "mdi-home-outline", link: "/" },
        { title: "Message", icon: "mdi-email", link: "/messenger" },
        {
          title: "Profile",
          icon: "mdi-account",
          link: `profile/${this.username}/${this.userId}`,
        },
        { title: "Logout", icon: "mdi-power", link: "/login" },
        { title: "Settings", icon: "mdi-cog-outline", link: "/settings" },
        { title: "Notification", icon: "mdi-bell-outline" },
      ],
      mini: this.drawerShow(),
      menuList: [{ title: "Profile" }, { title: "Log Out" }],

      username: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
      singleUser: {},
      profileImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",

      users: [],
      usernameLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,

      updatedNotifications: this.notifications,
    };
  },
  methods: {
    drawerShow() {
      if (this.$vuetify.breakpoint.md) {
        this.mini = true;
      } else if (this.$vuetify.breakpoint.sm) {
        this.mini = false;
      } else if (this.$vuetify.breakpoint.xs) {
        this.mini = true;
      }
    },

    goToHome() {
      this.$router.push("/");
    },

    goToProfile() {
      this.$router.push(
        `/profile/${this.currentUserInStore.username}/${this.currentUserInStore._id}`
      );
    },

    goToSettings() {
      this.$router.push("/settings");
    },

    goToMessenger() {
      this.$router.push("/messenger");
      location.reload();
    },
    popUpDrawer(item) {
      if (item.title === "Log Out") {
        this.logOut();
      } else if (item.title === "Profile") {
        this.goToProfile();
        location.reload();
      }
    },

    navigationDrawer(item) {
      if (item.title === "Feed") {
        this.goToHome();
      } else if (item.title === "Message") {
        this.goToMessenger();
        location.reload();
      } else if (item.title === "Profile") {
        this.goToProfile();
        location.reload();
      } else if (item.title === "Logout") {
        this.logOut();
        location.reload();
      } else if (item.title === "Settings") {
        this.goToSettings();
      } else if (item.title === "Notification") {
        this.goToProfile();
      }
    },

    logOut() {
      logoutUser();
      localStorage.clear();
      axios
        .get(`${BASE_URL}/api/auth/logout`, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
      this.$router.push("/login");
    },

    getSingleUser() {
      axios
        .get(
          `${BASE_URL}/api/users/find?userId=${this.userId}&username=${this.username}`
        )
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.singleUser = { ...res.data };
          }
        })
        .catch((err) => console.log(err));
    },

    goToSearchedUserProfile() {
      this.$router.push(
        `/profile/${this.fields[1].value}/${this.fields[0].value}`
      );
      // this.$router.go()
    },

    getNotificationFromSocket() {
      this.socket.on("getNotification", (data) => {
        // check if notification exits, if not push
        let found = this.updatedNotifications[0].find((n) => {
          return n.senderId === data.senderId;
        });
        if (!found) {
          this.updatedNotifications[0].push(data);
        }
      });
    },

    resetNotifications() {
      axios
        .delete(`${BASE_URL}/api/notifications/${this.userId}`)
        .then((res) => {
          // Clearing all notifications from frontend
          this.updatedNotifications[0]
            .filter((n) => n.receiverId === this.userId)
            .forEach((n) =>
              this.updatedNotifications[0].splice(
                this.updatedNotifications[0].indexOf(n),
                1
              )
            );
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },

    clearOneNotification(senderId) {
      this.updatedNotifications = this.updatedNotifications.filter((n) => {
        return n.senderId !== senderId;
      });
    },
  },

  computed: {
    currentUserInStore() {
      return this.$store.state.currentUser;
    },

    fields() {
      if (!this.model) return [];

      // 3 When a user selects from the list, it generates an array of objects of the user details,
      // (i.e. this.fields = [{_id: 'sdfwe'}, {username: 'myk'}, ...] )
      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "",
        };
      });
    },

    // 2 When the entries is set, it displays the list using the attribute(i.e. username) you specified
    itemsItems() {
      return this.entries.map((entry) => {
        const Username =
          entry.username.length > this.usernameLimit
            ? entry.username.slice(0, this.usernameLimit) + "..."
            : entry.username;

        return Object.assign({}, entry, { Username });
      });
    },
  },
  watch: {
    // 1 When a user types, it fetches data and sets the entries
    search() {
      // Items have already been loaded
      if (this.itemsItems.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      axios
        .get(`${BASE_URL}/api/users/`)
        .then((res) => {
          this.entries = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },

  mounted() {
    this.drawerShow();

    // When there's a change in this.fields, it calls the goToSearchedUserProfile() function
    this.$watch(
      "fields",
      function () {
        console.log("a thing changed");
        this.goToSearchedUserProfile();
      },
      { deep: true }
    );

    this.$watch(
      "socket",
      function () {
        this.getNotificationFromSocket();
      },
      { deep: true }
    );

    this.$watch(
      "updatedNotifications",
      function () {
        console.log(this.updatedNotifications[0], "UPDATED");
      },
      { deep: true }
    );
  },

  // computed: {
  //   currentUserInStore() {
  //     return this.$store.state.currentUser;
  //   },
  // },
};
</script>

<style scoped>
.cursor-pointer:hover {
  cursor: pointer;
}
</style>
