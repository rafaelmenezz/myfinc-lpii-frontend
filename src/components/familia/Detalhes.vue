<template>
  <div class="detalhes">
    <div class="details">
      <div class="recentOrders">
        <div class="cardHeader">
          <h2>Detalhes</h2>
          <div class="menu" v-show="admin.cod == user.cod">
            <vk-icon-button
              href="#"
              class="bt editar"
              icon="pencil"
              @click.prevent="editar"
            ></vk-icon-button>
            <vk-icon-button
              href="#"
              class="bt excluir"
              icon="trash"
              @click.prevent="deletar"
            ></vk-icon-button>
          </div>
        </div>
        <div class="corpo">
          <form class="uk-form-stacked">
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                Nome
              </label>
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="form-stacked-text"
                  type="text"
                  placeholder="Some text..."
                  v-model="familia.nome"
                  :disabled="!edit"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                Administrador
              </label>
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="form-stacked-text"
                  type="text"
                  placeholder="Some text..."
                  v-model="admin.nome"
                  disabled
                />
              </div>
            </div>
            <div class="uk-margin" v-show="edit">
              <vk-button type="primary" @click.prevent="salvarEdicao"
                >Salvar</vk-button
              >
            </div>
          </form>
        </div>
      </div>

      <!-- New Customer -->
    </div>
    <div class="details">
      <div class="recentOrders">
        <div class="cardHeader">
          <h2>Grupo</h2>
          <div class="menu">
            <a href="#" class="btn" @click="mdConvite = true"  v-show="admin.cod == user.cod"> convidar</a>
        
          </div>
        </div>
        <div class="corpo">
          <div v-if="grupo">
            <vk-table :data="grupo" narrowed>
              <vk-table-column title="Name" cell="nome"></vk-table-column>
              <vk-table-column title="Email" cell="email"></vk-table-column>
              <vk-table-column
                title="Telefone"
                cell="telefone"
              ></vk-table-column>
              <vk-table-column title="Admin" cell="admin"></vk-table-column>
            </vk-table>
          </div>

          <!-- <table class="table">
            <thead>
              <tr>
                <td>Nome</td>
                <td>Email</td>
                <td>Telefone</td>
                <td>Admin</td>
              </tr>
            </thead>
            <tbody v-for="item in familia.usuarios" :key="item.cod">
              <tr>
                <td>{{ item.nome }}</td>
                <td>{{ item.email }}</td>
                <td>
                  {{
                    !item.telefone ? "telefone não cadastrado" : item.telefone
                  }}
                </td>
                <td>{{ item.admin ? "Admin" : "Menbro" }}</td>
              </tr>
            </tbody>
          </table> -->
        </div>
      </div>

      <!-- New Customer -->
    </div>
    <vk-modal :show.sync="mdConvite">
      <vk-modal-close @click="mdConvite = false"></vk-modal-close>
      <vk-modal-title slot="header"
        >Convidar para {{ familia.nome }}</vk-modal-title
      >
      <form>
        <div class="uk-margin">
          <label class="uk-form-label" for="form-stacked-text">Email</label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              type="email"
              placeholder="exemplo@exemplo.com"
              v-model="convite.email"
            />
          </div>
        </div>
      </form>
      <div slot="footer" class="uk-text-right">
        <vk-button class="uk-margin-small-right" @click="mdConvite = false"
          >Cancelar</vk-button
        >
        <vk-button type="primary" @click="convidar">Enviar</vk-button>
      </div>
    </vk-modal>
  </div>
</template>
<script>
import { baseApiUrl, showError } from "@/global";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Detalhes",
  computed: mapState(["familias", "user"]),
  props: {
    familia: Object,
    admin: Object,
    grupo: Array,
  },
  data() {
    return {
      edit: false,
      mdConvite: false,
      convite: {},
    };
  },
  methods: {
    editar() {
      this.edit = !this.edit;
    },
    async convidar() {
      this.convite.codusuario = this.user.cod;
      this.convite.codfamilia = this.familia.cod;
      await axios
        .post(`${baseApiUrl}/convidar/`, this.convite)
        .then(() => {
          this.$toasted.global.conviteSuccess();
          this.$store.dispatch("fetchAvisos");
          this.mdConvite = false;
        })
        .catch(showError);
    },
    async salvarEdicao() {
      let obj = {};
      obj = this.familia;
      delete obj.usuarios;
      obj.usuario = this.admin;

      await axios
        .put(`${baseApiUrl}/familias/`, obj)
        .then(() => {
          this.$toasted.global.editSuccess();
          this.$store.dispatch("fetchFamilias");
        })
        .catch(showError);
      this.editar();
    },

    async deletar() {
      await axios
        .delete(`${baseApiUrl}/familias/${this.familia.cod}`)
        .then(() => {
          this.$store.dispatch("fetchFamilias");
          this.familia.cod = 0;
        })
        .catch(showError);
      window.location = "/familia";
    },
    async loadFamilia(cod) {
      let dados = {};

      await axios
        .get(`${baseApiUrl}/familias/grupos/${cod}`, this.user)
        .then((res) => {
          dados = res.data;
        })
        .catch(showError);

      return dados;
    },
    setAdmin() {
      let pessoas = this.familia.usuarios;

      this.admin = pessoas.filter(function (obj) {
        return obj.admin == true;
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.detalhes {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
}
.details {
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;

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
  grid-template-columns: 1fr;
}

label {
  font-family: "Poppins";
  font-size: 1.2em;
  font-weight: 600;
  color: var(--gray);
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
.menu .bt {
  position: relative;
  text-decoration: none;
  margin-left: 5px;
}
.menu .convidar {
  color: var(--white);
  background: var(--blue);
}
.menu .editar {
  color: var(--gray);
  background: yellow;
}
.menu .excluir {
  color: var(--white);
  background: red;
}
.btn {
  position: relative;
  padding: 5px 10px;
  background: var(--blue);
  text-decoration: none;
  color: var(--white);
  border-radius: 6px;
}

.details .table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  height: auto;
}

.details .table thead td {
  font-weight: 600;
}
.details .table thead tr:hover {
  background: var(--white);
}

.details .recentOrders .table tr {
  color: var(--black1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.details .recentOrders .table thead tr:nth-child(1):hover {
  background: var(--white);
  color: var(--black1);
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