<template>
  <div class="nave nave-masthead justify-content-center uk-margin-top uk-align-right">
    <router-link class="nave-link"  :class="{ active: isActive('/')}"   to="/"> home </router-link>
    <router-link class="nave-link"  :class="{ active: isActive('/about')}"  to="/about"> sobre </router-link>
    <router-link class="nave-link"  :class="{ active: isActive('/login')}"  to="/login"> login </router-link>
  </div>
</template>

<script>
export default {
  name: "Navegacao",
  data(){
    return{
        isActive: function(path){
            if(this.$route.path == path){
                return true;
            }
          }
    
        }
    }
}
</script> 

<style scoped>
.nave-masthead .nave-link {
  padding: 0.25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  background-color: transparent;
  border-bottom: 0.25rem solid transparent;
}


.nave-masthead .nave-link:hover,
.nave-masthead .nave-link:focus {
  border-bottom-color: #fff;
  text-decoration: none;
  color: #fff;
}

.nave-masthead .nave-link + .nave-link {
  margin-left: 1rem;
}

.nave-masthead .active {
  color: #fff;
  border-bottom-color:  #fff;
}


.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none; /* Prevent inheritance from `body` */
  background-color: #fff;
  border: 0.05rem solid #fff;
}
@media (min-width: 48em) {
  .nav-masthead {
    float: right;
  }
}
</style>