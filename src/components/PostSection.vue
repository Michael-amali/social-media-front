<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12">
        <v-card>
          <v-card-text class="pb-0">
            <v-row>
              <v-col class="pb-0">
                <v-avatar size="40">
                  <img
                    lazy-src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
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
              lazy-src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
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

    <!-- main post -->
    <v-row class="d-flex justify-center">
      <v-col
        class="py-6"
        cols="12"
        v-for="post in this.allPosts"
        :key="post._id"
      >
        <v-card>
          <v-app-bar flat color="white">
            <v-avatar size="40">
              <img
                lazy-src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                alt="John"
              />
            </v-avatar>
            <v-toolbar-title class="subtitle-1 pl-2">
              John Doe
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn color="black" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn> -->
            <v-menu left bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" color="black">
                  <!-- <v-avatar size="30">
              <img
                lazy-src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                alt="John"
              />
            </v-avatar> -->
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
                class="mx-3"
                fab
                dark
                x-small
                color="primary"
                elevation="0"
              >
                <v-icon dark>mdi-thumb-up </v-icon>
              </v-btn>
              <v-btn class="mr-3" fab dark x-small color="red" elevation="0">
                <v-icon dark> mdi-heart </v-icon>
              </v-btn>
              <span class="">{{ post.likes.length }} people like it</span>
              <span class="ml-16"></span><span class="ml-16"></span>
              <span class="ml-16">Comments</span>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-row class="d-flex justify-center">
      <v-col cols="10">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
          voluptates, saepe sint officia ipsam rem, dolorum iure itaque beatae
          accusamus commodi maxime nisi animi fuga nulla quibusdam perspiciatis
          culpa? Aperiam. Dignissimos exercitationem corporis nulla doloribus
          aperiam magni, similique quae fuga officia magnam minus fugiat dolore
          quia voluptatem totam iure aut adipisci. Similique adipisci
          praesentium velit sint mollitia quae, porro aliquid. Harum officiis
          error rerum quasi veritatis optio! Ab temporibus numquam non velit
        </p></v-col
      >
    </v-row> -->
    <v-overlay :value="uploadOverlay">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import axios from "axios";
import { CLOUD_NAME, CLOUD_UPLOAD_PRESET } from "../../env";

export default {
  name: "PostSection",

  components: {},
  data() {
    return {
      mediaAsset: null,
      previewDialog: false,
      descriptionPost: "",

      files: [],
      isError: false,
      errorText: null,
      fileUrl: "",
      uploadOverlay: false,
      userId: "61ed636535c4e03ba49bba5c",
      allPosts: [],
      singlePost: {},

      menuList: [{ title: "Delete" }],
    };
  },
  methods: {
    // Preview post method
    previewPost() {
      axios
        .post("http://localhost:4000/api/posts/", {
          userId: "61ed636535c4e03ba49bba5c",
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

    continueToPost(post){
      this.allPosts.push(post);
      this.previewDialog = false;
    },

    closePreviewPost(postId) {
      // Since clicking the share button push the post info to the database, if you wish not to continue we will delete it from the database
      this.deleteSinglePost(postId);
      this.previewDialog = false;
    },

    // Get image and upload to cloudinary method
    onAddFiles(files) {
      this.files = files;
      this.uploadOverlay = true;
      if (this.files.length > 0) {
        this.files.forEach((file) => {
          this.uploadFileToCloudinary(file).then((urlData) => {
            this.fileUrl = urlData;
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
            resolve(response.url);
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
        .get(`http://localhost:4000/api/posts/timeline/${this.userId}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.allPosts = [...res.data];
          }
        })
        .catch((err) => console.log(err));
    },

    getSinglePost(postId) {
      axios
        .get(`http://localhost:4000/api/posts/find/${postId}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.singlePost = { ...res.data };
          }
        })
        .catch((err) => console.log(err));
    },

    deleteSinglePost(postId) {
      this.allPosts.forEach((post, idx, posts) => {
        if (postId === post._id) {
          posts.splice(idx, 1);
        }
      });

      axios
        .delete(`http://localhost:4000/api/posts/${postId}/${this.userId}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            console.log("Post successfully deleted");
          }
        })
        .catch((err) => console.log(err));
    },

    popUpDrawer(item, postId) {
      if (item.title === "Delete") {
        this.deleteSinglePost(postId);
      }
    },
  },

  mounted() {
    this.getAllPosts();
  },
};
</script>
