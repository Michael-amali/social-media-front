<template>
  <div>
    <Navbar
      :socket="socket"
      ref="NavbarComponent"
      :notifications="notifications"
    />
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
            <!-- Chat -->
            <v-col cols="12" class="py-0">
              <v-row>
                <v-col cols="10" sm="9" md="9"
                  ><div class="title pl-2">Chat List</div></v-col
                >
                <v-col cols="2" sm="3" md="3"
                  ><v-btn fab small text @click="$router.go()"
                    ><v-icon>mdi-refresh</v-icon></v-btn
                  ></v-col
                >
              </v-row>
            </v-col>
            <!-- friends list-->
            <v-col class="pa-3">
              <v-hover
                v-slot="{ hover }"
                v-for="(chatPartner, idx) in this.userChatPartners"
                :key="idx"
              >
                <v-col class="pa-0">
                  <v-card
                    class="ma-2 pa-1"
                    outlined
                    :elevation="hover ? 2 : 0"
                    :class="`${
                      selectedChatId === chatPartner._id
                        ? 'active-selected'
                        : ''
                    }`"
                  >
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
                            @click="deleteConvoDialog = true"
                            ><v-icon>mdi-close</v-icon>
                          </v-btn>
                          <!-- Delete conversation dialog -->
                          <v-dialog
                            v-model="deleteConvoDialog"
                            max-width="480"
                            :retain-focus="false"
                            hide-overlay
                          >
                            <v-card>
                              <v-card-title>
                                Confirm
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="black"
                                  icon
                                  @click="deleteConvoDialog = false"
                                >
                                  <v-icon>mdi-close</v-icon>
                                </v-btn>
                              </v-card-title>
                              <v-card-text>
                                Are you sure you want to delete this
                                conversation ?
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="primary darken-1"
                                  outlined
                                  @click="deleteConvoDialog = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  color="primary darken-1"
                                  outlined
                                  :loading="deleteLoader"
                                  @click="deleteConversation(chatPartner._id)"
                                >
                                  Delete
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-col>
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
                <div class="chatBox">
                  <div class="chatBoxWrapper">
                    <div class="chatBoxTop" id="chatBoxTopId" ref="chatBoxRef">
                      <v-col v-for="(message, idx) in messages" :key="idx">
                        <v-col class="py-0">
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
                        outlined
                        v-model="userInputText"
                        placeholder="Write something.."
                        @keyup.enter="handleSubmit"
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
                  <span
                    class="mr-4 cursor-pointer"
                    @click="handleOnlineClick(onlineFriend)"
                  >
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

    <!-- Delete conversation dialog -->
    <v-dialog v-model="deleteConvoDialog" max-width="480">
      <v-card>
        <v-card-title>
          Confirm
          <v-spacer></v-spacer>
          <v-btn color="black" icon @click="deleteConvoDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete this conversation ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            outlined
            @click="deleteConvoDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn color="primary darken-1" outlined> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      username: localStorage.getItem("username"),
      conversations: [],
      userChatPartners: [],
      profileImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
      currentConversationBoolean: false,
      currentConversation: null,

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

      usernameLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,

      snackBarText: "",
      snackbar: false,
      snackbarColor: null,

      confirmDelete: false,
      deleteConvoDialog: false,
      deleteLoader: false,

      conversation: null,
      messages: [],
      selectedChatId: null,

      notifications: [],
    };
  },

  methods: {
    scrollToBottom() {
      let chatBoxTop = this.$refs.chatBoxRef;

      this.$nextTick(() => {
        chatBoxTop.scrollTop =
          chatBoxTop.scrollHeight - chatBoxTop.clientHeight;
      }, 0);
    },

    getConversations() {
      axios
        .get(`${BASE_URL}/api/conversations/${this.userId}`)
        .then((res) => {
          this.conversations = [...res.data];

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
      this.selectedChatId = partner_id;

      // then identify the member who is chatting with the current user
      this.receiverId = partner_id;

      axios
        .get(
          `${BASE_URL}/api/conversations/find/${this.userId}/${this.receiverId}`
        )
        .then((res) => {
          this.conversation = res.data;
          this.currentConversationBoolean = true;
          this.messages = [];
          this.getMessages(this.conversation._id);

          this.clearNotification(this.receiverId);
          this.deleteNotificationFromDB(this.conversation._id);
        })
        .catch((err) => console.log(err));
    },

    getMessages(conversationId) {
      this.currentConversationId = conversationId;

      axios
        .get(`${BASE_URL}/api/messages/${conversationId}`)
        .then((res) => {
          let messagesArray = res.data;

          // Ignore pushing messages with an id that already exists. Every new msg will have it's own id even if the same text msg
          if (messagesArray.length > 0) {
            messagesArray.forEach((msg) => {
              let foundIndex = this.messages.findIndex((msgObj) => {
                return msgObj._id === msg._id;
              });
              if (foundIndex === -1) {
                this.messages.push(msg);
              }
            });
          } else {
            this.messages.push(res.data);
          }
        })
        .catch((err) => console.log(err));
    },

    handleSubmit() {
      if (this.userInputText.trim() === "") return;

      // MESSAGE
      this.createMessage();

      this.socket.emit("sendMessage", {
        senderId: this.userId,
        receiverId: this.receiverId,
        text: this.userInputText.trim(),
      });

      // NOTIFICATION
      this.createNotification();

      this.socket.emit("sendNotification", {
        conversationId: this.currentConversationId,
        senderId: this.userId,
        senderName: this.username,
        receiverId: this.receiverId,
      });
    },

    setSocket() {
      // this.socket = io("ws://localhost:8900");
      this.socket = io("https://social-media-socketio.herokuapp.com/");
    },

    createMessage() {
      const messageData = {
        sender: this.userId,
        text: this.userInputText.trim(),
        conversationId: this.currentConversationId,
      };

      axios
        .post(`${BASE_URL}/api/messages/`, messageData)
        .then((res) => {
          this.messages.push(res.data);
          this.userInputText = "";

          this.$nextTick(() => {
            this.$refs.chatBoxRef.scrollTop =
              this.$refs.chatBoxRef.scrollHeight;
          });
        })
        .catch((err) => console.log(err));
    },

    getMessagesFromSocket() {
      this.socket.on("getMessage", (data) => {
        this.arrivalMessage = {
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        };
      });
    },

    sendMessageToServer() {
      this.socket.emit("addUser", this.userId);

      this.socket.on("getUsers", (users) => {
        this.onlineUsers = [...users];
        console.log(users, "online users-----");
        this.setOnlineFriends();
      });
    },

    addArrivalMessage() {
      if (
        this.arrivalMessage &&
        this.conversation?.members.includes(this.arrivalMessage?.sender)
      ) {
        this.messages.push(this.arrivalMessage);
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
        .get(`${BASE_URL}/api/conversations/find/${this.userId}/${person._id}`)
        .then((res) => {
          if (res.data) {
            this.conversation = res.data;
            this.currentConversationBoolean = true;
            this.messages = [];
            this.getMessages(this.conversation?._id);
          } else {
            this.createConvo(this.userId, person._id);
          }

          // Check before pushing into userChatPartners array to avoid duplicates
          let found = this.userChatPartners.find((partner) => {
            return person._id === partner._id;
          });
          if (!found) {
            this.userChatPartners.push(person);
          }

          this.selectedChatId = person._id;
        })
        .catch((err) => console.log(err));
    },

    createConvo(senderId, receiverId) {
      axios
        .post(`${BASE_URL}/api/conversations/`, {
          senderId: senderId,
          receiverId: receiverId,
        })
        .then((res) => {
          this.conversation = res.data;
          this.currentConversationBoolean = true;
          this.messages = [];
          this.getMessages(this.conversation?._id);
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
          this.conversation = res.data;
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

          // Check before pushing into userChatPartners array to avoid duplicates
          let found = this.userChatPartners.find((partner) => {
            return this.fields[0]?.value === partner._id;
          });
          if (!found) {
            this.userChatPartners.push({
              _id: this.fields[0]?.value,
              username: this.fields[1]?.value,
              profilePicture: this.fields[4]?.value,
            });
          }

          this.selectedChatId = this.fields[0].value;
        })
        .catch((err) => console.log(err));
    },

    startConversation() {
      this.createConversation();
    },

    deleteConversation(partnerId) {
      this.deleteLoader = true;
      axios
        .get(`${BASE_URL}/api/conversations/find/${this.userId}/${partnerId}`)
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
                this.deleteConvoDialog = false;
                this.deleteLoader = false;
                this.snackBarText = res.data;
                this.snackbar = true;
                this.snackbarColor = true;
              }
            })
            .catch((err) => {
              let errorMsg = err.response.data;
              this.snackbar = true;
              this.snackBarText = `${errorMsg}`;
              this.deleteConvoDialog = false;
              this.deleteLoader = false;
            });
        })
        .catch((err) => console.log(err));
    },

    clearNotifications() {
      this.$refs.NavbarComponent.resetNotifications();
    },

    clearNotification(id) {
      this.$refs.NavbarComponent.clearOneNotification(id);
    },

    createNotification() {
      axios
        .post(`${BASE_URL}/api/notifications/`, {
          conversationId: this.currentConversationId,
          senderId: this.userId,
          senderName: this.username,
          receiverId: this.receiverId,
        })
        .then((res) => {
          let found = this.notifications.find((n) => {
            return n.senderId === res.data.senderId;
          });
          if (!found) {
            this.notifications.push(res.data);
          }
        })
        .catch((err) => console.log(err));
    },

    getNotificationsFromDB() {
      axios
        .get(`${BASE_URL}/api/notifications/${this.userId}`)
        .then((res) => {
          this.notifications.push(res.data);
        })
        .catch((err) => console.log(err));
    },

    deleteNotificationFromDB(conversationId) {
      axios
        .delete(
          `${BASE_URL}/api/notifications/${conversationId}/${this.userId}`
        )
        .then((res) => {
          // Removing from frontend after deleting from backend
          let found = this.notifications[0].find((n) => {
            return n.conversationId === conversationId;
          });
          if (found && found.receiverId === this.userId) {
            let foundIndex = this.notifications[0].findIndex((n) => {
              return n.conversationId === conversationId;
            });
            this.notifications[0].splice(foundIndex, 1);
          }
          console.log(res.data);
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

    this.getNotificationsFromDB();

    // When there's a change in this.fields, it calls the startConversation() function
    this.$watch(
      "fields",
      function () {
        this.startConversation();
      },
      { deep: true }
    );

    this.$watch(
      "arrivalMessage",
      function () {
        this.addArrivalMessage();
      },
      { deep: true }
    );

    this.$watch(
      "messages",
      function () {
        this.scrollToBottom();
      },
      { deep: true }
    );

    this.$watch(
      "userId",
      function () {
        this.getMessagesFromSocket();
      },
      { deep: true }
    );

    // Clears notification if the chat is already active
    this.$watch(
      "notifications",
      function () {
        if (this.currentConversationBoolean) {
          this.deleteNotificationFromDB(this.currentConversationId);
        }
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
  /* height: 70vh; */
  overflow-y: scroll;
  padding-right: 10px;
  height: calc(100vh - 30vh);
  /* scroll-behavior: smooth; */
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

.active-selected {
  border: 1px solid tomato !important;
}
</style>
