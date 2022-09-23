import { createStore } from 'vuex'

const store = createStore({
    state: {
        jsToPython: '',
        jsToPythonCount: '',
        jsToPythonBucle: []
    },
    mutations: {
        setJsToPython(state, value)
        {
            state.jsToPython = value;
        },
        setJsToPythonCount(state, value) 
        {
            state.jsToPythonCount = value
        },
        setJsToPythonBucle(state, value)
        {
            state.jsToPythonBucle = value
        }
    },
    getters: {
        jsToPythonData: function (state) {
            return `${state.jsToPython}`
        } 
    }
});

export default store;