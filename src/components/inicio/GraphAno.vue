<template>
  <div class="graphBox">
    <div class="box">
      <canvas id="ano"></canvas>
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
      let ctx = document.getElementById("ano").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
          ],
          datasets: [
            {
              label: "Receitas",
              data: [
                3500, 3850, 4500, 2200, 5000, 3840, 4100, 3850, 4650, 4800,
                3750, 5100,
              ],
              backgroundColor: ["rgba(255, 159, 64, 1)"],
              borderColor: ["rgba(255, 159, 64, 1)"],
              borderWidth: 1,
            },
            {
              label: "Despesas",
              data: [
                1800, 2300, 2750, 2100, 1500, 1645, 3800, 3250, 2820, 3300,
                2100, 3450,
              ],
              backgroundColor: ["rgba(255, 99, 132, 1)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          Animation: {
            transitions: "resize",
          },
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
  display: grid;
  position: relative;
  background: var(--white);
  padding: 20px;
  width: 100%;
  transition: 0.5s;
  justify-content: center;
  align-items: center;
}
canvas {
  max-width: 900px;
  max-height: 250px;
}
</style>