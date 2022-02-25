<template>
  <div class="pa-2">
    <v-layout>
      <v-card height="300" width="100%">
        <v-img
          height="300"
          lazy-src="https://images.pexels.com/photos/10196058/pexels-photo-10196058.jpeg?cs=srgb&dl=pexels-imad-clicks-10196058.jpg&fm=jpg"
          src="https://images.pexels.com/photos/10196058/pexels-photo-10196058.jpeg?cs=srgb&dl=pexels-imad-clicks-10196058.jpg&fm=jpg"
          alt="John"
        ></v-img>
      </v-card>
    </v-layout>
    <v-layout class="mt-4 subtitle-2 grey--text">
      Uzir is a freelance developer based in Cedar Rapids IA, Always interested
      in learning about new Technologies and projects!
      <br />
      <br />Moved to the US 7 years ago for college and now working as a full
      time software developer and helping people reach their goals through
      entrepreneurship!
    </v-layout>
    <v-layout class="mt-5">
      <v-flex>
        <div class="subtitle-2">Locations</div>
        <div class="subtitle-2 grey--text">Based in Cedar Rapids, IA.</div>
      </v-flex>
    </v-layout>
    <v-layout class="mt-5">
      <v-flex>
        <div class="subtitle-2">Profession</div>
        <div class="subtitle-2 grey--text">Developer</div>
      </v-flex>
    </v-layout>

    <!-- friends -->
    <div>
      <div class="title mt-8">Online Friends</div>
      <div class="py-5">
        <span class="mr-4">
          <v-badge bordered right color="green" offset-x="15" offset-y="15">
            <v-avatar size="50">
              <v-img src="https://cdn.vuetifyjs.com/images/lists/3.jpg"></v-img>
            </v-avatar> </v-badge
        ></span>
        <span class="subtitle-1">Pamela Kim </span>
      </div>
      <div>
        <span class="mr-4">
          <v-badge bordered right color="green" offset-x="15" offset-y="15">
            <v-avatar size="50">
              <v-img src="https://cdn.vuetifyjs.com/images/lists/5.jpg"></v-img>
            </v-avatar> </v-badge></span
        ><span class="subtitle-1">Rema Newton</span>
      </div>
      <div class="py-5">
        <span class="mr-4">
          <v-badge bordered right color="green" offset-x="15" offset-y="15">
            <v-avatar size="50">
              <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
            </v-avatar> </v-badge></span
        ><span class="subtitle-1">Victony </span>
      </div>
    </div>

    <!-- All users PAGINATED   -->
    <div class="pa-2">
      <v-layout class="mt-5">
        <v-flex>
          <div class="title">All Users</div>
          <v-row class="p-2" v-if="this.updatedPagintedUsers.length > 0">
            <v-col
              cols="4"
              xs="12"
              sm="6"
              md="4"
              class=""
              v-for="user in this.updatedPagintedUsers"
              :key="user._id"
            >
              <v-card
                height="150"
                @click="goToProfilePage(user.username, user._id)"
              >
                <v-img
                  :src="
                    !!user.profilePicture ? user.profilePicture : profileImage
                  "
                  alt=""
                  height="160"
                ></v-img>
              </v-card>
              <div
                class="mt-2 font-weight-bold d-flex justify-center text-capitalize"
              >
                {{ !!user.username ? user.username : "unkwown" }}
              </div>
            </v-col>
            <v-col cols="12">
              <div class="d-flex justify-center">
                <v-btn
                  fab
                  small
                  class="ma-1"
                  elevation="2"
                  :disabled="this.page === 1"
                  @click="handlePreviousClick()"
                  ><v-icon>mdi-menu-left</v-icon></v-btn
                >
                <span class="pt-3"
                  >{{ this.page }} of {{ this.totalPages }}
                </span>
                <v-btn
                  fab
                  small
                  class="ma-1"
                  elevation="2"
                  :disabled="this.page === this.totalPages"
                  @click="handleNextClick()"
                  ><v-icon>mdi-menu-right</v-icon></v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col> No Users </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../../env.js";

export default {
  data() {
    return {
      friendsList: [],
      profileImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",

      paginatedUsers: [],
      updatedPagintedUsers: [],
      page: 1,
      limit: 3,
      totalPages: 1,
      numOfUsers: 0,

      nextClickable: true,
      previousClickable: true,
      clickedNextBoolean: false,
    };
  },
  methods: {
    goToProfilePage(username, personId) {
      this.$router.push(`/profile/${username}/${personId}`);
      location.reload();
    },
    getPaginatedUsers() {
      axios
        .get(
          `${BASE_URL}/api/users/paginate?page=${this.page}&limit=${this.limit}`
        )
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.paginatedUsers = [...res.data.paginatedData];
            this.numOfUsers = res.data.numOfUsers;
            if (this.clickedNextBoolean) {
              this.accumulateUsers(this.paginatedUsers);
            } else {
              this.updatedPagintedUsers = this.paginatedUsers;
            }

            // totalPages is sort of the limit of the number of pages required to get all the users
            this.totalPages = Math.ceil(this.numOfUsers / this.limit);
          }
        })
        .catch((err) => console.log(err));
    },

    accumulateUsers(paginatedUsers) {
      paginatedUsers.forEach((paginatedUser) => {
        let foundIndex = this.updatedPagintedUsers.findIndex(
          (updatedUser) => paginatedUser._id === updatedUser._id
        );
        if (foundIndex === -1) {
          this.updatedPagintedUsers.push(paginatedUser);
        }
      });
    },

    handlePreviousClick() {
      this.page = this.page - 1;
      this.paginatedUsers.forEach((paginatedUser) => {
        let foundIndex = this.updatedPagintedUsers.findIndex(
          (updatedUser) => paginatedUser._id === updatedUser._id
        );
        if (foundIndex !== -1) {
          this.updatedPagintedUsers.splice(foundIndex, 1);
        }
      });

      axios
        .get(
          `${BASE_URL}/api/users/paginate?page=${this.page}&limit=${this.limit}`
        )
        .then((res) => {
          this.paginatedUsers = [...res.data.paginatedData];
        })
        .catch((err) => console.log(err));
    },

    handleNextClick() {
      this.page = this.page + 1;
      this.clickedNextBoolean = true;
      this.getPaginatedUsers();
    },
  },
  mounted() {
    this.getPaginatedUsers();
  },
};
</script>

<style></style>
