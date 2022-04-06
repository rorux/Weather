<template>
  <v-container class="pa-4">
    <v-row v-if="city === null">
      <v-col>Не выбран город!</v-col>
    </v-row>
    <v-row v-else justify="center" align="center">
      <v-col cols="12" sm="10" md="6" justify="center" align="center">
        <ForecastToday :params="today" />
        <v-card class="pa-4">
          <div class="text-overline mb-6">Выбор дат для графиков</div>
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
        </v-card>
      </v-col>
      <v-col cols="12" sm="10" md="6" justify="center" align="center">
        <v-card class="pa-4 mb-4">
          <Chart />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "@/components/Chart";
import ForecastToday from "@/components/ForecastToday";
import { mapState } from "vuex";
export default {
  name: "IndexPage",
  components: { Chart, ForecastToday },
  data: () => ({
    today: {
      sunrise: 0,
      sunset: 0,
      description: "",
      temp: 0,
      pressure: 0,
      humidity: 0,
      wind: {
        speed: 0,
        deg: 0,
        gust: 0,
      },
    },
    dates: ["2022-03-27", "2022-04-10"],
  }),
  async fetch({ store }) {
    await store.dispatch("fetchParams");
  },
  computed: {
    ...mapState(["params", "city"]),
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
  mounted() {
    this.today.sunrise = this.params.city.sunrise;
    this.today.sunset = this.params.city.sunset;
    this.today.description = this.params.list[0].weather[0].description;
    this.today.temp = Math.round(this.params.list[0].main.temp);
    this.today.pressure = Math.round(this.params.list[0].main.pressure / 1.333);
    this.today.humidity = this.params.list[0].main.humidity;
    this.today.wind = this.params.list[0].wind;
  },
};
</script>
