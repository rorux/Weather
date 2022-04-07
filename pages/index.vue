<template>
  <v-container class="pa-4">
    <v-row v-if="city === null">
      <v-col class="text-body-2 red--text">Не выбран город!</v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col cols="12" sm="10" md="6" justify="center" align="center">
        <ForecastToday :params="today" />
        <DatePicker :dates.sync="dates" :min="dateBegin" :max="dateEnd" />
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
        <v-card class="pa-4 mb-4">
          <Chart :datasets="fullDatasets" :key="key" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "@/components/Chart";
import ForecastToday from "@/components/ForecastToday";
import DatePicker from "@/components/DatePicker";
import { mapState } from "vuex";
export default {
  name: "IndexPage",
  head: {
    title: "Прогноз на 5 дней",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Прогноз погоды на ближайшие 5 дней",
      },
    ],
  },
  components: { Chart, ForecastToday, DatePicker },
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
      datasets: [
        {
          data: [],
          label: "Температура (по Цельсию)",
          borderColor: "green",
          fill: false,
        },
      ],
    },
    humidityDatasets: {
      labels: [],
      datasets: [
        { data: [], label: "Влажность (%)", borderColor: "blue", fill: false },
      ],
    },
    pressureDatasets: {
      labels: [],
      datasets: [
        {
          data: [],
          label: "Давление (мм рт)",
          borderColor: "#f87979",
          fill: false,
        },
      ],
    },
    fullDatasets: {
      labels: [],
      datasets: [],
    },
  }),
  async fetch({ store }) {
    await store.dispatch("fetchParams");
  },
  computed: {
    ...mapState(["params", "city"]),
  },
  methods: {
    updateDatasets(el) {
      const dt_txt_edit =
        el.dt_txt.substr(8, 2) +
        "." +
        el.dt_txt.substr(5, 2) +
        " " +
        el.dt_txt.substr(11, 5);

      this.tempDatasets.labels.push(dt_txt_edit);
      this.humidityDatasets.labels.push(dt_txt_edit);
      this.pressureDatasets.labels.push(dt_txt_edit);
      this.fullDatasets.labels.push(dt_txt_edit);
      this.tempDatasets.datasets[0].data.push(Math.round(el.main.temp));
      this.humidityDatasets.datasets[0].data.push(el.main.humidity);
      this.pressureDatasets.datasets[0].data.push(
        Math.round(el.main.pressure / 1.333)
      );
    },
  },
  watch: {
    dates() {
      if (this.dates.length === 2) {
        const sortedDates = [...this.dates].sort();
        this.tempDatasets.labels = [];
        this.humidityDatasets.labels = [];
        this.pressureDatasets.labels = [];
        this.fullDatasets.labels = [];
        this.tempDatasets.datasets[0].data = [];
        this.humidityDatasets.datasets[0].data = [];
        this.pressureDatasets.datasets[0].data = [];

        this.params.list.forEach((el) => {
          const dt = el.dt_txt.substr(0, 10) + "T" + el.dt_txt.substr(11, 8);
          if (
            Date.parse(dt) >= Date.parse(`${sortedDates[0]}T00:00:00`) &&
            Date.parse(dt) < Date.parse(`${sortedDates[1]}T23:59:59`)
          ) {
            this.updateDatasets(el);
          }
        });
        this.fullDatasets.datasets[0] = this.tempDatasets.datasets[0];
        this.fullDatasets.datasets[1] = this.humidityDatasets.datasets[0];
        this.fullDatasets.datasets[2] = this.pressureDatasets.datasets[0];
        this.key++;
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
      this.updateDatasets(el);
    });
    this.fullDatasets.datasets[0] = this.tempDatasets.datasets[0];
    this.fullDatasets.datasets[1] = this.humidityDatasets.datasets[0];
    this.fullDatasets.datasets[2] = this.pressureDatasets.datasets[0];
    this.key++;
  },
};
</script>
