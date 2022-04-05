<template>
  <v-app-bar fixed app>
    <v-app-bar-nav-icon @click.stop="$emit('toggleDrawer')" />
    <v-toolbar-title v-text="city" />
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppBar",
  computed: {
    ...mapState(["city"]),
  },
};
</script>
