<template>
  <v-app-bar fixed app>
    <v-app-bar-nav-icon @click.stop="$emit('toggleDrawer')" />
    <v-toolbar-title v-text="title" />
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      title: "Vuetify.js",
    };
  },
};
</script>
