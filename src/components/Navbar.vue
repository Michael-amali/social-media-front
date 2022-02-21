<template>
  <div class="mt-16">
    <!-- Navbar -->
    <v-app-bar color="blue-grey darken-2" flat dense dark height="65" fixed>
      <v-app-bar-nav-icon
        @click="mini = !mini"
        v-show="$vuetify.breakpoint.smAndDown"
      ></v-app-bar-nav-icon>

      <v-toolbar-title @click="goToHome" class="cursor-pointer">Legend</v-toolbar-title>
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
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>

      <v-btn icon class="mr-2 hidden-sm-and-down" @click="goToMessenger()">
        <v-icon>mdi-email-outline</v-icon>
      </v-btn>
      <v-btn icon class="mr-5 hidden-sm-and-down">
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

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
          link
          :to="item.link"
          class="my-6"
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

export default {
  name: "Navbar",
  components: {},

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
        { title: "Settings", icon: "mdi-cog-outline" },
        { title: "Notification", icon: "mdi-bell-outline" },
      ],
      mini: this.drawerShow(),
      menuList: [{ title: "Profile" }, { title: "Log Out" }],

      username: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
      singleUser: {},
      profileImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",

      users: ["Afghanistan", "Albani"],
      usernameLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
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
      this.$router.push(`/profile/${this.username}/${this.userId}`);
      location.reload();
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

    logOut() {
      logoutUser();
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

    goToSearchedUserProfile(){
      this.$router.push(`/profile/${this.fields[1].value}/${this.fields[0].value}`);
      // this.$router.go()
    }
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
        .get(`http://localhost:4000/api/users/`)
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
