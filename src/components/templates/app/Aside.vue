<template>
    <aside class="menu uk-position-center-left uk-overflow-hidden">
        <div class="">
            <img class="uk-margin-top" src="@/assets/imagens/logo_branca.svg" width="100" alt="" />
        </div>
        <hr class="uk-width-2-3 uk-margin-auto">
        <Nav />
        <Footer />
    </aside>
</template>

<script>
import Nav from "@/components/templates/app/Nav"
import Footer from "@/components/templates/app/FooterMenu"

export default {
    name: 'Aside',
    components: {Nav, Footer},
    props: ['icon', 'main', 'sub']
}
</script>

<style>
.menu{
    max-width: 25vw;
    width: 20vw;
    background-color: #333;
    height:100vh;
    margin:0;
}


</style>