export const state = () => ({
  country: "Россия",
  city: "Москва",
  params: {},
});

export const mutations = {
  setCity(state, city) {
    state.city = city;
  },
  setCountry(state, country) {
    state.country = country;
  },
  setParams(state, params) {
    state.params = params;
  },
};

export const actions = {
  async getCityCoordinates({ state }) {
    try {
      const res = await this.$axios.$get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${state.city}&limit=1&appid=${process.env.appId}`
      );
      const { lat, lon } = res[0];
      return { lat, lon };
    } catch (e) {
      throw e;
    }
  },
  async fetchParams({ commit, dispatch }) {
    try {
      const { lat, lon } = await dispatch("getCityCoordinates");
      const params = await this.$axios.$get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.appId}&units=metric&lang=ru`
      );
      commit("setParams", params);
    } catch (e) {
      throw e;
    }
  },
};
