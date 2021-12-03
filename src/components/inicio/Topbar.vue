<template>
  <div class="topbar">
    <div class="toggle">
      <ion-icon name="menu-outline"></ion-icon>
    </div>
    <!-- pesquisar -->
    <div class="search">
      <label>
        <input type="text" placeholder="Pesquisar aqui" />
        <ion-icon name="search-outline"></ion-icon>
      </label>
    </div>
    <!-- user -->
    <div class="user">
      <img src="user.jpeg" alt="foto" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Topbar",
};
</script>
<style scoped>
.topbar {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.toggle {
  position: relative;
  top: 5px;
  width: 60px;
  height: 60px;
  background: transparent;
  display: flex;
  justify-content: center;
  font-size: 2.5em;
  cursor: pointer;
}

.search {
  position: relative;
  width: 400px;
  margin: 0 10px;
}

.search label {
  position: relative;
  width: 100%;
}

.search label input {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  padding: 5px 20px;
  padding-left: 35px;
  font-size: 15px;
  outline: none;
  border: 1px solid var(--black2);
}

.search label ion-icon {
  position: absolute;
  top: 0;
  left: 10px;
  font-size: 1.2em;
}

.user {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.user img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>