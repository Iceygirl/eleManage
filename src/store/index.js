import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        routerName:''
    },
    mutations:{
        set_routerName(state,name) {
            state.routerName = name
        }
    }
})


export default store
