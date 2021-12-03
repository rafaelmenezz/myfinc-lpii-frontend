<template>
  <div class="main uk-overflow-auto uk-position-center-right">
    <Header icon="pull" main="Receita" />
    <hr />
    <div class="uk-panel uk-width-1-1 uk-padding panel">
      <div class="uk-grid-match uk-margin-auto uk-padding-remove" uk-grid>
        <div class="uk-width-1-1 uk-padding-remove-left">
          <div
            class="
              uk-card uk-card-default uk-card-body uk-padding-remove-bottom
            "
          >
            <form
              class="uk-search uk-search-default uk-width-2-5 uk-align-left"
              uk-grid
            >
              <span uk-search-icon></span>
              <input
                @change="pesquisaData($event)"
                class="uk-input"
                type="month"
                max=""
                value=""
              />
            </form>
            <form
              class="
                uk-align-right
                uk-width-2-5
                uk-margin-remove-top
                uk-text-right
                uk-remove-padding
                uk-margin-bottom
              "
              uk-grid
            >
              <div class="uk-margin">
                <a
                  class="uk-padding-remove uk-margin-remove-top new-receita"
                  href
                  @click.prevent="cadastrarReceita"
                >
                  nova receita
                  <vk-icon-button
                    class="info uk-margin-small-right"
                    href="#"
                    icon="plus-circle"
                  ></vk-icon-button>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div class="uk-width-1-1 uk-padding-remove-left">
          <div class="uk-card uk-card-default uk-card-body">
            <table class="uk-table uk-text-center">
              <thead class="uk-text-center">
                <tr>
                  <th class="uk-text-center">Tipo</th>
                  <th class="uk-text-center">Valor</th>
                  <th class="uk-text-center">Forma de Recebimento</th>
                  <th class="uk-text-center">Local</th>
                  <th class="uk-text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="receita in receitas" v-bind:key="receita.id">
                  <td>{{ receita.descricao }}</td>
                  <td>{{ receita.valor }}</td>
                  <td>{{ receita.forma_recebimento }}</td>
                  <td>{{ receita.local }}</td>

                  <td>
                    <vk-icon-button
                      href="#"
                      class="uk-margin-small-right editar"
                      icon="file-edit"
                      @click.prevent="editar(receita)"
                    ></vk-icon-button>
                    <vk-icon-button
                      href="#"
                      class="uk-margin-small-right excluir"
                      icon="ban"
                      @click.prevent="remove(receita.id)"
                    ></vk-icon-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <vk-modal center :show.sync="showModalEditar">
      <vk-modal-close @click="editarReceita"></vk-modal-close>
      <div>
        <h3>Editar Receita</h3>
        <form class="uk-grid-small uk-margin-bottom" uk-grid>
                    <div class="uk-width-2-3 uk-margin-auto">
            <div uk-tooltip="title: Tipo; pos: right">
              <select
                v-show="!showAddtp_receita"
                v-model="receita.tp_receita_id"
                class="uk-select"
                @change="onChange($event)"
              >
                <option disabled class="uk-bold">
                  ------Escolha um Tipo de Receita------
                </option>
                <option
                  v-for="item in lista"
                  v-bind:key="item.id"
                  :value="item.id"
                  :selected='item.descricao == receita.descricao'
                >
                  {{ item.descricao }}
                </option>
                <option value="null">
                  -----Cadastrar Tipo de Receita------
                </option>
              </select>
              <div v-show="showAddtp_receita">
                <input
                  class="uk-input"
                  type="text"
                  placeholder="tipo"
                  uk-tooltip="title: Tipo; pos: left"
                  v-model="tp_receita.descricao"
                  list="descricao"
                  v-on:keyup.enter="savetp_receita"
                  autocomplete="on"
                />
                <datalist id="descricao">
                  <option
                    v-for="item in lista"
                    v-bind:key="item.id"
                    :value="item.descricao"
                  />
                </datalist>
              </div>
            </div>
          </div>

          <div class="uk-width-2-3 uk-margin-auto">
            <input
              class="uk-input"
              type="text"
              placeholder="Valor"
              uk-tooltip="title: Valor; pos: left"
              v-model="receita.valor"
            />
          </div>
          <div class="uk-width-2-3 uk-margin-auto">
            <input
              class="uk-input"
              type="text"
              placeholder="Forma de Recebimento"
              uk-tooltip="title: Forma de Recebimento; pos: left"
              v-model="receita.forma_recebimento"
            />
          </div>

          <div class="uk-width-2-3 uk-margin-auto">
            <input
              class="uk-input"
              type="text"
              placeholder="Local"
              uk-tooltip="title: Local; pos: left"
              v-model="receita.local"
            />
          </div>
        </form>
      </div>
      <div slot="footer">
        <vk-button type="primary" @click="save">Confirmar</vk-button>
      </div>
    </vk-modal>
    <vk-modal center :show.sync="showModalCadastrar">
      <vk-modal-close @click="cadastrarReceita"></vk-modal-close>
      <div>
        <h3>Cadastro de Receita</h3>
        <form class="uk-grid-small uk-margin-bottom" uk-grid>
          <div class="uk-width-2-3 uk-margin-auto">
            <div uk-tooltip="title: Tipo; pos: right">
              <select
                v-show="!showAddtp_receita"
                v-model="receitaSalvar.tp_receita_id"
                class="uk-select"
                @change="onChange($event)"
              >
                <option disabled class="uk-bold">
                  ------Escolha um Tipo de Receita------
                </option>
                <option
                  v-for="item in lista"
                  v-bind:key="item.id"
                  :value="item.id"
                >
                  {{ item.descricao }}
                </option>
                <option value="null">
                  -----Cadastrar Tipo de Receita------
                </option>
              </select>
              <div v-show="showAddtp_receita">
                <input
                  class="uk-input"
                  type="text"
                  placeholder="tipo"
                  uk-tooltip="title: Tipo; pos: left"
                  v-model="tp_receita.descricao"
                  list="descricao"
                  v-on:keyup.enter="savetp_receita"
                  autocomplete="on"
                />
                <datalist id="descricao">
                  <option
                    v-for="item in lista"
                    v-bind:key="item.id"
                    :value="item.descricao"
                  />
                </datalist>
              </div>
            </div>
          </div>
          <div v-show="!showAddtp_receita" class="uk-width-2-3 uk-margin-auto">
            <div uk-tooltip="title: Valor; pos: right">
              <input
                class="uk-input"
                v-model="receitaSalvar.valor"
                type="text"
                placeholder="Valor"
              />
            </div>
          </div>
          <div v-show="!showAddtp_receita" class="uk-width-2-3 uk-margin-auto">
            <div uk-tooltip="title: Forma de Recebimento; pos: right">
              <input
                class="uk-input"
                type="text"
                v-model="receitaSalvar.forma_recebimento"
                placeholder="Forma de Recebimento"
              />
            </div>
          </div>

          <div v-show="!showAddtp_receita" class="uk-width-2-3 uk-margin-auto">
            <div uk-tooltip="title: Local; pos: right">
              <input
                v-model="receitaSalvar.local"
                class="uk-input"
                type="text"
                placeholder="Local"
              />
            </div>
          </div>
        </form>
      </div>
      <div v-show="showAddtp_receita" slot="footer">
        <vk-button type="primary" @click="savetp_receita">Salvar</vk-button>
      </div>
      <div v-show="!showAddtp_receita" slot="footer">
        <vk-button type="primary" @click="save">Confirmar</vk-button>
      </div>
    </vk-modal>

    <vk-modal center :show.sync="showModalCancelar">
      <vk-modal-close
        @click="showModalCancelar = !showModalCancelar"
      ></vk-modal-close>
      <div>
        <h4>Deseja realmente Cancelar a Receita?</h4>
      </div>
      <div slot="footer">
        <vk-button
          class="uk-margin-right"
          type="default"
          @click="showModalCancelar = !showModalCancelar"
          >Cancelar</vk-button
        >
        <vk-button
          class="uk-margin-left"
          type="primary"
          @click="confirmacao = !confirmacao"
          >Confirmar</vk-button
        >
      </div>
    </vk-modal>

    <Footer class="uk-width-4-5 uk-margin-large-top" />
  </div>
</template>

<script>
import Header from "@/components/templates/app/HeaderMain";
import Footer from "@/components/templates/app/FooterMain";
import { baseApiUrl, userKey, showError } from "@/global";
import axios from "axios";

export default {
  name: "Receita",
  components: { Header, Footer },

  data: () => {
    return {
      mode: "save",
      confirmacao: false,
      dataPesquisa: "",
      rows: [],
      receita: {},
      tp_receita: {},
      receitas: [],
      receitaSalvar: {},
      receitaCadastro: { tipo: "Escolha um Tipo de Receita" },
      lista: "",
      showEditar: false,
      showModalCadastrar: false,
      showModalCancelar: false,
      showModalEditar: false,
      showAddtp_receita: false,
      selecionada: [],
      dados: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "valor", label: "valor", sortable: true },
        { key: "forma_recebimento", label: "Forma Recebimento", sortable: true },
        { key: "descricao", label: "Descrição", sortable: true },
        { key: "local", label: "Local", sortable: true },
        { key: "editar", label: "Editar" },
        { key: "excluir", label: "excluir" },
      ],
      user: "",
    };
  },

  methods: {
    loadReceitas() {
      const dt = new Date();
      var mes = dt.getMonth() + 1;
      var ano = dt.getFullYear();
      var pesquisa = ano + "-" + mes;
      this.user = JSON.parse(localStorage.getItem(userKey));
      const url = `${baseApiUrl}/receitas/data/${this.user.id}/${pesquisa} `;
      axios.get(url).then((res) => {
        this.receitas = res.data;
      });
    },
    remove(obj) {
      this.user = JSON.parse(localStorage.getItem(userKey));
      this.receita = JSON.parse(obj);
      const url = `${baseApiUrl}/receitas/${this.user.id}/${this.receita}`;
      axios
        .delete(url)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    editarReceita() {
      this.showModalEditar = !this.showModalEditar;
    },
    vincular(id) {
      this.receita = this.dados[id];
    },
    cadastrarReceita() {
      this.showModalCadastrar = !this.showModalCadastrar;
    },
    editar(obj) {
      this.receita = obj;
      this.editarReceita();
    },
    loadtp_receitas() {
      const url = `${baseApiUrl}/tp_receitas/`;
      axios.get(url).then((res) => {
        this.lista = res.data;
      });
    },
    loadMyReceitas() {
      this.receitaSalvar = this.obj;
    },
    savetp_receita() {
      const url = `${baseApiUrl}/tp_receitas/`;
      axios["post"](url, this.tp_receita)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.Addtp_receitashow();
          this.loadtp_receitas();
        })
        .catch(showError);
    },
    reset() {
      this.receita = {};
      this.tp_receita = {};
      this.loadReceitas();
      this.loadtp_receitas();
    },
    save() {
      this.user = JSON.parse(localStorage.getItem(userKey))
      this.receitaSalvar.usuario_id = this.user.id

      const method = this.receitaSalvar.id ? "put" : "post";
      const id = this.receitaSalvar.id ? `/${this.receitaSalvar.id}` : "";
      axios[method](
        `${baseApiUrl}/receitas/${this.user.id}${id}`,
        this.receitaSalvar
      )
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.receitaSalvar = {};
          this.receita = {};
          this.loadReceitas();
          this.showModalCadastrar = false;
          this.showModalEditar = false;
          this.reset();
        })
        .catch(showError);
    },
    Addtp_receitashow() {
      this.showAddtp_receita = !this.showAddtp_receita;
    },
    pesquisaData(event) {
      let pesquisa = event.target.value;

      this.user = JSON.parse(localStorage.getItem(userKey));
      const url = `${baseApiUrl}/receitas/data/${this.user.id}/${pesquisa}`;
      axios.get(url).then((res) => {
        this.receitas = res.data;
      });
    },
    onChange(event) {
      if (event.target.value == "null") {
        this.Addtp_receitashow();
      }else{
        this.receitaSalvar.tp_receita_id = event.target.value
      }
    },
  },
  mounted() {
    this.loadReceitas();
    this.loadtp_receitas();
  },
};
</script>

<style scoped>
.main {
  width: 80vw;
}
.panel {
  height: auto;
}
.editar {
  background-color: rgba(226, 223, 10, 0.863);
  color: #fff;
}
.editar:hover {
  background-color: rgba(226, 222, 10, 0.445);
  color: #fff;
}
.excluir {
  background-color: rgb(226, 10, 10);
  color: #fff;
}
.excluir:hover {
  background-color: rgba(226, 10, 10, 0.473);
  color: #fff;
}

.new-receita {
  color: rgb(6, 30, 247);
}
.new-receita:hover {
  text-decoration: none;
}
.info {
  color: #fff;
  background-color: rgb(6, 30, 247);
}

.new-receita:hover {
  text-decoration: none;
  color: rgba(6, 30, 247, 0.514);
}
a.new-receita:hover > .info {
  color: #fff;
  background-color: rgba(6, 30, 247, 0.514);
}
</style>