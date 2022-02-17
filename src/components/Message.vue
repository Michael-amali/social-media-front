<template>
  <div>
    <div :class="this.own ? 'message own' : 'message'">
      <div class="messageTop">
        <img
          class="messageImg"
          src="https://cdn.vuetifyjs.com/images/lists/3.jpg"
          alt=""
        />
        <p class="messageText">
          Hello this is a message Lorem, ipsum dolor siticabcusamus eveniet!
          Culpa.
        </p>
      </div>
      <div class="messageBottom">1 hour ago</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ["own"],

  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
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
