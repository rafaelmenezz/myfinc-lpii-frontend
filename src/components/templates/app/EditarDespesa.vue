<template>
  <div>
    <div >
      <h3>Editar Despesa</h3>
      <form>
        <div class="uk-margin">
          <div class="uk-inline" uk-tooltip="title: Valor; pos: right">
            <input class="uk-input" type="text" placeholder="Valor"  :value='valor' />
          </div>
        </div>
        <div class="uk-margin">
          <div
            class="uk-inline"
            uk-tooltip="title: Forma de Recebimento; pos: right"
          >
            <input
              class="uk-input"
              type="text"
              placeholder="Forma de Pagamento"
             :value='formaPagamento'
            />
          </div>
        </div>
        <div class="uk-margin">
          <div class="uk-inline" uk-tooltip="title: Tipo; pos: right">
            <input class="uk-input" type="text" placeholder="Tipo"  :value='tipo'/>
          </div>
        </div>
        <div class="uk-margin">
          <div class="uk-inline" uk-tooltip="title: Local; pos: right">
            <input class="uk-input" type="text" placeholder="Local" :value='local'/>
          </div>
        </div>
      </form>
    </div>
      <div slot="footer">
        <vk-button type="primary">Confirmar</vk-button>
      </div>
  </div>
</template>

<script>
export default {
  name: "EditarReceita",
  props: ['valor', 'tipo', 'local', 'formaPagamento', 'id', 'usuarioId'],
  data: () => ({
    showEditar: false,
    showModal: false,

})
}
</script>

<style>
.page-title h1 {
  margin: 0px;
}
.page-title h2 {
  color: #777777;
  margin-top: 5px;
  font-size: 1.3rem;
}
</style>