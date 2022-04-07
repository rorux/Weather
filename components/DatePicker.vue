<template>
  <v-card class="pa-4">
    <div class="text-overline purple--text text--darken-4">
      <v-icon class="mr-2 purple--text text--darken-4" small
        >mdi-chart-line</v-icon
      >Фильтр по датам<v-icon class="ml-2 purple--text text--darken-4" small
        >mdi-chart-line</v-icon
      >
    </div>
    <v-date-picker
      v-model="datesArray"
      class="mt-4"
      :min="min"
      :max="max"
      range
    ></v-date-picker>
  </v-card>
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    dates: [],
    min: String,
    max: String,
  },
  data: () => ({
    datesArray: [],
  }),
  watch: {
    datesArray: function () {
      this.$emit("update:dates", this.datesArray);
    },
    dates: function (dates) {
      this.datesArray = dates;
    },
  },
  mounted() {
    this.datesArray = this.dates;
  },
};
</script>
