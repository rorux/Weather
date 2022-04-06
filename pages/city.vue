<template>
  <v-container class="pa-6">
    <div class="text-overline mb-6">Выберите город:</div>
    <v-row>
      <v-col cols="12" sm="6" md="5">
        <v-select
          @change="changeCountry"
          v-model="countrySelect"
          :items="countries"
          label="Страна"
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="5">
        <v-select
          @change="changeCity"
          v-model="citySelect"
          :items="cities"
          label="Город"
          dense
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { countryList, cityList } from "@/services/guides";
import { mapState, mapMutations } from "vuex";
export default {
  name: "City",
  data: () => ({
    countrySelect: null,
    citySelect: null,
    countries: countryList,
  }),
  computed: {
    ...mapState(["city", "country"]),
    cities() {
      return cityList[this.countrySelect];
    },
  },
  methods: {
    ...mapMutations(["setCity", "setCountry", "setParams"]),
    changeCountry(country) {
      this.setCountry(country);
      this.setCity(null);
      this.setParams({});
    },
    changeCity(city) {
      this.setCity(city);
    },
  },
  mounted() {
    this.countrySelect = this.country;
    this.citySelect = this.city;
  },
};
</script>
