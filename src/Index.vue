<template>
  <div id="app" class="uk-margin-remove">
    <div class="corpo">
      <div>
        <Header />
        <main role="main" class="uk-margin-large-top main uk-margin-auto">
          <router-view name="mainApp"></router-view>
        </main>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/templates/home/Header";
import Footer from "@/components/templates/home/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
a,
a:focus,
a:hover {
  color: #fff;
}
text-center {
  text-align: center !important;
}

#app {
  -webkit-box-pack: center;
  justify-content: center;

  height: 100vh;
  text-align: center;
  color: #fff;
  margin: 0;
  background-color: #333;
  text-shadow: 0 0.05rem 0.1rem rgb(0 0 0 / 50%);
  box-shadow: inset 0 0 5rem rgb(0 0 0 / 50%);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}
.corpo {
  width: 100vw;
}
.main{
  width: 50vw;
}
</style>
