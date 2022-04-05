<template>
  <v-app>
    <Drawer :drawer.sync="drawer" />
    <AppBar @toggleDrawer="drawer = !drawer" />
    <Content />
    <Footer />
  </v-app>
</template>

<script>
import Drawer from "@/components/app/Drawer";
import AppBar from "@/components/app/AppBar";
import Footer from "@/components/app/Footer";
import Content from "@/components/app/Content";
export default {
  name: "DefaultLayout",
  components: {
    Drawer,
    AppBar,
    Content,
    Footer,
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
