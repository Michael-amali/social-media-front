<template>
  <v-container class="pl-10">
    <v-row class="d-flex justify-center">
      <v-col cols="12">
        <v-card>
          <v-card-text class="pb-0">
            <v-row>
              <v-col class="pb-0">
                <v-avatar size="40">
                  <img
                    :src="
                      singleUser.profilePicture
                        ? singleUser.profilePicture
                        : profilePic
                    "
                    alt="John"
                  />
                </v-avatar>

                <v-textarea
                  append-icon=""
                  name="input-7-1"
                  label="What's on your mind ?"
                  rows="2"
                  v-model="descriptionPost"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-file-input
              multiple
              accept="image/*"
              show-size
              ref="mediaAssetRef"
              v-model="filename"
              label="Media Uploads"
              @change="onAddFiles"
            ></v-file-input>
            <v-spacer></v-spacer>
            <v-btn
              color="deep-purple lighten-2"
              class="pa-3 white--text"
              @click="previewPost"
            >
              Share
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- PREVIEW post-->
    <v-dialog v-model="previewDialog" max-width="480">
      <v-card>
        <v-app-bar flat color="white">
          <v-avatar size="40">
            <img
              :src="
                singleUser.profilePicture
                  ? singleUser.profilePicture
                  : profilePic
              "
              alt="John"
            />
          </v-avatar>
          <v-toolbar-title class="subtitle-1 pl-2"> John Doe </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="black" icon @click="closePreviewPost(singlePost._id)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-text class="py-0">{{ singlePost.desc }}</v-card-text>
        <v-card-text class="pb-2">
          <v-img max-height="390" :src="singlePost.img"></v-img>
        </v-card-text>
        <v-card-actions>
          <div class="text-center">
            <v-btn class="mx-3" fab dark x-small color="primary" elevation="0">
              <v-icon dark>mdi-thumb-up </v-icon>
            </v-btn>
            <v-btn class="mr-3" fab dark x-small color="red" elevation="0">
              <v-icon dark> mdi-heart </v-icon>
            </v-btn>
            <span class="">0 people like it</span>
            <span class="mx-16"></span>
            <span>
              <v-btn
                outlined
                color="deep-purple"
                class="pa-3 white--text"
                @click="continueToPost(singlePost)"
              >
                continue
              </v-btn>
            </span>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- MAIN post -->
    <v-row class="d-flex justify-center">
      <v-col
        class="pb-6"
        cols="12"
        v-for="post in this.allPosts"
        :key="post._id"
      >
        <!-- friends posts -->
        <v-col class="pa-0" v-for="friend in friendsList" :key="friend._id">
          <v-col class="pa-0" v-if="post.userId === friend._id">
            <v-card>
              <v-app-bar flat color="white">
                <v-avatar size="40">
                  <img
                    :src="
                      friend.profilePicture ? friend.profilePicture : profilePic
                    "
                    alt="John"
                  />
                </v-avatar>
                <v-toolbar-title class="subtitle-1 pl-2">
                  {{ friend.username }}
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-menu left bottom offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" color="black">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="item in menuList"
                      :key="item.title"
                      @click="popUpDrawer(item, post._id)"
                    >
                      <v-list-item-title> {{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-app-bar>
              <v-card-text class="py-0">{{ post.desc }}</v-card-text>
              <v-card-text class="pb-0">
                <v-img max-height="400" :src="post.img"></v-img>
              </v-card-text>
              <v-card-actions>
                <div class="text-center">
                  <v-btn
                    :class="{
                      'mx-1': $vuetify.breakpoint.smAndDown,
                      'mx-3': $vuetify.breakpoint.mdAndUp,
                    }"
                    fab
                    dark
                    x-small
                    color="primary"
                    elevation="0"
                    @click="likePost(post)"
                  >
                    <v-icon dark>mdi-thumb-up </v-icon>
                  </v-btn>
                  <v-btn
                    class="mr-3"
                    :class="{
                      'mr-1': $vuetify.breakpoint.smAndDown,
                      'mr-3': $vuetify.breakpoint.mdAndUp,
                    }"
                    fab
                    dark
                    x-small
                    color="red"
                    elevation="0"
                  >
                    <v-icon dark> mdi-heart </v-icon>
                  </v-btn>
                  <span class="">{{ post.likes.length }} people like it</span>
                  <span class="ml-16"></span><span class="ml-16"></span>
                  <span class="ml-16 hidden-sm-and-down">Comments</span>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-col>

        <!-- Logged In user posts -->
        <v-col class="pa-0" v-if="post.userId === $store.state.userId">
          <!-- Put card within skeleton -->
          <v-skeleton-loader :loading="homeSkeleton" type="card">
            <v-card>
              <v-app-bar flat color="white">
                <v-avatar size="40">
                  <img
                    :src="
                      singleUser.profilePicture
                        ? singleUser.profilePicture
                        : profilePic
                    "
                    alt="John"
                  />
                </v-avatar>
                <v-toolbar-title class="subtitle-1 pl-2">
                  {{ singleUser.username }}
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-menu left bottom offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" color="black">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="item in menuList"
                      :key="item.title"
                      @click="popUpDrawer(item, post._id)"
                    >
                      <v-list-item-title> {{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-app-bar>
              <v-card-text class="py-0">{{ post.desc }}</v-card-text>
              <v-card-text class="pb-0">
                <v-img max-height="400" :src="post.img"></v-img>
              </v-card-text>
              <v-card-actions>
                <div class="text-center">
                  <v-btn
                    :class="{
                      'mx-1': $vuetify.breakpoint.smAndDown,
                      'mx-3': $vuetify.breakpoint.mdAndUp,
                    }"
                    fab
                    dark
                    x-small
                    color="primary"
                    elevation="0"
                    @click="likePost(post)"
                  >
                    <v-icon dark>mdi-thumb-up </v-icon>
                  </v-btn>
                  <v-btn
                    class="mr-3"
                    :class="{
                      'mr-1': $vuetify.breakpoint.smAndDown,
                      'mr-3': $vuetify.breakpoint.mdAndUp,
                    }"
                    fab
                    dark
                    x-small
                    color="red"
                    elevation="0"
                  >
                    <v-icon dark> mdi-heart </v-icon>
                  </v-btn>
                  <span class="">{{ post.likes.length }} people like it</span>
                  <span class="ml-16"></span><span class="ml-16"></span>
                  <span class="ml-16 hidden-sm-and-down">Comments</span>
                </div>
              </v-card-actions>
            </v-card>
          </v-skeleton-loader>
        </v-col>
      </v-col>
    </v-row>

    <v-overlay :value="uploadOverlay">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-overlay>
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
import { CLOUD_NAME, CLOUD_UPLOAD_PRESET } from "../../env";
import { BASE_URL } from "../../env.js";

export default {
  name: "PostSection",

  components: {},
  data() {
    return {
      mediaAsset: null,
      previewDialog: false,
      descriptionPost: "",
      homeSkeleton: true,

      files: [],
      isError: false,
      errorText: null,
      fileUrl: "",
      uploadOverlay: false,
      userId: localStorage.getItem("userId"),
      allPosts: [],
      singlePost: {},
      menuList: [{ title: "Delete" }],
      filename: null,

      profilePic:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
      singleUser: {},
      friendsList: [],
      allPostDetails: [],

      snackBarText: "",
      snackbar: false,
      snackbarColor: null,
    };
  },
  methods: {
    // Preview post method
    previewPost() {
      axios
        .post(`${BASE_URL}/api/posts/`, {
          userId: this.userId,
          desc: this.descriptionPost,
          img: this.fileUrl,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            let postId = res.data._id;
            this.getSinglePost(postId);
            this.uploadOverlay = false;
            this.previewDialog = true;
          }
        })
        .catch((err) => console.log(err));
    },

    continueToPost(post) {
      this.allPosts.unshift(post);
      this.previewDialog = false;
      this.filename = null;
      this.descriptionPost = "";
    },

    closePreviewPost(postId) {
      // Since clicking the share button push the post info to the database, if you wish not to continue we will delete it from the database
      this.deleteSinglePost(postId);
      this.filename = null;
      this.descriptionPost = "";
      this.previewDialog = false;
    },

    // Get image and upload to cloudinary method
    onAddFiles(files) {
      this.files = files;
      this.uploadOverlay = true;
      if (this.files.length > 0) {
        this.files.forEach((file) => {
          this.uploadFileToCloudinary(file).then((data) => {
            this.fileUrl = data.url;
            this.uploadOverlay = false;
          });
        });
      }
    },

    // Upload functionality method
    uploadFileToCloudinary(file) {
      return new Promise(function (resolve, reject) {
        //Ideally these to lines would be in a .env file
        const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
        const CLOUDINARY_UPLOAD_PRESET = CLOUD_UPLOAD_PRESET;

        let formData = new FormData();
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("folder", "social-media");
        formData.append("file", file);

        let request = new XMLHttpRequest();
        request.open("POST", CLOUDINARY_URL, true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        request.onreadystatechange = () => {
          // File uploaded successfully
          if (request.readyState === 4 && request.status === 200) {
            let response = JSON.parse(request.responseText);
            resolve(response);
          }

          // Not succesfull, let find our what happened
          if (request.status !== 200) {
            let response = JSON.parse(request.responseText);
            let error = response.error.message;
            alert("error, status code not 200 " + error);
            reject(error);
          }
        };

        request.onerror = (err) => {
          alert("error: " + err);
          reject(err);
        };

        request.send(formData);
      });
    },

    // Get all posts timeline
    getAllPosts() {
      axios
        .get(`${BASE_URL}/api/posts/timeline/${this.userId}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.allPosts = [...res.data];
            console.log(this.allPosts, "allPost at timeline");
            this.homeSkeleton = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getSinglePost(postId) {
      axios
        .get(`${BASE_URL}/api/posts/find/${postId}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.singlePost = { ...res.data };
            console.log(this.singlePost);
          }
        })
        .catch((err) => console.log(err));
    },

    deleteSinglePost(postId) {
      let updateAllPosts = [...this.allPosts];

      axios
        .delete(`${BASE_URL}/api/posts/${postId}/${this.userId}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            // Deleting from frontend
            updateAllPosts.forEach((post, idx, posts) => {
              if (postId === post._id) {
                posts.splice(idx, 1);
              }
            });
            this.allPosts = updateAllPosts;
            console.log("Post successfully deleted");
          }
        })
        .catch((err) => {
          let errorMsg = err.response.data;
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
        });
    },

    popUpDrawer(item, postId) {
      if (item.title === "Delete") {
        this.deleteSinglePost(postId);
      }
    },

    getSingleUser() {
      axios
        .get(
          `${BASE_URL}/api/users/find?userId=${this.userId}&username=${this.username}`
        )
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.singleUser = { ...res.data };
            console.log(this.singleUser, "singleUSER in timeline");
          }
        })
        .catch((err) => console.log(err));
    },

    // like in the backend
    likePost(post) {
      axios
        .put(`${BASE_URL}/api/posts/${post._id}/like/${this.userId}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            // update like in the frontend. So we find the specific post, if there's like we remoe and reduce else we add
            this.allPosts.forEach((singlePost) => {
              if (singlePost._id === post._id) {
                if (singlePost.likes.includes(this.userId)) {
                  singlePost.likes.length--;
                  singlePost.likes = singlePost.likes.filter(
                    (like) => like.userId !== this.userId
                  );
                } else {
                  singlePost.likes.push(this.userId);
                }
              }
            });

            console.log(res.data);
          }
        })
        .catch((err) => {
          let errorMsg = err.response.data;
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
        });
    },

    getFriends() {
      axios
        .get(`${BASE_URL}/api/users/friends/${this.userId}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.friendsList = [...res.data];
            console.log(this.friendsList, "friendlist");
          }
        })
        .catch((err) => console.log(err));
    },

    // getPostDetails() {
    //   this.allPosts.forEach((post) => {
    //     this.friendsList.forEach((friend) => {
    //       console.log(post, friend);
    //       if (friend._id === post.userId) {
    //         this.allPostDetails.push({ post, friend });
    //       }
    //     });
    //   });
    // },
  },

  mounted() {
    this.getAllPosts();
    this.getSingleUser();
    this.getFriends();
    // this.getPostDetails();
    console.log(this.userId, "id");
  },
};
</script>
