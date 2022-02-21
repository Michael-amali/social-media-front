<template>
  <v-app>
    <v-main>
      <!-- v-bind key ensure there's reload of page-->
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
