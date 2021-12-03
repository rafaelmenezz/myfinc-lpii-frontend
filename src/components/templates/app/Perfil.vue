<template>
  <div class="main uk-overflow-auto uk-position-center-right">
    
    <Header icon="user" main="Perfil" />
    <hr />
    <div
      class="
        uk-container
        uk-panel
        uk-background-default
        uk-width-4-5
        uk-padding
        uk-hover
        uk-border-rounded
        uk-box-shadow-medium
      "
    >
      <div class="uk-width-4-5 uk-margin-auto" uk-overflow-auto>
        <form>
          <div class="uk-margin">
            <h3>{{user.nome}}</h3>
            <hr />
          </div>
          <div class="uk-margin">
            <div
              class="uk-inline"
              uk-tooltip="title: Nome Completo; pos: right"
            >
              <span class="uk-form-icon" uk-icon="icon: user"></span>
              <input
              v-model="user.nome"
              id="nome"
                class="uk-input"
                type="text"
                placeholder="Nome Completo"
                :disabled="!showEditar"
              />
            </div>
          </div>
          <div class="uk-margin">
            <div class="uk-inline" uk-tooltip="title: Login; pos: right">
              <span class="uk-form-icon" uk-icon="icon: 500px"></span>
              <input
                v-model="user.login"
                class="uk-input"
                type="text"
                placeholder="Login"
                :disabled="!showEditar"
              />
            </div>
          </div>
          <div class="uk-margin">
            <div class="uk-inline" uk-tooltip="title: E-Mail; pos: right">
              <span class="uk-form-icon" uk-icon="icon: mail"></span>
              <input
                v-model="user.email"
                id="email"
                class="uk-input"
                type="email"
                placeholder="E-Mail"
                :disabled="!showEditar"
              />
            </div>
          </div>
          <div class="uk-margin">
            <div class="uk-inline" uk-tooltip="title: Telefone; pos: right">
              <span class="uk-form-icon" uk-icon="icon: phone"></span>
              <input
                v-model="user.telefone"
                id="telefone"
                class="uk-input"
                type="text"
                placeholder="Telefone"
                :disabled="!showEditar"
              />
            </div>
          </div>

          <div class="uk-margin">
            <div class="uk-padding-remove">
              <button
                v-if="showEditar"
                class="uk-button uk-button-primary"
                @click.prevent="showModal = !showModal"
              >
                <span>salvar</span>
              </button>
              <button
                v-else
                class="uk-button uk-button-primary"
                @click.prevent="showEditar = !showEditar"
              >
                <span>editar</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <vk-modal center :show.sync="showModal">
      <vk-modal-close @click="showModal = !showModal"></vk-modal-close>
      <div>
        <h3>Confirma alteração dos dados?</h3>
      </div>
      <div slot="footer">
        <vk-button class="uk-margin-small-right" @click.prevent="showModal = !showModal, showEditar = !showEditar"
          >Cancelar</vk-button
        >
        <vk-button type="primary" @click="salvarUser">Confirmar</vk-button>
      </div>
    </vk-modal>
    <Footer class="uk-width-4-5 uk-margin-large-top" />
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";
import Header from "@/components/templates/app/HeaderMain";
import Footer from "@/components/templates/app/FooterMain";

export default {
  name: "Perfil",
  components: { Header, Footer },
  data: () => ({
    showEditar: false,
    showModal: false,
    user: {
      id: '',
      nome: '',
      email: '',
      login: '', 
      telefone: ''
    },
  }),
  methods: {
      loadUser(){
        this.user= JSON.parse(localStorage.getItem(userKey));
    },
      salvarUser(){
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''

            axios[method](`${baseApiUrl}/usuarios${id}`, this.user)
                .then(() => {
                    localStorage.setItem(userKey, JSON.stringify(this.user))
                    this.$toasted.global.defaultSuccess()
                    this.showEditar = false
                    this.showModal = false
                })
                .catch(showError)
        },
  

    },
   mounted() {
        this.loadUser()
}
}

</script>

<style>
.main {
  width: 80vw;
}
</style>