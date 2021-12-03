<template>
    <main class="uk-width-4-5 main-page">
        <Header  :icon="icon" :main="main"  />
        <router-view></router-view>
        <Footer />
        

  

    </main>
</template>

<script>
import Header from "@/components/templates/app/HeaderMain"
import Footer from "@/components/templates/app/FooterMain"

export default {
    name: 'Main',
    components:{Header, Footer},
    props: ['icon', 'main', 'sub']
}
</script>

<style>
.main-page{
    height:100vh;
   
}
</style>