<template>
  <div>
    <NavbarNew />
    <div>
      <div style="position: relative; left: 0; top: 0">
        <v-img
          class="main-img"
          :src="
            singleUser && !!singleUser.coverPicture
              ? singleUser.coverPicture
              : coverImage
          "
          height="240"
        ></v-img>
        <div class="sub-icon">
          <v-btn
            small
            fab
            @click="editCoverPicture()"
            v-if="this.userId === this.currentUserId"
            ><v-icon>mdi-camera</v-icon>
            <input
              ref="uploaderCover"
              class="d-none"
              type="file"
              @change="onFileChanged"
            />
          </v-btn>
        </div>
      </div>

      <div>
        <!-- Editable profile picture -->
        <!-- 1. Create the button that will be clicked to select a file -->
        <div
          class="d-flex justify-center mt-n16"
          v-if="this.userId === this.currentUserId"
        >
          <v-badge
            bordered
            right
            bottom
            color="blue"
            icon="mdi-camera"
            offset-x="25"
            offset-y="55"
          >
            <v-avatar
              class="cursor-pointer"
              color="blue-grey darken-2"
              size="178"
            >
              <v-avatar outlined size="170">
                <v-img
                  @click="editProfilePicture"
                  :loading="isSelecting"
                  class="cursor-pointer"
                  :src="
                    singleUser && !!singleUser.profilePicture
                      ? singleUser.profilePicture
                      : profileImage
                  "
                />
              </v-avatar>
            </v-avatar>
          </v-badge>

          <!-- 2. Create a File Input that will be hidden but triggered with JavaScript -->
          <input
            ref="uploaderProfile"
            class="d-none"
            type="file"
            @change="onFileChanged"
          />
        </div>

        <!-- Not editable profile picture -->
        <div class="d-flex justify-center mt-n16" v-else>
          <v-avatar
            class="outlined cursor-pointer"
            color="blue-grey darken-2"
            size="180"
          >
            <v-avatar size="170">
              <v-img
                :src="
                  singleUser && !!singleUser.profilePicture
                    ? singleUser.profilePicture
                    : profileImage
                "
              />
            </v-avatar>
          </v-avatar>
        </div>

        <div class="d-flex justify-center mt-4 title text-capitalize">
          {{
            singleUser && !!singleUser.username
              ? singleUser.username
              : "Unknown"
          }}
        </div>
        <div class="d-flex justify-center">
          {{ singleUser && !!singleUser.desc ? singleUser.desc : "Unknown" }}
        </div>
      </div>
    </div>

    <v-row>
      <v-col xs="12" sm="8" md="7">
        <PostSectionProfile />
      </v-col>

      <v-col xs="12" sm="4" md="5">
        <!-- LoggedIn user's info -->
        <div class="pa-2">
          <v-layout v-if="this.userId !== this.currentUserId">
            <v-flex class="">
              <div
                v-if="
                  singleUser && !!this.singleUser.followers
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
            <v-flex>
              <div>
                <v-btn
                  color="deep-purple lighten-2"
                  class="pa-3 white--text text-capitalize"
                  @click="startConversation()"
                  >message<v-icon right>mdi-email</v-icon></v-btn
                >
              </div>
            </v-flex>
          </v-layout>
          <v-layout class="mt-5">
            <v-flex>
              <span class="title mr-16">User Information</span>
              <span v-if="this.userId === this.currentUserId">
                <v-btn text fab @click="editUserInfo()"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
              </span>
              <div>
                <span class="mr-4">City :</span
                ><span class="subtitle-1 grey--text">
                  {{
                    singleUser && !!singleUser.city
                      ? singleUser.city
                      : "unknown"
                  }}
                </span>
              </div>
              <div>
                <span class="mr-4">From :</span
                ><span class="subtitle-1 grey--text">{{
                  singleUser && !!singleUser.from ? singleUser.from : "unknown"
                }}</span>
              </div>
              <div>
                <span class="mr-4">Relationship :</span
                ><span class="subtitle-1 grey--text">{{
                  singleUser && !!singleUser.relationship
                    ? singleUser.relationship
                    : "unknown"
                }}</span>
              </div>
            </v-flex>
          </v-layout>

          <!-- LoggedIn users' friends -->
          <v-layout class="mt-5">
            <v-flex>
              <div class="title">User friends</div>
              <v-row class="p-2" v-if="this.friendsList.length > 0">
                <v-col
                  cols="4"
                  xs="12"
                  sm="6"
                  md="4"
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
                        !!friend.profilePicture
                          ? friend.profilePicture
                          : profileImage
                      "
                      alt="John"
                      height="160"
                    ></v-img>
                  </v-card>
                  <div
                    class="mt-2 font-weight-bold d-flex justify-center text-capitalize"
                  >
                    {{ !!friend.username ? friend.username : "unkwown" }}
                  </div>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col> No friends </v-col>
              </v-row>
            </v-flex>
          </v-layout>
        </div>

        <!-- LoggedIn users's optics -->
        <div class="pa-2">
          <v-layout class="mt-6">
            <div class="title text-capitalize">
              {{
                singleUser && !!singleUser.username
                  ? singleUser.username
                  : "Unknown"
              }}
            </div>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-layout>
                <div class="subtitle-2">
                  {{ allPosts ? allPosts.length : 0 }}
                </div>
                <div class="subtitle-2 ml-1 grey--text">Posts</div>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout>
                <div class="subtitle-2">
                  {{
                    singleUser && !!singleUser.followings
                      ? singleUser.followings.length
                      : 0
                  }}
                </div>
                <div class="subtitle-2 ml-1 grey--text">Followers</div>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout>
                <div class="subtitle-2">
                  {{
                    singleUser && !!singleUser.followers
                      ? singleUser.followers.length
                      : 0
                  }}
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

        <!-- All users PAGINATED   -->
        <div class="pa-2">
          <v-layout class="mt-5">
            <v-flex>
              <div class="title">All Users</div>
              <v-row class="p-2" v-if="this.paginatedUsers.length > 0">
                <v-col
                  cols="4"
                  xs="12"
                  sm="6"
                  md="4"
                  class=""
                  v-for="user in this.paginatedUsers"
                  :key="user._id"
                >
                  <v-card
                    height="150"
                    @click="goToFriendProfile(user.username, user._id)"
                  >
                    <v-img
                      :src="
                        !!user.profilePicture
                          ? user.profilePicture
                          : profileImage
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
                  <v-pagination
                    v-model="page"
                    :length="totalPages"
                    circle
                    total-visible="4"
                    next-icon="mdi-menu-right"
                    prev-icon="mdi-menu-left"
                    @input="handlePageChange"
                  ></v-pagination>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col> No Users </v-col>
              </v-row>
            </v-flex>
          </v-layout>
        </div>
      </v-col>
    </v-row>

    <!-- Edit User Information Dialog -->
    <v-dialog v-model="editUserInfoDialog" max-width="480">
      <v-card flat>
        <v-card-text>
          <v-card-title>
            Edit Info
            <v-spacer></v-spacer>
            <v-btn color="black" icon @click="editUserInfoDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-form ref="userInfoRef" lazy-validation>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col class="pa-0">
                    <v-textarea
                      v-model="description"
                      label="Description"
                      outlined
                      rows="3"
                      name="description"
                      placeholder="Brief Description"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <v-text-field
                      label="City"
                      name="city"
                      v-model="city"
                      type="text"
                      color="primary1"
                      outlined
                      placeholder="City"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <v-text-field
                      label="From"
                      name="from"
                      v-model="from"
                      type="text"
                      color="primary1"
                      outlined
                      placeholder="From"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <v-text-field
                      label="Relationship"
                      name="relationship"
                      v-model="relationship"
                      type="text"
                      color="primary1"
                      outlined
                      placeholder="Relationship"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary darken-1"
                outlined
                @click="updateUserInfo"
                :loading="editInfoLoader"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Preview profile picture  dialog-->
    <v-dialog v-model="previewProfileDialog" max-width="750">
      <v-card>
        <v-app-bar flat color="white">
          <v-toolbar-title class="subtitle-1 pl-2">
            Profile Image
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="black" icon @click="deleteCloudinaryImage">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>
        <v-divider></v-divider>
        <!-- class that allows us to have a background image (i.e. backgroudUploadImage)-->
        <div class="backgroudUploadImage">
          <v-card-text class="py-12 d-flex justify-center" outlined>
            <v-avatar class="outlined" size="180">
              <v-avatar size="170">
                <v-img max-height="390" :src="this.fileUrl"></v-img>
              </v-avatar>
            </v-avatar>
          </v-card-text>
        </div>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" outlined @click="uploadProfileImage">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Preview cover picture dialog -->
    <v-dialog v-model="previewCoverImageDialog" max-width="980">
      <v-card>
        <v-app-bar flat color="white">
          <v-toolbar-title class="subtitle-1 pl-2">
            Cover Image
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="black" icon @click="deleteCloudinaryImage">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>
        <v-divider></v-divider>
        <div>
          <v-card-text class="d-flex justify-center" outlined>
            <v-card height="300">
              <v-img :src="this.fileUrl" width="880" height="300"></v-img>
            </v-card>
          </v-card-text>
        </div>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" outlined @click="uploadCoverImage">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  </div>
</template>

<script>
import PostSectionProfile from "../components/PostSectionProfile.vue";
import NavbarNew from "../components/Navbar.vue";
import { CLOUD_NAME, CLOUD_UPLOAD_PRESET } from "../../env";
import axios from "axios";
import { BASE_URL } from "../../env.js";

export default {
  name: "ProfilePage",

  components: { PostSectionProfile, NavbarNew },
  data() {
    return {
      singleUser: null,
      loading: false,
      editInfoLoader: false,
      userId: localStorage.getItem("userId"),
      username: this.$route.params.username,
      currentUserId: this.$route.params.id,

      coverImage: require("../assets/blueflowers.jpeg"),
      profileImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
      friendsList: [],
      currentConversationBoolean: false,
      receiverId: "",
      messages: [],
      currentConversationId: "",
      conversations: [],
      currentConversation: [],
      allPosts: [],
      editUserInfoDialog: false,
      description: "",
      city: "",
      from: "",
      relationship: "",

      isSelecting: false,
      selectedFile: null,

      fileUrl: "",
      uploadOverlay: false,
      previewProfileDialog: false,
      previewCoverImageDialog: false,
      editProfilePicBoolean: false,
      editCoverPicBoolean: false,

      snackBarText: "",
      snackbar: false,
      snackbarColor: null,

      paginatedUsers: [],
      page: 1,
      limit: 3,
      totalPages: 1,
    };
  },
  methods: {
    getSingleUser() {
      axios
        .get(`${BASE_URL}/api/users/find?username=${this.username}`)
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
          `${BASE_URL}/api/users/friends/${
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
        .put(`${BASE_URL}/api/users/${this.currentUserId}/follow`, {
          userId: this.userId,
        })
        .then((res) => {
          // console.log(res);
          this.snackBarText = res.data;
          this.snackbar = true;
          this.snackbarColor = true;
          location.reload();
        })
        .catch((err) => {
          let errorMsg = err.response.data;
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
        });
    },

    unFollowUser() {
      axios
        .put(`${BASE_URL}/api/users/${this.currentUserId}/unfollow`, {
          userId: this.userId,
        })
        .then((res) => {
          // console.log(res);
          this.snackBarText = res.data;
          this.snackbar = true;
          this.snackbarColor = true;
          location.reload();
        })
        .catch((err) => {
          let errorMsg = err.response.data;
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
        });
    },

    // Get all current user posts
    getAllPosts() {
      axios
        .get(
          `${BASE_URL}/api/posts/profile/${this.username}/${this.currentUserId}`
        )
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.allPosts = [...res.data];
            console.log(this.allPosts.length);
          }
        })
        .catch((err) => console.log(err));
    },

    editUserInfo() {
      this.editUserInfoDialog = true;
      this.description = this.singleUser.desc;
      this.city = this.singleUser.city;
      this.from = this.singleUser.from;
      this.relationship = this.singleUser.relationship;
    },

    updateUserInfo() {
      this.editInfoLoader = true;
      axios
        .put(`${BASE_URL}/api/users/${this.userId}`, {
          userId: this.userId,
          desc: this.description,
          city: this.city,
          from: this.from,
          relationship: this.relationship,
        })
        .then((res) => {
          this.editUserInfoDialog = false;
          this.snackBarText = res.data;
          this.snackbar = true;
          this.snackbarColor = true;
          this.editInfoLoader = false;
          location.reload();
          console.log(res.data);
        })
        .catch((err) => {
          let errorMsg = err.response.data;
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
          this.editInfoLoader = false;
        });
    },

    handleFileImportProfile() {
      this.isSelecting = true;
      // After obtaining the focus when closing the FilePicker, return the button state to normal
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      // Trigger click on the FileInput
      this.$refs.uploaderProfile.click();
    },

    handleFileImportCover() {
      this.isSelecting = true;
      // After obtaining the focus when closing the FilePicker, return the button state to normal
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      // Trigger click on the FileInput
      this.$refs.uploaderCover.click();
    },

    // image uploader button FUNCTION 2
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      this.uploadOverlay = true;
      this.uploadFileToCloudinary(this.selectedFile).then((data) => {
        this.fileUrl = data.url;
        this.uploadOverlay = false;

        // Deciding which dialog will show, whether coverPicture or profilePicture dialog
        if (this.editProfilePicBoolean) {
          this.previewProfileDialog = true;
        } else if (this.editCoverPicBoolean) {
          this.previewCoverImageDialog = true;
        }
      });
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

    editProfilePicture() {
      this.editProfilePicBoolean = true;
      this.handleFileImportProfile();
    },

    editCoverPicture() {
      this.editCoverPicBoolean = true;
      this.handleFileImportCover();
    },

    uploadProfileImage() {
      axios
        .put(`${BASE_URL}/api/users/${this.userId}`, {
          userId: this.userId,
          profilePicture: this.fileUrl,
        })
        .then((res) => {
          this.previewProfileDialog = false;
          // resetting dialog decider
          this.editProfilePicBoolean = false;

          this.snackBarText = res.data;
          this.snackbar = true;
          this.snackbarColor = true;
          location.reload();
        })
        .catch((err) => {
          let errorMsg = err.response.data;
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
        });
    },

    uploadCoverImage() {
      axios
        .put(`${BASE_URL}/api/users/${this.userId}`, {
          userId: this.userId,
          coverPicture: this.fileUrl,
        })
        .then((res) => {
          this.previewCoverImageDialog = false;
          // resetting dialog decider
          this.editCoverPicBoolean = false;

          this.snackBarText = res.data;
          this.snackbar = true;
          this.snackbarColor = true;
          location.reload();
          console.log(res.data);
        })
        .catch((err) => {
          let errorMsg = err.response.data;
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
        });
    },

    deleteCloudinaryImage() {
      this.editCoverPicBoolean = false;
      this.editProfilePicBoolean = false;
      // Retrieving public_id from url of cloudinary image
      let cloudId = this.fileUrl.split("/").slice(-1)[0].split(".")[0];
      axios
        .delete(`${BASE_URL}/api/posts/${this.userId}/${cloudId}/remove`)
        .then((res) => {
          this.previewProfileDialog = false;
          this.previewCoverImageDialog = false;
          location.reload();
          console.log(res.data);
        })
        .catch((err) => {
          let errorMsg = err.response.data;
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
        });
    },

    // Get conversation between LoggedIn user and chatPartner
    getConversation(partner_id) {
      this.currentConversationBoolean = true;

      // then identify the member who is chatting with the current user
      this.receiverId = partner_id;

      let userConversations = [];
      axios
        .get(`${BASE_URL}/api/conversations/${partner_id}`)
        .then((res) => {
          userConversations = [...res.data];
          console.log(res.data, "conversations");

          // the message is set to empty to prevent concatenating of messages from different conversations
          this.messages = [];
          userConversations.forEach((conversation) => {
            this.getMessages(conversation._id);
          });
        })
        .catch((err) => {
          let errorMsg = err.response.data;
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
        });
    },

    getMessages(conversationId) {
      this.currentConversationId = conversationId;

      // Find the current conversation
      this.currentConversation = this.conversations.find(
        (conversation) => conversation._id === this.currentConversationId
      );
      console.log(this.currentConversation, "current-conversations");

      axios
        .get(`${BASE_URL}/api/messages/${conversationId}`)
        .then((res) => {
          this.messages.push(res.data);
        })
        .catch((err) => {
          let errorMsg = err.response.data;
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
        });
    },

    createConversation() {
      axios
        .post(`${BASE_URL}/api/conversations/`, {
          senderId: this.userId,
          receiverId: this.currentUserId,
        })
        .then((res) => {
          this.currentConversation = res.data;
          // Getting conversation and getMessages function retyped
          this.currentConversationBoolean = true;

          // then identify the member who is chatting with the current user
          this.receiverId = this.currentUserId;
          let userConversations = [];
          axios
            .get(`${BASE_URL}/api/conversations/${this.receiverId}`)
            .then((response) => {
              userConversations = [...response.data];

              // the message is set to empty to prevent concatenating of messages from different conversations
              this.messages = [];
              userConversations.forEach((conversation) => {
                this.getMessages(conversation._id);

                this.$router.push("/messenger");
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          let errorMsg = err.response.data;
          this.snackbar = true;
          this.snackBarText = `${errorMsg}`;
        });
    },

    startConversation() {
      this.createConversation();
    },

    getPaginatedUsers() {
      axios
        .get(
          `${BASE_URL}/api/users/paginate?page=${this.page}&limit=${this.limit}`
        )
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.paginatedUsers = [...res.data.paginatedData];

            // totalPages is sort of the limit of the number of pages required to get all the users
            this.totalPages = Math.ceil(res.data.numOfUsers / this.limit);
            console.log(res.data, "paginate");
          }
        })
        .catch((err) => console.log(err));
    },

    // This function is triggered whenever a pagination button is clicked
    handlePageChange(value) {
      this.page = value;
      this.getPaginatedUsers();
    },
  },

  mounted() {
    this.getSingleUser();
    this.getFriends();
    this.getAllPosts();
    this.getPaginatedUsers();
  },
};
</script>

<style scoped>
.main-img {
  position: relative;
  top: 0;
  left: 0;
}
.sub-icon {
  position: absolute;
  top: 5px;
  right: 10px;
}

.backgroudUploadImage {
  background: url("../assets/greyColor.jpeg") no-repeat center center fixed !important;
  background-size: cover;
}

.cursor-pointer:hover {
  cursor: pointer;
}
</style>
