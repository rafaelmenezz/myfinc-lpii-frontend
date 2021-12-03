<template>
  <div>
    <div class="details">
      <div class="recentOrders">
        <div class="cardHeader">
          <h2>Finanças do Ano</h2>
          <a href="#" class="btn"> Atualizar</a>
        </div>
        <div class="corpo">
          <Graph />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Graph from "./GraphAno.vue";

export default {
  name: "FinancasAno",
  components: { Graph },
};
</script>
<style scoped>
.details {
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
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
  grid-template-columns: 1fr;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.cardHeader h2 {
  font-weight: 600;
  color: var(--blue);
}
.btn {
  position: relative;
  padding: 5px 10px;
  background: var(--blue);
  text-decoration: none;
  color: var(--white);
  border-radius: 6px;
}
</style>