import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '@/App'
import Aplication from '@/Aplication'
import Inicio from '@/components/inicio/Inicio'
import Perfil from '@/components/perfil/Perfil'
import Familia from '@/components/familia/Familia'
import Financas from '@/components/financas/Financas'



Vue.use(VueRouter)

const routes = [
    {
        name: 'App',
        path: '/',
        component: App
    },
    {
        name: 'inicio',
        path: '/inicio',
        components: {
            default: Aplication,
            main: Inicio,
        }
    }, {
        name: 'perfil',
        path: '/perfil',
        components: {
            default: Aplication,
            main: Perfil,
        }
        ,
    }, {
        name: 'familia',
        path: '/familia',
        components: {
            default: Aplication,
            main: Familia,
        }
    }, {
        name: 'financas',
        path: '/financas',
        components: {
            default: Aplication,
            main: Financas,
        }
    }, 
   ]


export default new VueRouter({
    mode: 'history',
    routes
})

