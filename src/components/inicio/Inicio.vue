<template>
  <div>
    <card-box />
    <user-receitas />
    <user-despesas />
    <financa-ano />
  </div>
</template>
<script>
import CardBox from "./CardBox.vue";
import UserDespesas from "./UserDespesas.vue";
import userReceitas from "./UserReceitas.vue";
import FinancaAno from "./FinancasAno.vue";
export default {
  name: "Inicio",
  components: { CardBox, UserDespesas, userReceitas, FinancaAno },
};
</script>
<style scoped>
</style>