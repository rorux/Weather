<template>
  <v-navigation-drawer v-model="isOpen" fixed app>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer",
  props: ["drawer"],
  data: () => ({
    isOpen: false,
    items: [
      {
        icon: "mdi-apps",
        title: "Welcome",
        to: "/",
      },
      {
        icon: "mdi-chart-bubble",
        title: "Inspire",
        to: "/inspire",
      },
    ],
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
