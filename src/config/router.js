import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '@/App'
// import Home from '@/components/templates/home/content/home'
import Aplication from '@/Aplication'
import Inicio from '@/components/inicio/Inicio'
import Perfil from '@/components/perfil/Perfil'
import Familia from '@/components/familia/Familia'
import Financas from '@/components/financas/Financas'
import Sobre from '@/components/sobre/Sobre'


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
    }, {
        name: 'sobre',
        path: '/sobre',
        components: {
            default: Aplication,
            main: Sobre,
        },

    },
    {
        path: '/',
        redirect: '/inicio'
    }]

// const routes = [

//     {
//         name: '',
//         path: '/',
//         components: {
//             default: App
//         }
//     },

//     {
//         name: 'Inicio',
//         path: '/aplication/inicio',
//         components: {
//             default: Aplication,
//             main: Inicio,
//         }
//     },
//     {
//         name: 'Perfil',
//         path: '/aplication/perfil',
//         components: {
//             default: Aplication,
//             main: Perfil,
//         }
//     },
//     {
//         name: 'Familia',
//         path: '/aplication/familia',
//         components: {
//             default: Aplication,
//             main: Familia,
//         }
//     },
//     {
//         name: 'Finanças',
//         path: '/aplication/financas',
//         components: {
//             default: Aplication,
//             main: Financa,
//         }
//     },
//     {
//         name: 'Sobre',
//         path: '/aplication/sobre',
//         components: {
//             default: Aplication,
//             main: Sobre,
//         }
//     },
//     {
//         path: '/aplication',
//         redirect: '/aplication/inicio'
//     }]

export default new VueRouter({
    mode: 'history',
    routes
})

