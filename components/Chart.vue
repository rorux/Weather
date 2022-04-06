<template>
  <canvas height="200px" ref="canvas"></canvas>
</template>

<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ],
        datasets: [
          {
            label: "Коммиты на GitHub",
            borderColor: "#f87979",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
            fill: false,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>
