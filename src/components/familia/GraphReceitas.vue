<template>
  <div class="box" id="box" ref="box"></div>
</template>
<script>
import Chart from "chart.js/auto";

export default {
  name: "GraphReceitas",
  props: {
    familia: Object,
    data: Object,
    chartdata: Object,
    options: Object,
  },
  data() {
    return {
      myChart: "",
      myData: {},
    };
  },
  mounted() {
    this.criarGrafico();
  },

  methods: {
    criarGrafico: async function () {
    
      let box = document.getElementById("box");
      box.innerHTML = "&nbsp;";
      box.innerHTML = "<canvas id='receitas' ref='canvas'></canvas>";

      const ctx = document.getElementById("receitas").getContext("2d");
      this.myChart = new Chart(ctx, {
        type: "doughnut",
        data: this.chartdata,
        options: this.options,
      });
    },
  },
  update() {
    this.$nextTick(async function () {
      await this.criarGrafico();
    });
  },
  async destroyed() {
    this.destroyed();
  },
  watch: {
    async familia(val, oldVal) {
      if (val != oldVal) {
        //await this.$refs.canvas.update();
        alert("aqui");
        await this.criarGrafico();
      }
    },
    // eslint-disable-next-line no-unused-vars
    async chartData(newData, oldData) {
      console.log(this.myChart);
      console.log("new data from watcher", newData);
      this.chartData.datasets[0].data = newData;
      this.myChart.renderChart(this.chartData, this.options);
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