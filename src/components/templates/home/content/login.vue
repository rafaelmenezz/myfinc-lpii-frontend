<template>
  <div class="uk-light" id="host">
    <form>
      <div class="auth-title uk-margin-remove">
        {{ showSignup ? "Cadastro" : "Login" }}
      </div>
      <hr class="uk-width-1-3 uk-margin-auto uk-margin-remove-top" />
      <div class="uk-margin">
        <input
          v-if="showSignup"
          v-model="user.nome"
          class="uk-input uk-width-1-3"
          type="text"
          placeholder="Nome"
        />
      </div>
      <div class="uk-margin">
        <input
          v-model="user.email"
          class="uk-input uk-width-1-3"
          type="text"
          placeholder="E-Mail"
        />
      </div>

      <div class="uk-margin">
        <input
          v-model="user.senha"
          class="uk-input uk-width-1-3"
          type="password"
          placeholder="Senha"
        />
      </div>
      <div class="uk-margin">
        <input
          v-if="showSignup"
          v-model="user.confirmaSenha"
          class="uk-input uk-width-1-3"
          type="password"
          placeholder="Confirmar Senha"
        />
      </div>
      <div class="uk-margin">
        <p class="uk-width-1-3 uk-margin-auto" uk-grid>
          <vk-button
            v-if="showSignup"
            class="uk-margin uk-margin-remove-bottom uk-width-1-2 blue"
            type="secondary"
            @click="signup"
            >Cadastrar</vk-button
          >
          <vk-button
            v-else
            class="uk-margin uk-margin-remove-bottom uk-width-1-2 green"
            type="secondary"
            @click="signin"
            >Entrar</vk-button
          >
        </p>
      </div>
    </form>
    <a
      class="uk-margin-remove link-login"
      href
      @click.prevent="showSignup = !showSignup"
    >
      <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
      <span v-else>Não tem cadastro? Registre-se aqui!</span>
    </a>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Login",
  data: () => ({
    showSignup: false,
    user: {},
  }),
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          window.location = "/myfinc/mural";
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.cadastroSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Italianno&display=swap");

.green {
  background-color: rgb(74, 190, 74);
  color: #fff;
  width: 275px;
  padding: 10;
}
.green:hover,
.green:focus {
  background-color: rgba(74, 190, 74, 0.25);
  color: #fff;
}
.blue {
  background-color: rgb(71, 101, 202);
  color: #fff;
  width: 275px;
}
.blue:hover,
.blue:focus {
  background-color: rgba(71, 101, 202, 0.25);
  color: #fff;
}

.auth-title {
  font-size: 1.5rem;
  font-weight: 500;
}
.link-login:hover,
.link-login:focus {
  color: rgba(209, 238, 209, 0.5);
  text-decoration: none;
}
</style>