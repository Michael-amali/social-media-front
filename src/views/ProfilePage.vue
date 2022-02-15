<template>
  <div>
    <div>
      <v-img
        :src="singleUser.coverPicture ? singleUser.coverPicture : coverImage"
        height="240"
      ></v-img>

      <div>
        <div class="d-flex justify-center mt-n16">
          <v-avatar class="outlined" size="180">
            <v-avatar size="170">
              <v-img
                :src="
                  singleUser.profilePicture
                    ? singleUser.profilePicture
                    : profileImage
                "
              />
            </v-avatar>
          </v-avatar>
        </div>
        <div class="d-flex justify-center mt-4 title">
          {{ singleUser.username ? singleUser.username : "Unknown" }}
        </div>
        <div class="d-flex justify-center">
          {{ singleUser.desc ? singleUser.desc : "Unknown" }}
        </div>
      </div>
    </div>
    <Navbar />
    <LeftSidebar />
    <v-row>
      <v-col cols="7">
        <PostSectionProfile />
      </v-col>
      <v-col cols="5">
        <div class="pa-2">
          <v-layout class="">
            <v-flex>
              <div class="title">User Information</div>
              <div>
                <span class="mr-4">City :</span
                ><span class="subtitle-1 grey--text">
                  {{ singleUser.city ? singleUser.city : "unknown" }}
                </span>
              </div>
              <div>
                <span class="mr-4">From :</span
                ><span class="subtitle-1 grey--text">{{
                  singleUser.from ? singleUser.from : "unknown"
                }}</span>
              </div>
              <div>
                <span class="mr-4">Relationship :</span
                ><span class="subtitle-1 grey--text">{{
                  singleUser.relationship ? singleUser.relationship : "unknown"
                }}</span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout class="mt-5">
            <v-flex>
              <div class="title">User friends</div>
              <v-row class="p-2">
                <v-col
                  cols="4"
                  class=""
                  v-for="friend in this.friendsList"
                  :key="friend._id"
                >
                  <v-card
                    height="150"
                    @click="goToFriendProfile(friend.username)"
                  >
                    <v-img
                      :src="
                        friend.profilePicture
                          ? friend.profilePicture
                          : profileImage
                      "
                      alt="John"
                      height="160"
                    ></v-img>
                  </v-card>
                  <div class="">
                    {{ friend.username ? friend.userId : "unkwown" }}
                  </div>
                </v-col>
              </v-row>
            </v-flex>
          </v-layout>
        </div>

        <div class="pa-2">
          <v-layout class="mt-6">
            <div class="title">JOHN DOE</div>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-layout>
                <div class="subtitle-2">882</div>
                <div class="subtitle-2 ml-1 grey--text">Photos</div>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout>
                <div class="subtitle-2">527k</div>
                <div class="subtitle-2 ml-1 grey--text">Followers</div>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout class="mt-4 subtitle-2 grey--text">
            Uzir is a freelance developer based in Cedar Rapids IA, Always
            interested in learning about new Technologies and projects!
            <br />
            <br />Moved to the US 7 years ago for college and now working as a
            full time software developer and helping people reach their goals
            through entrepreneurship!
          </v-layout>
          <v-layout class="mt-5">
            <v-flex>
              <div class="subtitle-2">Locations</div>
              <div class="subtitle-2 grey--text">
                Based in Cedar Rapids, IA.
              </div>
            </v-flex>
          </v-layout>
          <v-layout class="mt-5">
            <v-flex>
              <div class="subtitle-2">Profession</div>
              <div class="subtitle-2 grey--text">Developer</div>
            </v-flex>
          </v-layout>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LeftSidebar from "../components/LeftSidebar.vue";
import PostSectionProfile from "../components/PostSectionProfile.vue";
import Navbar from "../components/Navbar.vue";
import axios from "axios";

export default {
  name: "ProfilePage",

  components: { LeftSidebar, PostSectionProfile, Navbar },
  data() {
    return {
      singleUser: {},
      userId: localStorage.getItem("userId"),
      username: this.route.username,

      coverImage: require("../assets/blueflowers.jpeg"),
      profileImage:
        "https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      friendsList: [],
    };
  },
  methods: {
    getSingleUser() {
      axios
        .get(
          `http://localhost:4000/api/users/find?userId=${this.userId}&username=${this.username}`
        )
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.singleUser = { ...res.data };
            console.log(this.singleUser);
          }
        })
        .catch((err) => console.log(err));
    },

    getFriends() {
      axios
        .get(`http://localhost:4000/api/users/friends/${this.userId}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.friendsList = [...res.data];
            console.log(this.friendsList);
          }
        })
        .catch((err) => console.log(err));
    },
    goToFriendProfile(username) {
      this.$router.push(`/profile/${username}`);
    },
  },
  mounted() {
    this.getSingleUser();
    this.getFriends();
  },
};
</script>
