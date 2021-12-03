<template>
  <div class="container">
    <div class="navigation" :class="{ active: isMenuVisible }">
      <ul>
        <li>
          <a href="#">
            <span @click.prevent="toggleMenu" class="icon"
              ><ion-icon name="menu-outline"></ion-icon
            ></span>
            <img src="@/assets/imagens/logo_branca.svg" width="100" alt="" />
          </a>
        </li>
        <router-link to="/inicio" custom v-slot="{ href, isActive }">
          <li :class="{ active: isActive }">
            <a :href="href">
              <span class="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span class="title">Inicio</span>
            </a>
          </li>
        </router-link>
        <router-link to="/perfil" custom v-slot="{ href, isActive }">
          <li :class="{ active: isActive }">
            <a :href="href">
              <span class="icon">
                <ion-icon name="person-outline"></ion-icon>
              </span>
              <span class="title">Perfil</span>
            </a>
          </li>
        </router-link>
        <router-link to="/familia" custom v-slot="{ href, isActive }">
          <li :class="{ active: isActive }">
            <a :href="href">
              <span class="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span class="title">Familia</span>
            </a>
          </li>
        </router-link>
        <router-link to="/financas" custom v-slot="{ href, isActive }">
          <li :class="{ active: isActive }">
            <a :href="href">
              <span class="icon">
                <ion-icon name="pie-chart-outline"></ion-icon>
              </span>
              <span class="title">Finanças</span>
            </a>
          </li>
        </router-link>
        <router-link to="/sobre" custom v-slot="{ href, isActive }">
          <li :class="{ active: isActive }">
            <a :href="href">
              <span class="icon">
                <ion-icon name="receipt-outline"></ion-icon>
              </span>
              <span class="title">Sobre</span>
            </a>
          </li>
        </router-link>
        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="exit-outline"></ion-icon>
            </span>
            <span class="title" @click="logout">Logout</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="main" :class="{ active: isMenuVisible }">
      <div class="topbar">
        <div class="toggle" @click.prevent="toggleMenu"></div>
        <!-- pesquisar -->
        <div class="title">
          <h1>{{ title }}</h1>
        </div>
        <!-- user -->
        <div class="user"></div>
      </div>
      <!-- View Router-->
      <div class="corpo">
        <transition>
          <router-view name="main" ></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { userKey } from "@/global";
export default {
  computed: mapState(["isMenuVisible"]),
  data() {
    return {
      isToggle: false,
      isActive: function (path) {
        if (this.$route.path == path) {
          return true;
        }
      },
      title: "",
    };
  },
  created() {
    this.setTitle();
  },
  methods: {
    setTitle() {
      let value = this.$route.path;
      let result = value.substring(1);
      this.title = result.toUpperCase();
    },
    toggleMenu() {
      this.isVisible = !this.isVisible;
      this.$store.commit("toggleMenu");
    },
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      localStorage.clear();
      window.location = "/";
    },
  },
};
</script>
<style scoped>
.container {
  position: relative;
  width: 100%;
}

.navigation {
  position: fixed;
  width: 300px;
  height: 100%;
  background: var(--blue);
  border-left: 10px solid var(--black1);
  transition: 0.5s;
  overflow: hidden;
}

.navigation.active {
  width: 75px;
}

.navigation ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-left: 0;
}
.navigation ul li {
  position: relative;
  width: 100%;
  list-style: none;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

.navigation ul li:hover,
.navigation ul li.active {
  background: var(--white);
  transition: 0.05s;
}

.navigation ul li:nth-child(1) {
  margin-bottom: 40px;
}
.navigation ul li:nth-child(1):hover a {
  background: var(--blue);
  color: var(--white);
}

.navigation ul li:nth-child(1) img {
  margin-top: 10px;
  margin-left: 10px;
}

.navigation ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: var(--white);
}

.navigation ul li:hover a,
.navigation ul li.active a {
  color: var(--blue);
}

.navigation ul li a .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 75px;
  text-align: center;
}

.navigation ul li a .icon ion-icon {
  font-size: 1.75em;
}

.navigation ul li a .title {
  position: relative;
  display: block;
  padding: 0 10px;
  height: 60px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
}

.navigation ul li:hover a::before,
.navigation ul li.active a::before {
  content: "";
  position: absolute;
  right: 0;
  top: -50px;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px 35px 0 10px var(--white);
  pointer-events: none;
}

.navigation ul li:hover a::after,
.navigation ul li.active a::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -50px;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px -35px 0 10px var(--white);
  pointer-events: none;
}

.navigation ul li:nth-child(1):hover a::after,
.navigation ul li:nth-child(1):hover a::before {
  background: var(--blue);
  box-shadow: none;
}

.main {
  position: absolute;
  width: calc(100% - 300px);
  left: 300px;
  min-height: 100vh;
  background: var(--white);
  transition: 0.5s;
}
.main.active {
  width: calc(100% - 75px);
  left: 75px;
}

.main .corpo {
  top: 70px;
}

.topbar {
  width: 100%;
  margin-top: 20px;
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

.title {
  position: relative;
  width: 400px;
  margin: 0 10px;
  text-align: center;
}

.title h1 {
  position: relative;
  width: 100%;
  color: #777;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
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
</style>