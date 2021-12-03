<template>
  <div class="perfil">
    <div class="details">
      <div class="dados">
        <div class="cardHeader">
          <h2>Meus Dados</h2>
          <vk-icon-button
            v-if="!isEdit"
            href="#"
            class="bt hEditar"
            icon="file-edit"
            @click.prevent="editar"
          ></vk-icon-button>
          <vk-icon-button
            v-else
            href="#"
            class="bt editar"
            icon="file-edit"
            @click.prevent="editar"
          ></vk-icon-button>
        </div>

        <form>
          <div class="uk-margin">
            <input
              class="uk-input"
              type="text"
              placeholder="Nome"
              :disabled="!isEdit"
              v-model="user.nome"
            />
          </div>

          <div class="uk-margin">
            <input
              class="uk-input"
              type="text"
              placeholder="Email"
              disabled
              v-model="user.email"
            />
          </div>

          <div class="uk-margin">
            <input
              class="uk-input"
              type="text"
              placeholder="Telefone não cadastrado"
              :disabled="!isEdit"
              v-model="user.telefone"
            />
          </div>
        </form>
        <div v-show="isEdit">
          <vk-button type="primary" @click.prevent="salvarEdicao"
            >Salvar</vk-button
          >
        </div>
      </div>
    </div>
    <div class="details">
      <div class="dados">
        <div class="cardHeader">
          <h2>Convites</h2>
        </div>
        <div class="mensagens" v-if="avisos">
          <vk-tabs align="justify">
            <vk-tabs-item title="Recebidos">
              <vk-table
                v-if="destinatario.length > 0"
                :data="destinatario"
                :selected-rows.sync="destinatarioSelecionado"
                row-selectable
                narrowed
              >
                <vk-table-column
                  title="familia"
                  cell="familia"
                ></vk-table-column>
                <vk-table-column
                  title="remetente"
                  cell="remetente"
                ></vk-table-column>
                <vk-table-column title="Status" cell="status"></vk-table-column>
              </vk-table>
              <h2 v-else>Não há convites para mostrar.</h2>
              <div
                class="cardFooter"
                v-show="
                  destinatarioSelecionado.length > 0 &&
                  destinatario[destinatarioSelecionado].codstatus == 1
                "
              >
                <vk-icon-button
                  href="#"
                  class="bt hEditar"
                  icon="check"
                  @click.prevent="aceitar(destinatarioSelecionado)"
                ></vk-icon-button>
                <vk-icon-button
                  href="#"
                  class="bt editar"
                  icon="close"
                  @click.prevent="recusar(destinatarioSelecionado)"
                ></vk-icon-button>
              </div>
            </vk-tabs-item>
            <vk-tabs-item title="Enviados">
              <vk-table
                v-if="remetentes.length > 0"
                :data="remetentes"
                :selected-rows.sync="remetenteSelecionado"
                row-selectable
                narrowed
              >
                <vk-table-column title="email" cell="email"></vk-table-column>
                <vk-table-column
                  title="familia"
                  cell="familia"
                ></vk-table-column>
                <vk-table-column title="status" cell="status"></vk-table-column>
              </vk-table>
              <h2 v-else>Não há convites para mostrar.</h2>
              <div class="cardFooter" v-show="remetenteSelecionado.length > 0">
                <vk-icon-button
                  href="#"
                  class="bt excluir"
                  icon="trash"
                  @click.prevent="deletarConvite(remetenteSelecionado)"
                ></vk-icon-button>
              </div>
            </vk-tabs-item>
          </vk-tabs>
        </div>
        <div class="mensagens" v-else>
          <h2>Você não possui mensagens!</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { baseApiUrl, showError, userKey } from "@/global";

import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      isEdit: false,
      user: "",
      remetentes: [],
      destinatario: [],
      remetenteSelecionado: [],
      destinatarioSelecionado: [],
      data: [
        { name: "John A. Smith", city: "San Francisco", state: "CA" },
        { name: "Joan B. Jones", city: "New York", state: "NY" },
        { name: "Bob C. Uncle", city: "Los Angeles", state: "CA" },
      ],
    };
  },
  computed: mapState(["avisos"]),
  methods: {
    async loadAvisos() {
      await this.$store.dispatch("fetchAvisos");
      const json = localStorage.getItem(userKey);

      const usuario = await JSON.parse(json);

      const jsonAvisos = localStorage.getItem("avisos");
      const convites = await JSON.parse(jsonAvisos);

      if (convites.length >= 0) {
        this.remetentes = convites.filter(function (obj) {
          return obj.codusuario == usuario.cod;
        });
        this.destinatario = convites.filter(function (obj) {
          return obj.email == usuario.email;
        });
      }

      this.user = usuario;
    },
    async salvarEdicao() {
      await axios
        .put(`${baseApiUrl}/usuarios/${this.user.cod}`, this.user)
        .then(() => {
          this.$store.commit("setUser", this.user);
          localStorage.setItem(userKey, JSON.stringify(this.user));
          this.$toasted.global.editSuccess();
          this.editar();
        })
        .catch(showError);
    },
    async deletarConvite(obj) {
      await axios
        .delete(`${baseApiUrl}/convites/${this.remetentes[obj].cod}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
        })
        .catch(showError);

      this.loadAvisos();
    },

    async aceitar(obj) {
      let convite = this.destinatario[obj];
      convite.codconvidado = this.user.cod;
      await axios
        .put(`${baseApiUrl}/convites/aceitar/${convite.cod}`, convite)
        .then(() => {
          this.$toasted.global.defaultSuccess();
        })
        .catch(showError);
      this.loadAvisos();
    },
       async recusar(obj) {
      let convite = this.destinatario[obj];
      convite.codconvidado = this.user.cod;
      await axios
        .put(`${baseApiUrl}/convites/recusar/${convite.cod}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
        })
        .catch(showError);
      this.loadAvisos();
    },

    editar() {
      this.isEdit = !this.isEdit;
    },
  },
  async mounted() {
    this.loadAvisos();
  },
};
</script>
<style scoped>
.perfil {
  width: 100%;
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 2fr;
}
.details {
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  min-height: 350px;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  /* margin-top: 10px; */
}
.details .dados {
  position: relative;
  width: 100%;
  display: inline;
  min-height: 300px;
  background: var(--white);
  padding: 20px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.bt {
  margin-left: 5px;
}
.bt.hEditar {
  background: var(--green);
  color: var(--white);
}
.bt.editar {
  background: var(--blue);
  color: var(--white);
}
.cardHeader h2 {
  font-weight: 300;
  color: var(--blue);
  font-family: "Poppins";
  font-size: 1.3em;
}

.cardFooter {
  display: flex;
  justify-content: right;
  align-items: flex-start;
}
.cardFooter .excluir {
  background: red;
  color: var(--white);
  font-weight: 600;
}
.btn {
  position: relative;
  padding: 5px 10px;
  background: yellowgreen;
  text-decoration: none;
  color: var(--white);
  border-radius: 6px;
}
.mensagens h2 {
  color: var(--gray);
  text-align: center;
  vertical-align: center;
}
.details .dados .table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  height: auto;
}

.details .dados .table thead td {
  font-weight: 600;
}

.details .dados .table tr {
  color: var(--black1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.details .dados .table tr:last-child {
  border-bottom: none;
}

.details .dados .table tr:hover {
  background: var(--blue);
  color: var(--white);
  transition: 0.4s;
}
.details .dados .table tr td {
  padding: 10px;
}

.details .dados .table tr td:last-child {
  text-align: end;
}
.details .dados .table tr td:nth-child(2) {
  text-align: center;
}
</style>