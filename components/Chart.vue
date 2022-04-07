<template>
  <canvas height="300px" ref="canvas"></canvas>
</template>

<script>
import { Line } from "vue-chartjs";
export default {
  name: "Chart",
  extends: Line,
  props: {
    datasets: {
      labels: [],
      datasets: [
        { data: [], label: String, borderColor: String, fill: Boolean },
      ],
    },
  },
  mounted() {
    this.renderChart(this.datasets, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              maxTicksLimit: 5,
            },
          },
        ],
      },
    });
  },
};
</script>
