<template>
  <v-card class="pa-4 mb-4">
    <div class="text-overline mb-2 blue--text text--darken-4">
      <v-icon class="mr-2 blue--text text--darken-4" small>mdi-cloud</v-icon
      >Погода сегодня
      <v-icon class="blue--text text--darken-4" small>mdi-cloud</v-icon>
    </div>
    <div class="text-caption mb-2">{{ params.description }}</div>
    <div>
      <span class="text-caption">Температура: </span>
      <span class="text-body1 font-weight-bold">{{
        params.temp > 0 ? "+" + params.temp : params.temp
      }}</span>
    </div>
    <div>
      <span class="text-caption">Ветер: </span>
      <span class="text-body1">{{
        Math.round(params.wind.speed) + " м/с"
      }}</span>
      <v-icon color="black" small>{{ windDirection }}</v-icon>
    </div>
    <div>
      <span class="text-caption">Давление: </span>
      <span class="text-body1">{{ params.pressure + " мм рт" }}</span>
    </div>
    <div>
      <span class="text-caption">Влажность: </span>
      <span class="text-body1">{{ params.humidity + "%" }}</span>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    params: {
      sunrise: Number,
      sunset: Number,
      description: String,
      temp: Number,
      pressure: Number,
      humidity: Number,
      wind: {
        speed: Number,
        deg: Number,
        gust: Number,
      },
    },
  },
  computed: {
    windDirection() {
      if (this.params.wind.deg <= 22.5 || this.params.wind.deg > 337.5)
        return "mdi-arrow-down";
      else if (this.params.wind.deg > 22.5 && this.params.wind.deg <= 67.5)
        return "mdi-arrow-down-left";
      else if (this.params.wind.deg > 67.5 && this.params.wind.deg <= 112.5)
        return "mdi-arrow-left";
      else if (this.params.wind.deg > 112.5 && this.params.wind.deg <= 157.5)
        return "mdi-arrow-up-left";
      else if (this.params.wind.deg > 157.5 && this.params.wind.deg <= 202.5)
        return "mdi-arrow-up";
      else if (this.params.wind.deg > 202.5 && this.params.wind.deg <= 247.5)
        return "mdi-arrow-up-right";
      else if (this.params.wind.deg > 247.5 && this.params.wind.deg <= 292.5)
        return "mdi-arrow-right";
      else if (this.params.wind.deg > 292.5 && this.params.wind.deg <= 337.5)
        return "mdi-arrow-down-right";
      else return "mdi-arrow-down";
    },
  },
};
</script>
