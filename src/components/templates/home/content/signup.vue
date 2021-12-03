<template>
  <div>
    <form>
      <h1 class="cover-heading">
        <img src="@/assets/imagens/logo_branca.svg" width="180" alt="" />
      </h1>
      <div class="uk-margin">
        <input class="uk-input uk-width-1-3" type="text" placeholder="Nome" />
      </div>

      <div class="uk-margin">
        <input class="uk-input uk-width-1-3" type="text" placeholder="Login" />
      </div>

      <div class="uk-margin">
        <input class="uk-input uk-width-1-3" type="text" placeholder="E-mail" />
      </div>
    
        <div class="uk-margin">
        <input class="uk-input uk-width-1-3" type="text" placeholder="Teledone" />
      </div>


      

      <div class="uk-margin">
        <input
          class="uk-input uk-width-1-3"
          type="password"
          placeholder="Senha"
        />
      </div>

      <div class="uk-margin">
        <input
          class="uk-input uk-width-1-3"
          type="password"
          placeholder="Confirmar Senha"
        />
      </div>
      <div class="uk-margin">
        <p class="uk-width-1-2 uk-margin-auto" uk-grid>
          <vk-button
            class="
              uk-margin uk-width-1-3 uk-margin-small-right uk-margin-top
              blue
            "
            type="primary"
            >Cadastrar</vk-button
          >
          <vk-button class="uk-margin uk-width-1-3 green" type="secondary"
            >Entrar</vk-button
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data: () => ({
    initial: "Initial Value",
    type: null,
    withLabel: null,
    inline: null,
    number: null,
    textarea: null,
    autogrow: null,
    disabled: null,
  }),
};
</script>

<style scoped>
.green {
  background-color: rgb(74, 190, 74);
  color: #fff;
}
.green:hover {
  background-color: rgba(74, 190, 74, 0.25);
  color: #fff;
}
.blue {
  background-color: rgb(71, 101, 202);
  color: #fff;
}
.blue:hover {
  background-color: rgba(71, 101, 202, 0.25);
  color: #fff;
}
</style>