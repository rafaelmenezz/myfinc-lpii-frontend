<template>
  <div class="graphBox">
    <div class="box">
      <canvas id="receitas"></canvas>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js/auto";

export default {
  name: "GraphReceitas",
  data() {
    return {
      myChart: "",
    };
  },
  mounted() {
    this.criarGrafico();
  },
  methods: {
    criarGrafico: function () {
      let ctx = document.getElementById("receitas").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "My First Dataset",
              data: [300, 50, 100],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          onClick: (e) => {
            const points = myChart.getElementsAtEventForMode(
              e,
              "nearest",
              { intersect: true },
              true
            );

            if (points.length) {
              const firstPoint = points[0];
              const label = myChart.data.labels[firstPoint.index];
              const value =
                myChart.data.datasets[firstPoint.datasetIndex].data[
                  firstPoint.index
                ];
              const financa =
                myChart.data.datasets[firstPoint.datasetIndex].label;

              alert(label + " - " + value + " - " + financa);
            }
          },
        },
      });
    },
  },
};
</script>
<style scoped>
.graphBox {
  position: relative;
  width: 100%;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  min-height: 300px;
}
.graphBox .box {
  position: relative;
  background: var(--white);
  padding: 20px;
  width: 100%;
  transition: 0.5s;
}
canvas {
  max-height: 300px;
}
</style>