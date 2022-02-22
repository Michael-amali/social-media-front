<template>
  <div>
    <Navbar />
    <v-container fluid>
      <v-row>
        <!-- FRIENDS SECTION -->
        <v-col md="3" sm="4" cols="12">
          <v-row>
            <!-- search field -->
            <v-col cols="12">
              <v-autocomplete
                v-model="model"
                :items="itemsItems"
                :loading="isLoading"
                :search-input.sync="search"
                color="blue-grey darken-2"
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

            <v-col cols="12" class="py-0">
              <div class="title pl-2">Chat List</div>
            </v-col>
            <!-- friends list-->
            <v-col class="pa-3">
              <v-hover
                v-slot="{ hover }"
                v-for="(chatPartner, idx) in this.userChatPartners"
                :key="idx"
              >
                <v-col class="pa-0">
                  <v-card class="ma-2 pa-1" outlined :elevation="hover ? 2 : 0">
                    <div class="py-3">
                      <v-row>
                        <v-col
                          class="cursor-pointer"
                          cols="8"
                          @click="getConversation(chatPartner._id)"
                        >
                          <span>
                            <v-avatar size="50">
                              <v-img
                                :src="
                                  chatPartner.profilePicture
                                    ? chatPartner.profilePicture
                                    : profileImage
                                "
                              >
                              </v-img>
                            </v-avatar>
                          </span>
                          <span align-self="center" class="subtitle-1 ml-2"
                            >{{ chatPartner.username }}
                          </span>
                        </v-col>
                        <v-col class="" cols="4">
                          <v-btn
                            v-if="hover"
                            outlined
                            small
                            color="black"
                            text
                            fab
                            @click="deleteConversation(chatPartner._id)"
                            ><v-icon>mdi-close</v-icon></v-btn
                          ></v-col
                        >
                      </v-row>
                    </div>
                  </v-card>
                </v-col>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>

        <!-- CHAT MESSAGES -->
        <v-col md="6" sm="8" cols="12">
          <v-row>
            <v-col>
              <v-col v-if="!this.currentConversationBoolean">
                <div class="display-2 pa-8">
                  Open a conversation to start a chat
                </div>
              </v-col>
              <v-card outlined v-else>
                <div class="chatBox" id="chatBoxId">
                  <div class="chatBoxWrapper">
                    <div class="chatBoxTop" id="chatBoxTopId">
                      <v-col
                        v-for="(messageArray, idx) in this.messages"
                        :key="idx"
                      >
                        <v-col
                          v-for="(message, idc) in messageArray"
                          :key="idc"
                        >
                          <Message
                            :own="message.sender === userId ? true : false"
                            :message="message"
                          />
                        </v-col>
                      </v-col>
                    </div>
                    <div class="chatBoxBottom">
                      <textarea
                        class="chatMessageInput"
                        name=""
                        v-model="userInputText"
                        outlined
                        placeholder="Write something.."
                      ></textarea>
                      <button class="chatSubmitButton" @click="handleSubmit">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <!-- ONLINE FRIENDS -->
        <v-col md="3" sm="12" cols="12">
          <div class="title">Online Friends</div>
          <v-col class="pa-0 mt-7" v-if="this.onlineFriends.length > 0">
            <v-row
              class=""
              v-for="(onlineFriend, idx) in this.onlineFriends"
              :key="idx"
            >
              <v-col>
                <div cols="12" class="">
                  <span class="mr-4" @click="handleOnlineClick(onlineFriend)">
                    <v-badge
                      bordered
                      right
                      color="green"
                      offset-x="15"
                      offset-y="15"
                    >
                      <v-avatar size="50">
                        <v-img
                          :src="
                            onlineFriend.profilePicture
                              ? onlineFriend.profilePicture
                              : profilePic
                          "
                          alt="John"
                        ></v-img>
                      </v-avatar> </v-badge
                  ></span>
                  <span class="subtitle-1">{{ onlineFriend.username }}</span>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col v-else>
            <div>No friends online</div>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
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
          text outlined
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
import Navbar from "../components/Navbar.vue";
import Message from "../components/Message.vue";
import axios from "axios";
import { io } from "socket.io-client";
import { BASE_URL } from "../../env.js";

export default {
  name: "Messenger",

  components: { Navbar, Message },
  data() {
    return {
      searchTerm: "",
      own: true,
      userId: localStorage.getItem("userId"),
      conversations: [],
      userChatPartners: [],
      profileImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
      currentConversationBoolean: false,
      currentConversation: null,
      messages: [],
      userInputText: "",
      currentConversationId: "",
      socket: null,
      arrivalMessage: null,
      onlineUsers: [],
      friendsList: [],
      onlineFriends: [],
      profilePic:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
      receiverId: "",

      users: ["Afghanistan", "Albani"],
      usernameLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,

      snackBarText: "",
      snackbar: false,
      snackbarColor: null,
    };
  },

  methods: {
    getConversations() {
      axios
        .get(`${BASE_URL}/api/conversations/${this.userId}`)
        .then((res) => {
          this.conversations = [...res.data];
          console.log(this.conversations, "---------convo");

          this.getUserChatFriends();
        })
        .catch((err) => console.log(err));
    },

    getUserChatFriends() {
      let userchatPartnersArray = [];
      this.conversations.forEach((conversation) => {
        // members array will contain user and chat partner. So will get all the chat partners and put then in an array
        let userChatPartnerId = conversation.members.find(
          (member) => member !== this.userId
        );
        userchatPartnersArray.push(userChatPartnerId);
      });

      // Using id to get userChatPartners details
      userchatPartnersArray.forEach((partner_id) => {
        axios
          .get(`${BASE_URL}/api/users/find?userId=${partner_id}`)
          .then((res) => {
            this.userChatPartners.push(res.data);
          })
          .catch((err) => console.log(err));
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
          console.log(res.data, "conversations", partner_id, "partnerId");

          // the message is set to empty to prevent concatenating of messages from different conversations
          this.messages = [];
          userConversations.forEach((conversation) => {
            this.getMessages(conversation._id);
          });
        })
        .catch((err) => console.log(err));
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
          this.scrollToLastMessage();
        })
        .catch((err) => console.log(err));
    },

    handleSubmit() {
      const messageData = {
        sender: this.userId,
        text: this.userInputText,
        conversationId: this.currentConversationId,
      };

      this.socket.emit("sendMessage", {
        senderId: this.userId,
        receiverId: this.receiverId,
        text: this.userInputText,
      });

      axios
        .post(`${BASE_URL}/api/messages/`, messageData)
        .then((res) => {
          // updating the messages array
          this.messages = [...this.messages, res.data];

          // Sort of only reloading the chat section after user types (NOT EFFICIENT)
          this.messages = [];
          this.getMessages(this.currentConversationId);
          this.userInputText = "";
        })
        .catch((err) => console.log(err));
    },

    scrollToLastMessage() {
      const chatBoxTop = document.getElementById("chatBoxId");
      console.log(chatBoxTop.scrollTop, "top");
      console.log(chatBoxTop.scrollHeight, "height");
      chatBoxTop.scrollTop += chatBoxTop.scrollHeight;
      chatBoxTop.scrollIntoView(true);
      console.log(chatBoxTop.scrollTop, "height after");
    },

    setSocket() {
      this.socket = io("ws://localhost:8900");
    },

    getMessagesFromSocket() {
      this.socket.on("getMessage", (data) => {
        this.arrivalMessage = {
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        };
      });
      console.log(this.arrivalMessage, "arrivalMessage");
    },

    sendMessageToServer() {
      this.socket.emit("addUser", this.userId);
      this.socket.on("getUsers", (users) => {
        this.onlineUsers = [...users];
        console.log(users, "users-----");
      });
    },

    // Haven't used it yet ..... PROBABILY the bug killing me
    addingArrivalMessage() {
      if (
        this.arrivalMessage &&
        this.currentConversation?.members.includes(this.arrivalMessage.sender)
      ) {
        this.messages = [...this.messages, this.arrivalMessage];
      }
    },

    getFriends() {
      axios
        .get(`${BASE_URL}/api/users/friends/${this.userId}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            this.friendsList = [...res.data];

            this.setOnlineFriends();
          }
        })
        .catch((err) => console.log(err));
    },

    setOnlineFriends() {
      let onlineUsersId = [];

      this.onlineUsers.forEach((onlineUser) => {
        onlineUsersId.push(onlineUser.userId);
      });
      this.onlineFriends = this.friendsList.filter((friend) => {
        return onlineUsersId.includes(friend._id);
      });
    },

    handleOnlineClick(person) {
      axios
        .get(
          `${BASE_URL}/api/conversations/find/${this.userId}/${person._id}`
        )
        .then((res) => {
          let conversation = res.data;

          this.currentConversationBoolean = true;
          this.messages = [];
          this.getMessages(conversation._id);
        })
        .catch((err) => console.log(err));
    },

    // this.fields[0].value is set when you search and click on one of the result
    createConversation() {
      axios
        .post(`${BASE_URL}/api/conversations/`, {
          senderId: this.userId,
          receiverId: this.fields[0].value,
        })
        .then((res) => {
          this.currentConversation = res.data;
          // Getting conversation and getMessages function retyped
          this.currentConversationBoolean = true;

          // then identify the member who is chatting with the current user
          this.receiverId = this.fields[0].value;
          let userConversations = [];
          axios
            .get(`${BASE_URL}/api/conversations/${this.receiverId}`)
            .then((response) => {
              userConversations = [...response.data];

              // the message is set to empty to prevent concatenating of messages from different conversations
              this.messages = [];
              userConversations.forEach((conversation) => {
                this.getMessages(conversation._id);
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },

    startConversation() {
      this.createConversation();
    },

    deleteConversation(partnerId) {
      axios
        .get(
          `${BASE_URL}/api/conversations/find/${this.userId}/${partnerId}`
        )
        .then((response) => {
          let conversation = response.data;

          let updateChatPartnersAfterDelete = [...this.userChatPartners];
          // Deleting from backend
          axios
            .delete(
              `${BASE_URL}/api/conversations/${this.userId}/${partnerId}/${conversation._id}`
            )
            .then((res) => {
              if (res.status >= 200 && res.status < 400) {
                // Deleting from frontend
                updateChatPartnersAfterDelete.forEach(
                  (userChatPartner, idx, chatPartners) => {
                    if (userChatPartner._id === partnerId) {
                      chatPartners.splice(idx, 1);
                    }
                  }
                );
                // update userChatPartners after deleting from frontend
                this.userChatPartners = updateChatPartnersAfterDelete;
                this.currentConversationBoolean = false;
                // console.log(res.data);
                this.snackBarText = res.data;
                this.snackbar = true;
                this.snackbarColor = true;
              }
            })
            .catch((err) => {
              let errorMsg = err.response.data;
              this.snackbar = true;
              this.snackBarText = `${errorMsg}`;
            });
        })
        .catch((err) => console.log(err));
    },
  },

  computed: {
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
    this.getConversations();
    this.setSocket();
    this.getMessagesFromSocket();
    this.sendMessageToServer();
    this.getFriends();
    // this.setOnlineFriends();

    // When there's a change in this.fields, it calls the startConversation() function
    this.$watch(
      "fields",
      function () {
        console.log("a thing changed");
        this.startConversation();
      },
      { deep: true }
    );
  },
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
  padding: 3px;
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

.cursor-pointer:hover {
  cursor: pointer;
}
</style>
