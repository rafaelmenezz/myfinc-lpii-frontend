<template>
  <section :class="{ active: cadastro }">
    <div class="container" :class="{ active: cadastro }">
      <div class="user singinBx">
        <div class="imgBx">
          <img
            src="@/assets/imagens/logo_branca.svg"
            width="400"
            alt="myfinc"
          />
          <p class="lead">Bem vindo de volta. Atualize suas finanças!</p>
        </div>
        <div class="formBx">
          <form>
            <h2>Login</h2>
            <input
              type="email"
              name=""
              placeholder="Email"
              autocomplete="off"
              v-model="login.email"
              required
            />
            <input
              type="password"
              name=""
              placeholder="Senha"
              autocomplete="off"
              v-model="login.senha"
              required
            />
            <input type="submit" value="Entrar" @click.prevent="signin" />
            <p class="singup">
              Não possui cadastro?
              <a href="#" v-on:click.prevent="formCadastro">Clique aqui</a>
            </p>
          </form>
        </div>
      </div>

      <div class="user singupBx">
        <div class="formBx">
          <form>
            <h2>Cadastrar</h2>
            <input
              type="text"
              name=""
              placeholder="Nome Completo"
              v-model="user.nome"
              required
            />
            <input
              type="email"
              name=""
              placeholder="Email"
              v-model="user.email"
              required
            />
            <input
              type="password"
              name=""
              placeholder="Criar Senha"
              v-model="user.senha"
              required
            />
            <input
              type="password"
              name=""
              placeholder="Confirmar Senha"
              v-model="user.confirmaSenha"
              required
            />
            <input type="submit" value="Cadastrar" @click.prevent="signup" />
            <p class="singup">
              Já possui cadastro?
              <a href="#" v-on:click.prevent="formCadastro">Clique aqui</a>
            </p>
          </form>
        </div>
        <div class="imgBx">
          <img
            src="@/assets/imagens/logo_branca.svg"
            width="400"
            alt="myfinc"
          />
          <p class="lead">
            Controle suas finanças. Planeje suas férias e investimentos. Tenha
            seus ganhos e gastos em suas mãos.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Index",
  components: {},
  data() {
    return {
      cadastro: false,
      login: {},
      user: {},
    };
  },
  methods: {
    async signin() {
     await axios
        .post(`${baseApiUrl}/signin`, this.login)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/inicio" });
          // window.location = "/inicio";
        })
        .catch(showError);

        await this.$store.dispatch("fetchAvisos");
        await this.$store.dispatch("fetchFamilias");

    },
    async signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.cadastroSuccess();
          this.user = {};
          this.formCadastro();
        })
        .catch(showError);
    },
    formCadastro: function () {
      this.cadastro = !this.cadastro;
    },
  },
};
</script>

<style >
section {
  position: relative;
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

section .container {
  position: relative;
  width: 800px;
  height: 500px;
  background: #fff;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

section .container .user {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

section .container .user .imgBx {
  position: relative;
  width: 50%;
  height: 100%;
  transition: 0.5s;
}

section .container .singinBx .imgBx {
  background: var(--black2);
}

section .container .singupBx .imgBx {
  background: var(--green);
}

section .container .user .imgBx img {
  position: absolute;
  top: 15%;
  left: 15%;
  width: 70%;
  height: auto;
  object-fit: cover;
}
section .container .user .imgBx p {
  position: absolute;
  color: var(--white);
  top: 55%;
  left: 10%;
  width: 80%;
  text-align: center;
}

section .container .user .formBx {
  position: relative;
  width: 50%;
  height: 100%;
  background: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  transition: 0.5s;
}

section .container .user .formBx form h2 {
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
  color: var(--green);
}

section .container .singinBx .formBx form h2 {
  color: var(--black1);
}
section .container .singupBx .formBx form h2 {
  color: var(--green);
}

section .container .user .formBx form input {
  position: relative;
  width: 100%;
  padding: 10px;
  background: #f5f5f5;
  color: #333;
  border: none;
  outline: none;
  box-shadow: none;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: 300;
}
section .container .user .formBx form input[type="submit"] {
  max-width: 100px;

  color: var(--white);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  transition: 0.5s;
}

section .container .singinBx .formBx form input[type="submit"] {
  background: var(--black1);
}
section .container .singupBx .formBx form input[type="submit"] {
  background: var(--green);
}

section .container .user .formBx form .singup {
  position: relative;
  margin-top: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  color: #555;
  text-transform: uppercase;
  font-weight: 300;
}

section .container .user .formBx form .singup a {
  font-weight: 600;
  text-decoration: none;
  color: #555;
}

section {
  background: var(--green2);
  transition: 0.5s;
}

section.active {
  background: var(--black1);
  transition: 0.5s;
}

section .container .singupBx {
  pointer-events: none;
}
section .container.active .singupBx {
  pointer-events: initial;
}

section .container .singupBx .formBx {
  left: 100%;
}
section .container.active .singupBx .formBx {
  left: 0;
}
section .container .singupBx .imgBx {
  left: -100%;
}
section .container.active .singupBx .imgBx {
  left: 0;
}

section .container .singinBx .formBx {
  left: 0;
}
section .container.active .singinBx .formBx {
  left: 100%;
}
section .container .singinBx .imgBx {
  left: 0;
}
section .container.active .singinBx .imgBx {
  left: -100%;
}
@media (max-width: 991px) {
  section .container {
    max-width: 400px;
  }

  section .container .imgBx {
    display: none;
  }

  section .container .user .formBx {
    width: 100%;
  }
}
</style>