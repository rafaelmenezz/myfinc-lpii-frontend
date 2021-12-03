<template>
  <div class="details">
    <div class="recentOrders">
      <div class="cardHeader">
        <h2>Despesas</h2>
        <a href="#" class="btn" @click="showModalMotanteDespesas"> Cadastrar</a>
      </div>
      <div class="corpo">
        <div>
          <vk-table
            class="uk-margin table"
            :data="montantesDespesas"
            narrowed
            justified
          >
            <vk-table-column
              title="Descrição"
              cell="descricao"
            ></vk-table-column>
            <vk-table-column title="Usuário" cell="nome"></vk-table-column>
            <vk-table-column title="Email" cell="email"></vk-table-column>
            <vk-table-column
              title="pagamento"
              cell="pagamento"
            ></vk-table-column>
            <vk-table-column title="valor" cell="valor"></vk-table-column>
          </vk-table>
        </div>

        <div>
          <graph-despesas
            :chartdataDespesas="dataDespesas"
            :optionsDespesas="optionsDespesas"
            ref="graficodespesas"
          />
        </div>
      </div>
    </div>

    <vk-modal :show.sync="mdMontanteDespesas">
      <vk-modal-close @click="mdMontanteDespesas = false"></vk-modal-close>
      <vk-modal-title slot="header"> Nova Despesa </vk-modal-title>
      <form>
        <div class="uk-margin">
          <label class="uk-form-label" for="form-stacked-select">Despesa</label>
          <div class="uk-form-controls">
            <select
              class="uk-select"
              id="form-stacked-select"
              @change="mdCadastroDespesas"
              v-model="montanteDespesas.codfinanca"
            >
              <option value="0">Selecionar</option>
              <option
                v-for="itens in myFinancas.despesas"
                :key="itens.index"
                :value="itens.cod"
              >
                {{ itens.descricao }}
              </option>
              <option>Nova Finança</option>
            </select>
          </div>
        </div>

        <div class="uk-margin">
          <label class="uk-form-label" for="form-stacked-text"
            >Forma de Pagamento</label
          >
          <div class="uk-form-controls">
            <input
              class="uk-input"
              type="text"
              placeholder=""
              v-model="montanteDespesas.pagamento"
            />
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="form-stacked-text">Valor</label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              type="text"
              placeholder=""
              v-model="montanteDespesas.valor"
            />
          </div>
        </div>
      </form>

      <div slot="footer" class="uk-text-right">
        <vk-button
          class="uk-margin-small-right"
          @click="mdMontanteDespesas = false"
          >Cancelar</vk-button
        >
        <vk-button type="primary" @click.prevent="cadMontanteDespesas"
          >Cadastrar</vk-button
        >
      </div>
    </vk-modal>
    <vk-modal :show.sync="mdFinancaDespesas">
      <vk-modal-close
        @click="showModalMotanteDespesas = false"
      ></vk-modal-close>
      <vk-modal-title slot="header">Nova Finança</vk-modal-title>
      <form>
        <div class="uk-margin">
          <label class="uk-form-label" for="form-stacked-text">Descrição</label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              type="text"
              v-model="financaDespesas.descricao"
              autocomplete="off"
            />
          </div>
        </div>
      </form>
      <div slot="footer" class="uk-text-right">
        <vk-button
          class="uk-margin-small-right"
          @click="showModalMotanteDespesas"
          >Cancelar</vk-button
        >
        <vk-button type="primary" @click="cadFinancaDespesas"
          >Cadastrar</vk-button
        >
      </div>
    </vk-modal>
  </div>
</template>
<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import GraphDespesas from "./GraphDespesas.vue";

export default {
  name: "FamiliaDespesas",
  components: { GraphDespesas },
  props: {
    familia: Object,
    usuario: Object,
  },
  data() {
    return {
      despesas: [],
      montantesDespesas: [],
      isCadatroFinancaDespesas: false,
      myFinancas: [],

      financaDespesas: {
        descricao: "",
        codfamilia: 0,
        codusuario: 0,
        parentcod: 1,
      },
      montanteDespesas: {
        pagamento: "",
        valor: 0,
        codfinanca: 0,
      },
      myChartDespesas: null,
      mdFinancaDespesas: false,
      mdMontanteDespesas: false,
      dataDespesas: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "nome",
            data: [],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(255, 29, 40)",
              "rgb(24, 165, 24)",
              "rgb(63 72 181)",
              "rgb(102 43 43)",
              "rgb(199 104 38)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      optionsDespesas: {
        parsing: {
          key: "valor",
        },
      },
    };
  },
  methods: {
    async loadDespesas() {
      let f = this.familia;
      if (f.cod) {
        await axios
          .get(`${baseApiUrl}/financas/familias/${f.cod}`)
          .then((resr) => {
            this.despesas = resr.data.despesas;
          })
          .catch(showError);
        await axios
          .get(`${baseApiUrl}/montantes/familias/${f.cod}`)
          .then((resm) => {
            this.montantesDespesas = resm.data.despesas;
            this.dataDespesas.datasets[0].data = resm.data.despesas;
          })
          .catch(showError);
        await axios
          .get(
            `${baseApiUrl}/financas/familias/${f.cod}/usuario/${this.usuario.cod}`
          )
          .then((res) => {
            this.myFinancas = res.data;
          })
          .catch(showError);

        await this.setLabelsDespesas();
      }
    },
    async cadFinancaDespesas() {
      let salvar = this.financaDespesas;
      delete salvar.cod;
      salvar.codusuario = this.usuario.cod;
      salvar.codfamilia = this.familia.cod;
      salvar.parentcod = 1;
      this.resetFinancaDespesas();

      await axios
        .post(`${baseApiUrl}/financas/`, salvar)
        .then((res) => {
          this.$toasted.global.defaultSuccess();
          salvar.cod = res.data.cod;
          this.mdFinancaDespesas = false;
          this.mdMontanteDespesas = false;
        })
        .catch(showError);

      await this.loadDespesas();
    },
    voltaMontanteDespesas() {
      this.mdFinancaDespesas = false;
      this.mdMontanteDespesas = false;
      this.mdMontanteDespesas = true;

      return;
    },
    async cadMontanteDespesas() {
      await axios
        .post(`${baseApiUrl}/montantes/`, this.montanteDespesas)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.mdMontanteDespesas = false;
          this.mdFinancaDepesas = false;
        })
        .catch(showError);

      await this.loadDespesas();
      await this.$refs.graficodespesas.criarGraficoDespesas();
    },
    mdCadastroDespesas: async function (evt) {
      if (evt.target.value == "Nova Finança") {
        this.showModalMotanteDespesas();
        this.showModalFinancaDespesas();
      }
    },
    async showModalMotanteDespesas() {
      this.resetMontanteDespesas();
      this.mdMontanteDespesas = !this.mdMontanteDespesas;
    },
    resetFinancaDespesas() {
      this.financaDepesas = {
        descricao: "",
        codfamilia: 0,
        codusuario: 0,
        parentcod: 2,
      };
    },
    async setLabelsDespesas() {
      let label = [];
      this.montantesDespesas.forEach(function (item, index) {
        label[index] = item.descricao;
      });
      this.dataDespesas.labels = label;
    },
    resetMontanteDespesas() {
      this.montanteDespesas.pagamento = "";
      this.montanteDespesas.valor = 0;
      this.montanteDespesas.codfinanca = 0;
    },
    async showModalFinancaDespesas() {
      this.resetMontanteDespesas();
      this.mdFinancaDespesas = !this.mdfinancaDespesas;
    },
  },
  watch: {
    async familia(val, oldVal) {
      if (val != oldVal) {
        await this.loadDespesas();
        await this.$refs.graficodespesas.criarGraficoDespesas();
        // console.log(this.$refs.grafico.$destroy);
      }
    },
    data(newData) {
      console.log(this.myChart);
      console.log("new data from watcher", newData);
      this.dataDespesas.datasets[0].data = newData;
      this.myChart.renderChart(this.chartData, this.options);
    },
  },
};
</script>
<style scoped>
.details {
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  /* margin-top: 10px; */
}

.details .recentOrders {
  position: relative;
  display: inline;
  height: auto;
  background: var(--white);
  padding: 20px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.28);
  border-radius: 20px;
}
.details .recentOrders .corpo {
  width: 100%;
  position: relative;
  display: inline-grid;
  grid-template-columns: 2fr 1fr;
  padding: 20px;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.cardHeader h2 {
  font-weight: 300;
  color: var(--blue);
}
.btn {
  position: relative;
  padding: 5px 10px;
  background: var(--blue);
  text-decoration: none;
  color: var(--white);
  border-radius: 6px;
}
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

.details .table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  height: auto;
}

.details .table thead td {
  font-weight: 100;
}

.details .recentOrders .table tr {
  color: var(--black1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.details .recentOrders .table tr:last-child {
  border-bottom: none;
}

.details .recentOrders .table tr:hover {
  background: var(--blue);
  color: var(--white);
  transition: 0.4s;
}
.details .recentOrders .table tr td {
  padding: 10px;
}

.details .recentOrders .table tr td:last-child {
  text-align: end;
}
.details .recentOrders .table tr td:nth-child(2) {
  text-align: center;
}
.recentCustomers {
  position: relative;
  display: grid;
  min-height: 500px;
  padding: 20px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.28);
  border-radius: 20px;
}

.recentCustomers .imgBx {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.recentCustomers .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recentCustomers .table tr td:nth-child(1) {
  width: 20%;
}

.recentCustomers .table tr td {
  padding: 12px 10px;
}

.recentCustomers .table tr td h4 {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2em;
}
.recentCustomers .table tr td h4 span {
  font-size: 14px;
  color: var(--black2);
}

.recentCustomers .table tr:hover {
  background: var(--blue);
  color: var(--white);
  transition: 0.5s;
}

.recentCustomers .table tr:hover td h4 span {
  color: var(--white);
}
</style>