<template>
  <v-container class="pa-4">
    <v-row v-if="city === null">
      <v-col class="text-body-2 red--text">Не выбран город!</v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col cols="12" sm="10" md="6" justify="center" align="center">
        <ForecastToday :params="today" />
        <v-card class="pa-4">
          <div class="text-overline purple--text text--darken-4">
            <v-icon class="mr-2 purple--text text--darken-4" small
              >mdi-chart-line</v-icon
            >Фильтр по датам<v-icon
              class="ml-2 purple--text text--darken-4"
              small
              >mdi-chart-line</v-icon
            >
          </div>
          <v-date-picker
            v-model="dates"
            class="mt-4"
            :min="dateBegin"
            :max="dateEnd"
            range
          ></v-date-picker>
        </v-card>
      </v-col>
      <v-col cols="12" sm="10" md="6" justify="center" align="center">
        <v-card class="pa-4 mb-4">
          <Chart :datasets="tempDatasets" :key="key" />
        </v-card>
        <v-card class="pa-4 mb-4">
          <Chart :datasets="humidityDatasets" :key="key" />
        </v-card>
        <v-card class="pa-4 mb-4">
          <Chart :datasets="pressureDatasets" :key="key" />
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
    key: 0,
    today: {
      sunrise: 0,
      sunset: 0,
      description: "",
      temp: 0,
      feels_like: 0,
      pressure: 0,
      humidity: 0,
      wind: {
        speed: 0,
        deg: 0,
        gust: 0,
      },
    },
    dates: [],
    dateBegin: "",
    dateEnd: "",
    tempDatasets: {
      labels: [],
      data: [],
      label: "Температура (по Цельсию)",
      borderColor: "green",
    },
    humidityDatasets: {
      labels: [],
      data: [],
      label: "Влажность (%)",
      borderColor: "blue",
    },
    pressureDatasets: {
      labels: [],
      data: [],
      label: "Давление (мм рт)",
      borderColor: "#f87979",
    },
  }),
  async fetch({ store }) {
    await store.dispatch("fetchParams");
  },
  computed: {
    ...mapState(["params", "city"]),
  },
  watch: {
    dates() {
      if (this.dates.length === 2) {
        const sortedDates = [...this.dates].sort();
        this.tempDatasets.labels = [];
        this.humidityDatasets.labels = [];
        this.pressureDatasets.labels = [];
        this.tempDatasets.data = [];
        this.humidityDatasets.data = [];
        this.pressureDatasets.data = [];

        this.params.list.forEach((el) => {
          if (
            new Date(el.dt_txt) >= new Date(`${sortedDates[0]} 00:00:00`) &&
            new Date(el.dt_txt) < new Date(`${sortedDates[1]} 23:59:59`)
          ) {
            const dt_txt_edit =
              el.dt_txt.substr(8, 2) +
              "." +
              el.dt_txt.substr(5, 2) +
              " " +
              el.dt_txt.substr(11, 5);

            this.tempDatasets.labels.push(dt_txt_edit);
            this.humidityDatasets.labels.push(dt_txt_edit);
            this.pressureDatasets.labels.push(dt_txt_edit);
            this.tempDatasets.data.push(Math.round(el.main.temp));
            this.humidityDatasets.data.push(el.main.humidity);
            this.pressureDatasets.data.push(
              Math.round(el.main.pressure / 1.333)
            );
            this.key++;
          }
        });
      }
    },
  },
  mounted() {
    this.today.sunrise = this.params.city.sunrise;
    this.today.sunset = this.params.city.sunset;
    this.today.description = this.params.list[0].weather[0].description;
    this.today.temp = Math.round(this.params.list[0].main.temp);
    this.today.feels_like = Math.round(this.params.list[0].main.feels_like);
    this.today.pressure = Math.round(this.params.list[0].main.pressure / 1.333);
    this.today.humidity = this.params.list[0].main.humidity;
    this.today.wind = this.params.list[0].wind;

    this.dateBegin = this.params.list[0].dt_txt.substr(0, 10);
    this.dateEnd = this.params.list[this.params.list.length - 1].dt_txt.substr(
      0,
      10
    );

    this.params.list.forEach((el) => {
      const dt_txt_edit =
        el.dt_txt.substr(8, 2) +
        "." +
        el.dt_txt.substr(5, 2) +
        " " +
        el.dt_txt.substr(11, 5);
      this.tempDatasets.labels.push(dt_txt_edit);
      this.humidityDatasets.labels.push(dt_txt_edit);
      this.pressureDatasets.labels.push(dt_txt_edit);
      this.tempDatasets.data.push(Math.round(el.main.temp));
      this.humidityDatasets.data.push(el.main.humidity);
      this.pressureDatasets.data.push(Math.round(el.main.pressure / 1.333));
    });
    this.key++;
  },
};
</script>
