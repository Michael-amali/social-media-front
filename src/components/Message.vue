<template>
  <div>
    <div v-if="message.text">
      <div :class="this.own ? 'message own' : 'message'">
        <div class="messageTop">
          <img class="messageImg" :src="profileImage" alt="" />
          <p class="messageText">
            {{ message.text }}
          </p>
        </div>
        <div class="messageBottom">{{ this.formattedTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "timeago.js";
export default {
  name: "Message",
  props: ["own", "message"],

  components: {},
  data() {
    return {
      formattedTime: "",
      profileImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
    };
  },
  methods: {
    formatTime() {
      this.formattedTime = format(this.message.createdAt);
    },

    scrollToLastMessage() {
      let chatBoxTop = this.$refs.chatBoxId;
      chatBoxTop?.scrollIntoView({ behavior: "smooth", block: "end" });
    },
  },
  mounted() {
    this.formatTime();
    // this.scrollToLastMessage();
  },
};
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.messageTop {
  display: flex;
}
.messageImg {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.messageText {
  padding: 10px;
  border-radius: 20px;
  background-color: #5e60ac;
  color: white;
  max-width: 300px;
}

.messageBottom {
  font-size: 12px;
  margin-top: 10px;
}

.message.own {
  align-items: flex-end;
}

.message.own .messageText {
  background-color: lightgray;
  color: black;
}
</style>
