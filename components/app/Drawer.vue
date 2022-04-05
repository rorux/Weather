<template>
  <v-navigation-drawer v-model="isOpen" fixed app>
    <Menu />
  </v-navigation-drawer>
</template>

<script>
import Menu from "@/components/Menu";
export default {
  name: "Drawer",
  props: ["drawer"],
  components: { Menu },
  data: () => ({
    isOpen: false,
  }),
  watch: {
    isOpen: function () {
      this.$emit("update:drawer", this.isOpen);
    },
    drawer: function (drawer) {
      this.isOpen = drawer;
    },
  },
  mounted() {
    this.isOpen = this.drawer;
  },
};
</script>
