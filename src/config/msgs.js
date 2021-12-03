import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 5000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realidada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'cadastroSuccess',
    payload => !payload.msg ? 'Cadastro realizado com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'conviteSuccess',
    payload => !payload.msg ? 'Convite enviado com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'editSuccess',
    payload => !payload.msg ? 'Cadastro atualizado com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)


Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops.. Erro inesperado.' + payload.msg : payload.msg,
    { type: 'error', icon: 'times' }
)