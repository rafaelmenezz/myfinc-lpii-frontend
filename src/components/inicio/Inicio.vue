<template>
  <div>
    <card-box :dados="dataCardBox" />
    <user-receitas />
    <user-despesas :usuario="user" />
    <financa-ano />
  </div>
</template>
<script>
import { baseApiUrl, userKey, showError } from "@/global";
import axios from "axios";

import CardBox from "./CardBox.vue";
import UserDespesas from "./UserDespesas.vue";
import userReceitas from "./UserReceitas.vue";
import FinancaAno from "./FinancasAno.vue";
export default {
  name: "Inicio",
  components: { CardBox, UserDespesas, userReceitas, FinancaAno },

  data() {
    return {
      user: {},
      financas: {},
      montantes: {},
      dadosAno: {},

      dataCardBox: {
        receitaMes: 0,
        despesaMes: 0,
        receitasAno: 0,
        despesasAno: 0,
      },
    };
  },
  methods: {
    async loadUser() {
      this.user = await JSON.parse(localStorage.getItem(userKey));
    },
    async loadFinancas() {
      await axios
        .get(`${baseApiUrl}/financas/usuarios/${this.user.cod}`)
        .then((res) => {
          this.financas = res.data;
        })
        .catch(showError);
    },
    async loadMontantes() {
      await axios
        .get(`${baseApiUrl}/relatorio/usuario/${this.user.cod}/mes/`)
        .then((res) => {
          this.montantes = res.data;
        })
        .catch(showError);
    },

    async loadAno() {
      await axios
        .get(`${baseApiUrl}/relatorio/usuario/${this.user.cod}/ano/`)
        .then((res) => {
          this.dadosAno = res.data;
        })
        .catch(showError);
    },
  },
  async mounted() {
    await this.loadUser();
    await this.loadFinancas();
    await this.loadMontantes();
    await this.loadAno();

    this.dataCardBox.receitaMes = this.montantes.totalreceitas.valor;
    this.dataCardBox.despesaMes = this.montantes.totaldespesas.valor;
    this.dataCardBox.receitasAno = this.dadosAno.totalreceitas.total;
    this.dataCardBox.despesasAno = this.dadosAno.totaldespesas.total;
  },
};
</script>
<style scoped>
</style>