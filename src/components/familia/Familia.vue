<template>
  <div>
    <div class="details">
      <div class="dados">
        <div class="box">
          <label>Selecionar familia:</label>
          <select class="uk-select" id="form-horizontal-select" @change="modal">
            <option>Selecionar</option>
            <option
              v-for="itens in familias"
              :key="itens.cod"
              :value="itens.cod"
            >
              {{ itens.nome }}
            </option>
            <option>Cadastrar Nova Familia</option>
          </select>
        </div>
      </div>
    </div>
    <div v-show="familiaSelecionanda > 0" class="detalhes">
      <detalhes :familia="familia" :admin="admin" :grupo="grupo" />
      <receitas :familia="familia" :usuario="user" />
      <despesas :familia="familia" :usuario="user" />
    </div>

    <vk-modal :show.sync="show" overflow-auto>
      <vk-modal-close @click="fecharModal"></vk-modal-close>
      <vk-modal-title slot="header">Nova Familia</vk-modal-title>

      <form>
        <div class="uk-margin">
          <label class="uk-form-label" for="form-stacked-text"
            >Nome da Fámilia</label
          >
          <div class="uk-form-controls">
            <input
              class="uk-input"
              id="form-stacked-text"
              type="text"
              placeholder="Nome"
              v-model="cadastro.nome"
            />
          </div>
        </div>
      </form>
      <div slot="footer" class="uk-text-right">
        <vk-button class="uk-margin-small-right" @click="fecharModal"
          >Cancelar</vk-button
        >
        <vk-button type="primary" @click.prevent="cadastrar"
          >Cadastrar</vk-button
        >
      </div>
    </vk-modal>
  </div>
</template>
<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

import { mapState } from "vuex";

import Detalhes from "./Detalhes.vue";
import Despesas from "./Despesas.vue";
import Receitas from "./Receitas.vue";
export default {
  components: { Despesas, Receitas, Detalhes },
  computed: mapState(["familias"]),

  data() {
    return {
      isFamilia: true,
      show: false,
      familiaSelecionanda: 0,
      user: {},
      grupo: [],
      familia: {},
      admin: {},
      financas: {
        receitas: [],
        despesas: [],
      },
      cadastro: {
        nome: "",
        usuario: {
          cod: 0,
        },
      },
    };
  },
  methods: {
    loadUser() {
      this.user = JSON.parse(localStorage.getItem(userKey));
    },
    async loadFamilia(cod) {
      await axios
        .get(`${baseApiUrl}/familias/grupos/${cod}`)
        .then((res) => {
          this.familia = res.data;
        })
        .catch(showError);
    },
    async loadReceitas() {
      let f = this.familia;
      if (f.cod) {
        await axios
          .get(`${baseApiUrl}/financas/familias/${f.cod}`)
          .then((res) => {
            this.financa.receitas = res.data.receitas;
          })
          .catch(showError);
      }
    },
    async atualizaFamilia() {
      await this.$store.dispatch("fetchFamilias");
    },
    async setAdmin() {
      if (this.familia.usuarios) {
        let pessoas = this.familia.usuarios;
        this.admin = pessoas.filter(function (obj) {
          return obj.admin == true;
        })[0];
      }
    },
    async setGrupos() {
      let f = this.familia;

      this.grupo = f.usuarios.filter(function (obj) {
        return obj.admin ? (obj.admin = "Admin") : (obj.admin = "Membro");
      });
    },
    async setFinancas() {
      let f = this.familia;
      let u = this.user;
      if (f.cod) {
        await axios
          .get(`${baseApiUrl}/financas/familias/${f.cod}/usuario/${u.cod}`)
          .then((res) => {
            this.financas = res.data;
          })
          .catch(showError);
      }
    },
    modal: async function (evt) {
      if (evt.target.value == "Cadastrar Nova Familia") {
        this.show = !this.show;
        evt.target.value = "Selecionar";
      } else {
        this.show = false;
        let cod = evt.target.value;
        await this.loadFamilia(cod);
        await this.setAdmin();
        await this.setGrupos();
        await this.setFinancas();
        // await this.loadReceitas();

        this.familiaSelecionanda = evt.target.value;

        evt.target[0];
      }
    },
    async cadastrar() {
      if (this.cadastro.nome) {
        this.cadastro.usuario.cod = this.user.cod;
        await axios
          .post(`${baseApiUrl}/familias/`, this.cadastro)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.cadastro = {
              nome: "",
              usuario: {
                cod: 0,
              },
            };
            this.fecharModal();
          })
          .catch(showError);
        await this.loadUser();
        await this.atualizaFamilia();
      }
    },
    fecharModal: function () {
      this.show = !this.show;
    },
  },
  mounted() {
    this.loadUser();
  },
};
</script>
<style scoped>
.familia {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  transition: 0.5s;
}
.details {
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  /* margin-top: 10px; */
}
.details .dados {
  position: relative;
  display: inline;
  height: auto;
  background: var(--white);
  padding: 20px;

  border-radius: 20px;
}

.details .dados .box {
  width: 100%;
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 3fr 1fr;
}

.cardHeader {
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 0;
  margin-bottom: 0;
}

.cardHeader h2 {
  font-weight: 600;
  color: var(--blue);
  padding-bottom: 0;
}
.btn {
  position: relative;
  padding: 5px 10px;
  background: yellowgreen;
  text-decoration: none;
  color: var(--white);
  border-radius: 6px;
}
.uk-tab .uk-active a {
  color: var(--blue);
}
.box {
  display: flex;
  width: 100%;
}
.box label {
  font-size: 1.1em;
  padding-top: 8px;
  margin-right: 15px;
  font-weight: 700;
  color: var(--blue);
}
.box:nth-child(1) {
  justify-content: left;
}

.box .uk-select {
  width: 90%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 1em;
  font-family: "Poppins";
}
.box .uk-select option {
  font-size: 1em;
  font-family: "Poppins";
}
.box .btnAdd {
  letter-spacing: 1px;
}
.btnAdd {
  width: 50%;
}

.btnAdd .btnText {
  margin: 0%;
}
</style>