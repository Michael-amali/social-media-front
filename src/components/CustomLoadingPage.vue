<template>
  <div
    :style="{ height: `20px` }"
    class="text-center d-flex justify-content-center align-items-center"
  >
    <v-progress-circular
      indeterminate
      class="align-items-center"
      color="blue"
      size="70"
    >
    </v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "CustomLoadingPage",
  props: {
    color: {
      type: String,
      default: "#47B34B",
    },
    height: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
