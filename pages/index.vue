<template>
  <v-container class="pa-4">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4" justify="center" align="center">
        <v-text-field
          cols="12"
          sm="8"
          md="6"
          v-model="dateRangeText"
          label="Диапазон дат"
          prepend-icon="mdi-calendar"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="dates"
          class="mt-4"
          min="2022-03-27"
          max="2022-04-10"
          range
        ></v-date-picker>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <Chart />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "@/components/Chart";
import { mapState } from "vuex";
export default {
  name: "IndexPage",
  components: { Chart },
  data: () => ({
    dates: ["2022-03-27", "2022-04-10"],
  }),
  async fetch({ store }) {
    await store.dispatch("fetchParams");
  },
  computed: {
    ...mapState(["params"]),
    dateRangeText() {
      return this.dates
        .sort()
        .map(
          (date) =>
            `${date.substr(8, 2)}.${date.substr(5, 2)}.${date.substr(0, 4)}`
        )
        .join(" - ");
    },
  },
};
</script>
