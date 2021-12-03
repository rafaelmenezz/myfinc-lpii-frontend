<template >
  <div>
    <form class="uk-form-stacked">
      <div class="uk-margin">
        <label class="uk-form-label" for="form-stacked-text">Descriçao</label>
        <div class="uk-form-controls">
          <input
            class="uk-input"
            type="text"
            placeholder="Descricao"
            v-model="financa.descricao"
          />
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="form-stacked-text">Pagamento</label>
        <div class="uk-form-controls">
          <input
            class="uk-input"
            type="text"
            placeholder="Pagamento"
            v-model="financa.pagamento"
          />
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="form-stacked-text">Valor</label>
        <div class="uk-form-controls">
          <input
            class="uk-input"
            type="number"
            min="0.00"
            max="10000.00"
            step="0.01"
            v-model="financa.valor"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "FormFinanca",
  props: {
    objfinanca: Object,
  },
  data() {
    return {
      financa: {
        descricao: "",
        pagamento: "",
        valor: 0,
      },
    };
  },
  watch: {
    objfinanca: function (val) {
      this.financa = val;
    },
  },
};
</script>
<style >
</style>