<template>
  <div class="details">
    <div class="recentOrders">
      <div class="cardHeader">
        <h2>Finanças Pessoais</h2>
        <input
          class="uk-input btn"
          type="month"
          max=""
          v-model="dia"
          @change="buscar"
        />
      </div>
      <div class="corpo">
        <div v-if="dados.receitas != null">
          <h2>Receitas</h2>
          <vk-table
            :data="dados.receitas"
            narrowed
            hoverable
            @click.prevent="isSelecionados"
            cell-midlle
          >
            <vk-table-column
              title="Descrição"
              cell="descricao"
              width="2-5"
            ></vk-table-column>
            <vk-table-column
              title="pagamento"
              cell="pagamento"
              width="2-5"
            ></vk-table-column>
            <vk-table-column title="valor" cell="valor"></vk-table-column>
            <vk-table-column
              title="Editar"
              width="1-5"
              class="uk-padding"
              linked
              cell="codmontante"
            >
              <vk-icon-link
                class="uk-margin-small-left btn-editar"
                icon="file-edit"
                slot-scope="{ cell }"
                ratio="1.5"
                @click.prevent="showModal(cell)"
              ></vk-icon-link>
            </vk-table-column>
            <vk-table-column
              title="excluir"
              width="1-5"
              cell="codmontante"
              linked
            >
              <vk-icon-link
                reset
                href
                class="uk-margin-small-left btn-excluir"
                ratio="1.5"
                icon="trash"
                slot-scope="{ cell }"
                @click.prevent="mdExcluir(cell)"
              ></vk-icon-link>
            </vk-table-column>
          </vk-table>
        </div>
        <div v-else>
          <h2>Nenhuma Receita Cadastrada</h2>
        </div>

        <div v-if="dados.despesas != null">
          <h2>Despesas</h2>
          <vk-table
            :data="dados.despesas"
            narrowed
            hoverable
            @click.prevent="isSelecionados"
            cell-midlle
          >
            <vk-table-column
              title="Descrição"
              cell="descricao"
              width="2-5"
            ></vk-table-column>
            <vk-table-column
              title="pagamento"
              cell="pagamento"
              width="2-5"
            ></vk-table-column>
            <vk-table-column title="valor" cell="valor"></vk-table-column>
            <vk-table-column
              title="Editar"
              width="1-5"
              class="uk-padding"
              linked
              cell="codmontante"
            >
              <vk-icon-link
                href="#"
                class="uk-margin-small-left btn-editar"
                icon="file-edit"
                slot-scope="{ cell }"
                ratio="1.5"
                @click.prevent="showModal(cell)"
              ></vk-icon-link>
            </vk-table-column>
            <vk-table-column
              title="excluir"
              width="1-5"
              cell="codmontante"
              linked
            >
              <vk-icon-link
                reset
                href
                slot-scope="{ cell }"
                class="uk-margin-small-left btn-excluir"
                ratio="1.5"
                icon="trash"
                @click.prevent="mdExcluir(cell)"
              ></vk-icon-link>
            </vk-table-column>
          </vk-table>
        </div>
        <div v-else>
          <h2>Nenhuma despesas cadastrada</h2>
        </div>
      </div>
    </div>

    <vk-modal :show.sync="modal">
      <vk-modal-close @click="modal = false"></vk-modal-close>
      <vk-modal-title slot="header">Editar</vk-modal-title>
      <form-financa :objfinanca="financa" />
      <div slot="footer" class="uk-text-right">
        <vk-button class="uk-margin-small-right" @click="modal = false"
          >Cancel</vk-button
        >
        <vk-button type="primary" @click.prevent="editar">Salvar</vk-button>
      </div>
    </vk-modal>

    <vk-modal center :show.sync="showExcluir">
      <vk-modal-close @click="showExcluir = false"></vk-modal-close>
      <h3>
        <vk-icon
          class="uk-margin-medium-right btn-excluir"
          ratio="3"
          icon="warning"
        ></vk-icon>
        Deseja excluir o finança {{ financaExcluir.descricao }} ?
      </h3>
      <div slot="footer" class="uk-text-right">
        <vk-button class="uk-margin-small-right" @click="showExcluir = false"
          >Cancelar</vk-button
        >
        <vk-button type="danger" @click.prevent="excluir">Excluir</vk-button>
      </div>
    </vk-modal>
  </div>
</template>
<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import FormFinanca from "./FormFinanca.vue";
export default {
  name: "FinancasUser",
  components: { FormFinanca },
  props: {
    user: Object,
    financas: {},
  },
  data() {
    return {
      dia: "",
      financa: {},
      financaExcluir: {},
      showExcluir: false,
      modal: false,
      dados: [
        {
          receitas: [
            {
              cod: 0,
              codfinanca: 0,
              descricao: "",
              pagamento: "",
              valor: "",
            },
          ],
          despesas: [
            {
              cod: 0,
              codfinanca: 0,
              descricao: "",
              pagamento: "",
              valor: "",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.dia = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
    this.dados = this.financas;
  },
  methods: {
    async buscar(evt) {
      let dt = evt.target.value;
      await axios
        .get(`${baseApiUrl}/relatorio/usuario/${this.user.cod}/mes/${dt}`)
        .then((res) => {
          this.dados = res.data;
        })
        .catch(showError);
    },
    async getFinancas() {
      await axios
        .get(`${baseApiUrl}/relatorio/usuario/${this.user.cod}/mes/`)
        .then((res) => {
          this.dados = res.data;
        })
        .catch(showError);
    },
    async getMontantes(cod) {
      alert(cod);
      await axios
        .get(`${baseApiUrl}/montantes/${cod}`)
        .then((res) => {
          this.financa = res.data;
        })
        .catch(showError);
    },
    async getMontantesExcluir(cod) {
      await axios
        .get(`${baseApiUrl}/montantes/${cod}`)
        .then((res) => {
          this.financaExcluir = res.data;
          this.showExcluir = true;
        })
        .catch(showError);
    },
    async editar() {
      await this.editarMontantes();
      await this.editarFinanca();
      await this.getFinancas();
      this.modal = false;
    },
    async editarMontantes() {
      let cod = this.financa.codmontante;
      this.financa.cod = cod;
      delete this.financa.codmontante;
      await axios
        .put(`${baseApiUrl}/montantes/${this.financa.cod}`, this.financa)
        .then(() => {})
        .catch(showError);
    },
    async editarFinanca() {
      await axios
        .put(`${baseApiUrl}/financas/${this.financa.codfinanca}`, this.financa)
        .then(() => {
          this.$toasted.global.editSuccess();
        })
        .catch(showError);
    },
    isSelecionados() {
      if (
        this.despesaSelecionada.length > 0 ||
        this.receitaSelecionada.length > 0
      ) {
        this.selecionados = true;
        // if despesaSelecionada ? this.despesaSelecionada : this.receitaSelecionada
      }
    },
    async showModal(cod) {
      await this.getMontantes(cod);
      this.modal = true;
    },
    async mdExcluir(cod) {
      await this.getMontantesExcluir(cod);
    },
    async excluir() {
      let cod = this.financaExcluir.codmontante;

      await axios
        .delete(`${baseApiUrl}/montantes/${cod}`)
        .then(() => {
          this.$toasted.global.editSuccess();
        })
        .catch(showError);
      await this.getFinancas();
      this.showExcluir = false;
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    financas: function (novo, antigo) {
      this.dados = novo;
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
  align-items: center;

  /* margin-top: 10px; */
}

.details .recentOrders {
  width: 100%;
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
  grid-template-columns: 1fr 1fr;
  padding: 10px;
}
.details .recentOrders .corpo div {
  padding: 20px;
}
.details .recentOrders .corpo div h2 {
  color: var(--gray);
  letter-spacing: 1px;
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
  width: 20%;
  position: relative;
  padding: 5px 10px;
  text-decoration: none;
  color: var(--blue);
  border-radius: 6px;
}
.btn-editar {
  color: yellow;
}
.btn-excluir {
  color: red;
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