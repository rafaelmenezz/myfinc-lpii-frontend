<template>
  <div class="box" id="boxDespesas" ref="boxDespesas"></div>
</template>
<script>
import Chart from "chart.js/auto";

export default {
  name: "GraphDespesas",
  props: {
    familia: Object,
    dataDespesas: Object,
    chartdataDespesas: Object,
    optionsDespesas: Object,
  },
  data() {
    return {
      myChartDespesas: "",
      myDataDespesas: {},
    };
  },
  mounted() {
    this.criarGraficoDespesas();
  },
  methods: {
    criarGraficoDespesas: async function () {
      let box = document.getElementById("boxDespesas");
      box.innerHTML = "&nbsp;";
      box.innerHTML = "<canvas id='despesas' ref='canvasDespesas'></canvas>";

      const ctxd = document.getElementById("despesas").getContext("2d");
      this.myChartDespesas = new Chart(ctxd, {
        type: "doughnut",
        data: this.chartdataDespesas,
        options: this.optionsDespesas,
      });
    },
  },
  update() {
    this.$nextTick(async function () {
      await this.criarGraficoDespesas();
    });
  },
  watch: {
    async familia(val, oldVal) {
      if (val != oldVal) {
        //await this.$refs.canvas.update();

        await this.criarGraficoDespesas();
      }
    },
    // eslint-disable-next-line no-unused-vars
    async chartData(newData, oldData) {
      console.log(this.myChartDespesas);
      console.log("new data from watcher", newData);
      this.chartdataDespesas.datasets[0].data = newData;
      this.myChartDespesas.renderChart(
        this.chartDataDespesas,
        this.optionsDespesas
      );
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