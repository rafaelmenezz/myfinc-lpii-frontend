<template>
  <div>
    <div class="cardBox">
      <div class="cards">
        <div>
          <div class="numbers">1,504</div>
          <div class="cardName">Receitas</div>
        </div>
        <div class="iconBx">
          <ion-icon name="trending-up-outline"></ion-icon>
        </div>
      </div>
      <div class="cards">
        <div>
          <div class="numbers">1,504</div>
          <div class="cardName">Despesas</div>
        </div>
        <div class="iconBx">
          <ion-icon name="trending-down-outline"></ion-icon>
        </div>
      </div>
      <div class="cards">
        <div>
          <div class="numbers">1,504</div>
          <div class="cardName">Saldo Mês</div>
        </div>
        <div class="iconBx">
          <ion-icon name="logo-usd"></ion-icon>
        </div>
      </div>
      <div class="cards">
        <div>
          <div class="numbers">1,504</div>
          <div class="cardName">Saldo Ano</div>
        </div>
        <div class="iconBx">
          <ion-icon name="cash-outline"></ion-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Inicio",
  components: {},
};
</script>
<style scoped>
.cardBox {
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
}

.cardBox .cards {
  position: relative;
  background: var(--white);
  padding: 30px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.28);
}

.cardBox .cards .numbers {
  position: relative;
  font-weight: 500;
  font-size: 1.8em;
  color: var(--blue);
}

.cardBox .cards .cardName {
  color: var(--grayLigth);
  font-size: 1em;
  margin-top: 5px;
}

.cardBox .cards .iconBx {
  font-size: 3.5em;
  color: var(--blue);
}

.cardBox .cards:nth-child(1) .iconBx {
  color: var(--green);
}
.cardBox .cards:nth-child(2) .iconBx {
  color: red;
}

.cardBox .cards:hover {
  background: var(--blue);
  transition: 0.5s;
}

.cardBox .cards:hover .numbers,
.cardBox .cards:hover .cardName,
.cardBox .cards:hover .iconBx {
  color: var(--white);
  transition: 0.5s;
}
</style>