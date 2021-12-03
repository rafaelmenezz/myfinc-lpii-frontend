<template>

  <div class="uk-align-left uk-text-left uk-light">
      <vk-nav class="uk-margin">
        <router-link to="/myfinc/mural"  custom  v-slot="{ href, isActive }">
          <vk-nav-item class="uk-margin-large-left menu-link"  :active="isActive" :href="href" icon="thumbnails" title="Mural "></vk-nav-item>
         </router-link>
        <router-link  to="/myfinc/perfil" custom  v-slot="{ href, isActive }">
          <vk-nav-item class="uk-margin-large-left" :active="isActive" icon="user" :href="href" title="Perfil"></vk-nav-item>
        </router-link>
        <router-link to="/myfinc/receita" custom  v-slot="{ href, isActive }">
        <vk-nav-item class="uk-margin-large-left" :active="isActive" icon="pull" :href="href" title="Receitas"></vk-nav-item>
         </router-link>
         <router-link to="/myfinc/despesa" custom  v-slot="{ href, isActive }">
       <vk-nav-item class="uk-margin-large-left" :active="isActive" icon="push" :href="href" title="Depesas"></vk-nav-item>
       </router-link>
       
        <vk-nav-item class="uk-margin-large-left"  @click="logout" icon="sign-out"  title="Logout"></vk-nav-item>
      
      </vk-nav>
    
    </div>

</template>

<script>
import { userKey } from '@/global'

export default {
  name: "Nav",
    data(){
    return{
        isActive: function(path){
            if(this.$route.path == path){
                return true;
            }
          }
    
        }
    },
     methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            window.location = '/'
        }
    }
};
</script>

<style>

.menu-link{
  font-size: 1rem;
  color: rgba(78, 233, 78, 0.25);
}
</style> 