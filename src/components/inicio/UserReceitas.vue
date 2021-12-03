<template>
  <div class="details">
    <div class="recentOrders">
      <div class="cardHeader">
        <h2>Minhas Receitas</h2>
        <a href="#" class="btn"> Atualizar</a>
      </div>
      <div class="corpo">
        <GraphMes />
        <table class="table">
          <thead>
            <tr>
              <td>Finança</td>
              <td>Forma de Recebimento</td>
              <td>valor</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sálario</td>
              <td>Depósito Caixa Economica</td>
              <td>R$ 8000,00</td>
            </tr>
            <tr>
              <td>Sálario</td>
              <td>Depósito Caixa Economica</td>
              <td>R$ 8000,00</td>
            </tr>
            <tr>
              <td>Sálario</td>
              <td>Depósito Caixa Economica</td>
              <td>R$ 8000,00</td>
            </tr>
            <tr>
              <td>Sálario</td>
              <td>Depósito Caixa Economica</td>
              <td>R$ 8000,00</td>
            </tr>
            <tr>
              <td>Sálario</td>
              <td>Depósito Caixa Economica</td>
              <td>R$ 8000,00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- New Customer -->
  </div>
</template>
<script>
import GraphMes from "./GraphReceitas.vue";
export default {
  name: "userReceitas",
  components: { GraphMes },
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
  display: inline-grid;
  grid-template-columns: 1fr 2fr;
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

.details .table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  height: auto;
}

.details .table thead td {
  font-weight: 600;
}

.details .recentOrders .table tr {
  color: var(--black1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.details .recentOrders .table tr:last-child {
  border-bottom: none;
}

.details .recentOrders .table tr:hover {
  background: var(--blue);
  color: var(--white);
  transition: 0.4s;
}
.details .recentOrders .table tr td {
  padding: 10px;
}

.details .recentOrders .table tr td:last-child {
  text-align: end;
}
.details .recentOrders .table tr td:nth-child(2) {
  text-align: center;
}
.recentCustomers {
  position: relative;
  display: grid;
  min-height: 500px;
  padding: 20px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.28);
  border-radius: 20px;
}

.recentCustomers .imgBx {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.recentCustomers .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recentCustomers .table tr td:nth-child(1) {
  width: 20%;
}

.recentCustomers .table tr td {
  padding: 12px 10px;
}

.recentCustomers .table tr td h4 {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2em;
}
.recentCustomers .table tr td h4 span {
  font-size: 14px;
  color: var(--black2);
}

.recentCustomers .table tr:hover {
  background: var(--blue);
  color: var(--white);
  transition: 0.5s;
}

.recentCustomers .table tr:hover td h4 span {
  color: var(--white);
}
</style>