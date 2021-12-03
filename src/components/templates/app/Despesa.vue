<template>
  <div class="main uk-overflow-auto uk-position-center-right">
    <Header icon="pull" main="Despesa" />
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
                  class="uk-padding-remove uk-margin-remove-top new-despesa"
                  href
                  @click.prevent="cadastrarDespesa"
                >
                  nova Despesa
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
                  <th class="uk-text-center">Forma de Pagamento</th>
                  <th class="uk-text-center">Local</th>
                  <th class="uk-text-center">Ações</th>
                </tr>                
              </thead>
              <tbody >
                <tr v-for=" despesa in despesas" v-bind:key="despesa.id">
                  <td>{{despesa.descricao}}</td>
                  <td>{{despesa.valor}}</td>
                  <td>{{despesa.forma_pagamento}}</td>
                  <td>{{despesa.local}}</td>

                  <td>
                     <vk-icon-button
                    href="#"
                    class="uk-margin-small-right editar"
                    icon="file-edit"
                    @click.prevent="editar(despesa)"
                  ></vk-icon-button>
                    <vk-icon-button
                    href="#"
                    class="uk-margin-small-right excluir"
                    icon="ban"
                    @click.prevent="remove(despesa.id)"
                  ></vk-icon-button>
                </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
       
      </div>
    </div>
    <vk-modal center :show.sync="showModalEditarD">
      <vk-modal-close @click="editarDespesa"></vk-modal-close>
       <div>
      <h3>Editar Despesa</h3>
      <form class="uk-grid-small uk-margin-bottom" uk-grid>
          <div class="uk-width-2-3 uk-margin-auto">
          <div  uk-tooltip="title: Tipo; pos: right">
            <select v-show="!showAddTpDespesa" v-model="despesa.tp_despesa_id" class="uk-select " @change="onChange($event)" >
            <option disabled class="uk-bold">------Escolha um Tipo de Despesa------</option>
            <option
              v-for="item in lista"
              v-bind:key="item.id"  
              :value="item.id"
            >{{item.descricao}}</option>
            <option value="null">-----Cadastrar Tipo de Despesa------</option>
            </select>
            <div v-show="showAddTpDespesa">
               <input
             
            class="uk-input"
            type="text"
            placeholder="tipo"
            uk-tooltip="title: Tipo; pos: left"
            v-model="tp_despesa.descricao"
            list="descricao"
            v-on:keyup.enter="saveTpDespesa"
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
            v-model="despesa.valor"
          />
        </div>
        <div class="uk-width-2-3 uk-margin-auto">
          <input
            class="uk-input"
            type="text"
            placeholder="Forma de Pagamento"
            uk-tooltip="title: Forma de Pagamento; pos: left"
            v-model="despesa.forma_pagamento"
          />
        </div>

        <div class="uk-width-2-3 uk-margin-auto">
          <input
            class="uk-input"
            type="text"
            placeholder="Local"
            uk-tooltip="title: Local; pos: left"
            v-model="despesa.local"
          />
        </div>
      </form>
    </div>
       <div slot="footer">
      <vk-button type="primary" @click="save">Confirmar</vk-button>
    </div>
    </vk-modal>
    <vk-modal center :show.sync="showModalCadastrarD">
      <vk-modal-close @click="cadastrarDespesa"></vk-modal-close>
     <div>
      <h3>Cadastro de Despesa</h3>
      <form class="uk-grid-small uk-margin-bottom" uk-grid>
          <div class="uk-width-2-3 uk-margin-auto">
          <div  uk-tooltip="title: Tipo; pos: right">
            <select v-show="!showAddTpDespesa" v-model="despesa.tp_despesa_id" class="uk-select " @change="onChange($event)" >
            <option disabled class="uk-bold">------Escolha um Tipo de Despesa------</option>
            <option
              v-for="item in lista"
              v-bind:key="item.id"  
              :value="item.id"
            >{{item.descricao}}</option>
            <option value="null">-----Cadastrar Tipo de Despesa------</option>
            </select>
            <div v-show="showAddTpDespesa">
               <input
             
            class="uk-input"
            type="text"
            placeholder="tipo"
            uk-tooltip="title: Tipo; pos: left"
            v-model="tp_despesa.descricao"
            list="descricao"
            v-on:keyup.enter="saveTpDespesa"
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
         <div v-show="!showAddTpDespesa" class="uk-width-2-3 uk-margin-auto">
          <div  uk-tooltip="title: Valor; pos: right">
            <input class="uk-input" v-model="despesa.valor" type="text" placeholder="Valor"  />
          </div>
        </div>
         <div v-show="!showAddTpDespesa" class="uk-width-2-3 uk-margin-auto">
          <div
           
            uk-tooltip="title: Forma de Pagamento; pos: right"
          >
            <input
              class="uk-input"
              type="text"
               v-model="despesa.forma_pagamento"
              placeholder="Forma de Pagamento"
            
            />
          </div>
        </div>
    
         <div v-show="!showAddTpDespesa" class="uk-width-2-3 uk-margin-auto">
          <div  uk-tooltip="title: Local; pos: right">
            <input v-model="despesa.local" class="uk-input" type="text" placeholder="Local" />
          </div>
        </div>
      </form>
    </div>
      <div v-show="showAddTpDespesa" slot="footer">
         <vk-button class="uk-margin-right" type="primary" @click.prevent="showAddTpDespesa = !showAddTpDespesa">Cancelar</vk-button>
        <vk-button class="uk-margin-left" type="primary" @click.prevent="saveTpDespesa">Salvar</vk-button>
       
      </div>
      <div v-show="!showAddTpDespesa" slot="footer">
        <vk-button type="primary" @click="save">Confirmar</vk-button>
      </div>
    </vk-modal>






    <Footer class="uk-width-4-5 uk-margin-large-top" />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, userKey, showError } from "@/global";
import Header from "@/components/templates/app/HeaderMain";
import Footer from "@/components/templates/app/FooterMain";



export default {
  name: "Despesa",
  components: { Header, Footer },

  data: () => {
    return {
      mode: "save",
      confirmacao:false,
      dataPesquisa: '',
      rows:[],
      despesa: {},
      tp_despesa:{},
      despesas: [],
      despesaSalvar:{},
      despesaCadastro:{tipo: 'Escolha um Tipo de Despesa'},
      lista: '',
      showEditar: false,
      showModalCadastrarD: false,
      showModalCancelarD: false,
      showModalEditarD: false,
      showAddTpDespesa: false,
      selecionada: [],
      dados: [],
      user: "",
    };
  },

  methods: {
    loadDespesas() {
      const dt = new Date()
      var mes = dt.getMonth() + 1
      var ano = dt.getFullYear()
      var pesquisa = ano +'-'+ mes
      this.user = JSON.parse(localStorage.getItem(userKey));
      const url = `${baseApiUrl}/despesas/data/${this.user.id}/${pesquisa} `;
      axios.get(url).then((res) => {
      
        this.despesas =  res.data
      });
    },
    remove(obj) {
      this.user = JSON.parse(localStorage.getItem(userKey));
      this.despesa = JSON.parse(obj)
         const url = `${baseApiUrl}/despesas/${this.user.id}/${this.despesa}`
         axios.delete(url).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset()
      })
      .catch(showError);
     
     
    },
    
    editarDespesa() {
      this.showModalEditarD = !this.showModalEditarD;
    },
    vincular(id) {
      this.despesa = this.dados[id];
    },
    cadastrarDespesa() {
      this.showModalCadastrarD = !this.showModalCadastrarD;
    },
    editar(obj) {
      this.despesa = obj
      this.editarDespesa()
    },
     loadTpDespesas() {
      const url = `${baseApiUrl}/tp_despesas/`;
      axios.get(url).then((res) => {
        this.lista = res.data;
      });
    },
    loadMyDespesas() {
      this.despesaSalvar = this.obj;
    },
    saveTpDespesa() {
      const url = `${baseApiUrl}/tp_despesas/`;
      axios["post"](url, this.tp_despesa)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.AddTpDespesaShow()
          this.loadTpDespesas() 
        })
        .catch(showError);
    },
    reset(){
      this.despesa = {}
      this.tp_despesa = {}
     this.loadDespesas()
     this.loadTpDespesas()
    },
    save() {
      this.user = JSON.parse(localStorage.getItem(userKey));
      this.despesaSalvar = {
        id: this.despesa.id,
        valor: this.despesa.valor,
        forma_pagamento: this.despesa.forma_pagamento,
        tp_despesa_id: this.despesa.tp_despesa_id,
        local: this.despesa.local,
        usuario_id: this.user.id,
      }
   
      const method = this.despesaSalvar.id ? "put" : "post";
      const id = this.despesaSalvar.id ? `/${this.despesaSalvar.id}` : "";
      axios[method](`${baseApiUrl}/despesas/${this.user.id}${id}`, this.despesaSalvar)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.despesaSalvar = {}
          this.despesa={}
          this.showModalCadastrarD = false
          this.showModalEditarD = false
          this.reset()
        })
        .catch(showError);
    },
    AddTpDespesaShow(){
      this.showAddTpDespesa = !this.showAddTpDespesa
    },
    pesquisaData(event){
       let pesquisa = event.target.value
    
        this.user = JSON.parse(localStorage.getItem(userKey));
        const url = `${baseApiUrl}/despesas/data/${this.user.id}/${pesquisa}`
        axios.get(url).then((res) => {
   
        this.despesas = res.data;
      })
    },
    onChange(event) {
      
            if(event.target.value == 'null'){
               this.AddTpDespesaShow()
            }
        },

  },
  mounted() {
    this.loadDespesas()
    this.loadTpDespesas()
  
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

.new-despesa {
  color: rgb(6, 30, 247);
}
.new-despesa:hover {
  text-decoration: none;
}
.info {
  color: #fff;
  background-color: rgb(6, 30, 247);
}

.new-despesa:hover {
  text-decoration: none;
  color: rgba(6, 30, 247, 0.514);
}
a.new-despesa:hover > .info {
  color: #fff;
  background-color: rgba(6, 30, 247, 0.514);
}
</style>