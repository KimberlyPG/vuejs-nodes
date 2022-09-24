import { createStore } from 'vuex'

const store = createStore({
    state: {
        jsToPython: '',
        jsToPythonCount: '',
        jsToPythonBucle: [],
        jsImport: {},
        programOptions: [],
        programId: ''
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
        },
        setJsImport(state, value)
        {
            state.jsImport = value
        },
        setProgramOptions(state, value)
        {
            state.programOptions = value
        },
        setProgramId(state, value) 
        {
            state.programId = value
        }
    },
    getters: {
        jsToPythonData: function (state) {
            return `${state.jsToPython}`
        } 
    }
});

export default store;