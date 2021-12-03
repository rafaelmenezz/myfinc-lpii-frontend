<template>
  <aside class="masthead mb-auto">
      <div class="sidebar" data-color="green" data-background-color="black">
      <div class="logo"><a href="/myfinc" class="simple-text logo-normal playball">
         <img src="lib/imagens/logo_branca.svg" alt="myfinc" width="100"> 
        </a></div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li class="nav-item active  ">
            <a class="nav-link" href="/myfinc">
              <i class="material-icons">dashboard</i>
              <p>MyFinc</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="#">
              <i class="material-icons">person</i>
              <p>Perfil do Usuário</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="/receitas">
              <i class="material-icons">trending_up</i>
              <p>Receitas</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="#">
              <i class="material-icons">trending_down</i>
              <p>Despesas</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="#">
              <i class="material-icons">settings</i>
              <p>Configurações</p>
            </a>
          </li>
        
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>



export default {
  name: "Menu",
  components: {
    
  }
};
</script>

<style scoped>

</style>