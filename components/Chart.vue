<template>
  <canvas height="300px" ref="canvas"></canvas>
</template>

<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  props: {
    datasets: {
      labels: [],
      data: [],
      label: String,
      borderColor: String,
    },
  },
  mounted() {
    this.renderChart(
      {
        labels: this.datasets.labels,
        datasets: [
          {
            label: this.datasets.label,
            borderColor: this.datasets.borderColor,
            data: this.datasets.data,
            fill: false,
          },
        ],
      },
      {
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
      }
    );
  },
};
</script>
