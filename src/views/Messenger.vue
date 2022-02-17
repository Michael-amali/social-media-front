<template>
  <div>
    <Navbar />
    <v-container fluid>
      <v-row>
        <!-- friends section -->
        <v-col>
          <v-row>
            <!-- search field -->
            <v-col cols="12">
              <v-text-field
                label="Search users"
                prepend-icon="mdi-microscope"
                v-model="searchTerm"
              ></v-text-field>
            </v-col>

            <!-- friends list-->
            <v-col class="pa-3">
              <div>
                <div class="py-3">
                  <span class="mr-4">
                      <v-avatar size="50">
                        <v-img
                          src="https://cdn.vuetifyjs.com/images/lists/3.jpg"
                        ></v-img>
                      </v-avatar></span>
                  <span class="subtitle-1">Pamela Kim </span>
                </div>
                <div>
                  <span class="mr-4">

                      <v-avatar size="50">
                        <v-img
                          src="https://cdn.vuetifyjs.com/images/lists/5.jpg"
                        ></v-img>
                      </v-avatar> </span
                  ><span class="subtitle-1">Rema Newton</span>
                </div>
                <div class="py-5">
                  <span class="mr-4">

                      <v-avatar size="50">
                        <v-img
                          src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                        ></v-img>
                      </v-avatar> </span
                  ><span class="subtitle-1">Victony </span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <!-- chat messages -->
        <v-col>
          <v-row>
            <v-col>
              <div class="chatBox">
                <div class="chatBoxWrapper">
                  <div class="chatBoxTop">
                    <Message :own="false" />
                    <Message :own="own" />
                    <Message :own="false" />
                    <Message :own="false" />
                    <Message :own="own" />
                    <Message :own="false" />
                  </div>
                  <div class="chatBoxBottom">
                    <textarea
                      class="chatMessageInput"
                      name=""
                      id=""
                      outlined
                      placeholder="Write something.."
                    ></textarea>
                    <button class="chatSubmitButton">Send</button>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <!-- Online friends -->
        <v-col> Online Friends 
            <v-row>
              <v-col class="pa-3">
              <div>
                <div class="py-5">
                  <span class="mr-4">
                    <v-badge
                      bordered
                      right
                      color="green"
                      offset-x="15"
                      offset-y="15"
                    >
                      <v-avatar size="50">
                        <v-img
                          src="https://cdn.vuetifyjs.com/images/lists/3.jpg"
                        ></v-img>
                      </v-avatar> </v-badge
                  ></span>
                  <span class="subtitle-1">Pamela Kim </span>
                </div>
                <div>
                  <span class="mr-4">
                    <v-badge
                      bordered
                      right
                      color="green"
                      offset-x="15"
                      offset-y="15"
                    >
                      <v-avatar size="50">
                        <v-img
                          src="https://cdn.vuetifyjs.com/images/lists/5.jpg"
                        ></v-img>
                      </v-avatar> </v-badge></span
                  ><span class="subtitle-1">Rema Newton</span>
                </div>
                <div class="py-5">
                  <span class="mr-4">
                    <v-badge
                      bordered
                      right
                      color="green"
                      offset-x="15"
                      offset-y="15"
                    >
                      <v-avatar size="50">
                        <v-img
                          src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                        ></v-img>
                      </v-avatar> </v-badge></span
                  ><span class="subtitle-1">Victony </span>
                </div>
              </div>
            </v-col>
            </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Message from "../components/Message.vue";
import axios from "axios"

export default {
  name: "Messenger",

  components: { Navbar, Message },
  data() {
    return {
      searchTerm: "",
      own: true,
      userId: localStorage.getItem("userId"),
      conversations: [],
      friendId: "",
    };
  },
  methods: {
    getConversations(){
      axios.get(`http://localhost:4000/api/conversations/${this.userId}`).then((res)=>{
        this.conversations = [...res.data];
        console.log(this.conversations)
        // this.getUser();
      }).catch((err) => console.log(err));
    },
    // getFriend(){
      
    // },

    getUser(){
      this.friendId = this.conversations.members.find((person)=> person !== this.userId);

      axios.get(`http://localhost:4000/api/users/find?userId=${this.friendId}`).then((res)=>{
        console.log(res.data)
      }).catch((err) => console.log(err));

  },

    mounted(){
      this.getConversations();
      // this.getUser()
    }
  }
};
</script>

<style scoped>
.chatBox {
  flex: 5.5;
}

.chatBoxWrapper {
  display: flex;
  flex-direction: column;
}
/* height should change with respective to screen size */
.chatBoxTop {
  height: 70vh;
  overflow-y: scroll;
  padding-right: 10px;
}
.chatBoxBottom {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.chatMessageInput {
  width: 80%;
  height: 90px;
  padding: 10px;
  border: 1px solid gray;
}

.chatSubmitButton {
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: teal;
  color: white;
}
</style>