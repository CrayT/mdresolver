import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    test: 'test'
}

export default new Vuex.Store({
    state: state
})