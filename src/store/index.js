import { createStore } from 'vuex'

const store = createStore({
    state: {
        jsToPython: '',
        jsToPythonCount: '',
    },
    mutations: {
        setJsToPython(state, value)
        {
            state.jsToPython = value;
        },
        setJsToPythonCount(state, value) 
        {
            state.jsToPythonCount = value
        }
    },
    getters: {
        jsToPythonData: function (state) {
            return `${state.jsToPython}`
        } 
    }
});

export default store;