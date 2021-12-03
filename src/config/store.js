import { baseApiUrl, showError } from "@/global";
import axios from "axios";


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        user: null,
        avisos: null,
        familias: null
    },
    mutations: {
        toggleMenu(state) {
            state.isMenuVisible = !state.isMenuVisible
        },
        setUser(state, user) {
            state.user = user
            if (user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            } else {
                delete axios.defaults.headers.common['Authorization']
            }

        },
        setAvisos(state, avisos) {
            state.avisos = avisos
        },
        setFamilias(state, familias) {
            state.familias = familias
        }

    },
    actions: {
        async fetchAvisos({ commit, state }) {

            await axios
                .get(`${baseApiUrl}/convites/${state.user.cod}`)
                .then((res) => {
                    commit('setAvisos', res.data)
                    localStorage.setItem('avisos', JSON.stringify(res.data));
                })
                .catch(showError);

        },
        async fetchFamilias({ commit, state }) {
            await axios
                .get(`${baseApiUrl}/usuarios/grupos/${state.user.cod}`)
                .then((res) => {
                    commit('setFamilias', res.data)
                    localStorage.setItem('familias', JSON.stringify(res.data));
                })
                .catch(showError);

        }
    }

})