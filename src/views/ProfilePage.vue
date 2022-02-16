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
        <div class="d-flex justify-center mt-4 title text-capitalize">
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
          <v-layout v-if="this.userId !== this.currentUserId">
            <v-flex class="">
              <div
                v-if="
                  this.singleUser.followers
                    ? this.singleUser.followers.includes(this.userId)
                    : ''
                "
              >
                <v-btn
                  @click="unFollowUser"
                  color="deep-purple lighten-2"
                  class="pa-3 white--text text-capitalize"
                  >Unfollow <v-icon right>mdi-plus</v-icon></v-btn
                >
              </div>
              <div v-else>
                <v-btn
                  @click="followUser"
                  color="deep-purple lighten-2"
                  class="pa-3 white--text text-capitalize"
                  >Follow<v-icon right>mdi-plus</v-icon></v-btn
                >
              </div>
            </v-flex>
          </v-layout>
          <v-layout class="mt-5">
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
              <v-row class="p-2" v-if="this.friendsList.length > 0">
                <v-col
                  cols="4"
                  class=""
                  v-for="friend in this.friendsList"
                  :key="friend._id"
                >
                  <v-card
                    height="150"
                    @click="goToFriendProfile(friend.username, friend._id)"
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
                  <div class="mt-2 font-weight-bold d-flex justify-center text-capitalize">
                    {{ friend.username ? friend.username : "unkwown" }}
                  </div>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col> No friends </v-col>
              </v-row>
            </v-flex>
          </v-layout>
        </div>

        <div class="pa-2">
          <v-layout class="mt-6">
            <div class="title text-capitalize">
              {{ singleUser ? singleUser.username : "Unknown" }}
            </div>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-layout>
                <div class="subtitle-2">{{ allPosts ? allPosts.length : 0}}</div>
                <div class="subtitle-2 ml-1 grey--text">Posts</div>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout>
                <div class="subtitle-2">
                  {{ singleUser ? singleUser.followings.length : 0 }}
                </div>
                <div class="subtitle-2 ml-1 grey--text">Followers</div>
              </v-layout>
            </v-flex>
                        <v-flex>
              <v-layout>
                <div class="subtitle-2">
                  {{ singleUser ? singleUser.followers.length : 0 }}
                </div>
                <div class="subtitle-2 ml-1 grey--text">Followings</div>
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
      username: this.$route.params.username,
      currentUserId: this.$route.params.id,

      coverImage: require("../assets/blueflowers.jpeg"),
      profileImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
      friendsList: [],
      allPosts: [],
    };
  },
  methods: {
    getSingleUser() {
      axios
        .get(`http://localhost:4000/api/users/find?username=${this.username}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.singleUser = { ...res.data };
          }
        })
        .catch((err) => console.log(err));
    },

    getFriends() {
      axios
        .get(
          `http://localhost:4000/api/users/friends/${
            this.userId === this.currentUserId
              ? this.userId
              : this.currentUserId
          }`
        )
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.friendsList = [...res.data];
          }
        })
        .catch((err) => console.log(err));
    },

    goToFriendProfile(username, personId) {
      this.$router.push(`/profile/${username}/${personId}`);
      location.reload();
    },

    followUser() {
      axios
        .put(`http://localhost:4000/api/users/${this.currentUserId}/follow`, {
          userId: this.userId,
        })
        .then((res) => {
          console.log(res);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unFollowUser() {
      axios
        .put(`http://localhost:4000/api/users/${this.currentUserId}/unfollow`, {
          userId: this.userId,
        })
        .then((res) => {
          console.log(res);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // Get all current user posts
    getAllPosts() {
      axios
        .get(
          `http://localhost:4000/api/posts/profile/${this.username}/${this.currentUserId}`
        )
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.allPosts = [...res.data];
            console.log(this.allPosts.length)
          }
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getSingleUser();
    this.getFriends();
    this.getAllPosts();
  },
};
</script>

<style scoped></style>
