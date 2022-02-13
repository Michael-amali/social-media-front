<template>
  <div>
    <div>
      <v-img :src="require('../assets/blueflowers.jpeg')" height="240"></v-img>

      <div>
        <div class="d-flex justify-center mt-n16">
          <v-avatar class="outlined" size="180">
            <v-avatar size="170">
              <v-img
                lazy-src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80"
                src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80"
              />
            </v-avatar>
          </v-avatar>
        </div>
        <div class="d-flex justify-center mt-4 title">Emma Watson</div>
      </div>
    </div>
    <Navbar />
    <LeftSidebar />
    <v-row>
      <v-col cols="7">
        <PostSection />
      </v-col>
      <v-col cols="5">
        <div class="pa-2">
          <v-layout class="">
            <v-flex>
              <div class="title">User Information</div>
              <div>
                <span class="mr-4">City :</span
                ><span class="subtitle-1 grey--text">Madrid</span>
              </div>
              <div>
                <span class="mr-4">From :</span
                ><span class="subtitle-1 grey--text">Berlin, Germany</span>
              </div>
              <div>
                <span class="mr-4">Relationship :</span
                ><span class="subtitle-1 grey--text">Single</span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout class="mt-5">
            <v-flex>
              <div class="title">User friends</div>
              <v-row class="p-2">
                <v-col cols="4" class="">
                  <v-card height="100">
                    <v-img
                      height="130"
                      width="130"
                      src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    ></v-img>
                    <div class="">Usernajbjkbkjjhbv</div></v-card
                  >
                </v-col>
                <v-col cols="4" class="">
                  <v-card height="100">
                    <v-img
                      height="130"
                      width="130"
                      src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    ></v-img
                    ><span>Usernamhbvhhvhve</span>
                  </v-card></v-col
                >
                <v-col cols="4" class="mb-6">
                  <v-card height="100">
                    <v-img
                      height="130"
                      width="130"
                      src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    ></v-img>
                    <span>Username</span></v-card
                  ></v-col
                >
                <v-col cols="4" class="mb-6">
                  <v-card height="100">
                    <v-img
                      height="130"
                      width="130"
                      src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    ></v-img>
                    <span>Username</span></v-card
                  ></v-col
                >
                <v-col cols="4" class="mb-6">
                  <v-card height="100">
                    <v-img
                      height="130"
                      width="130"
                      src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    ></v-img>
                    <span>Username</span>
                  </v-card></v-col
                >
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
import PostSection from "../components/PostSection.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "ProfilePage",

  components: { LeftSidebar, PostSection, Navbar },
  data() {
    return {};
  },
  methods: {},
};
</script>
