import { createStore } from 'vuex'

const store = createStore({
    state: {
        jsToPython: '',
        jsToPythonPrint: '',
        jsToPythonBucle: [],
        jsImport: {},
        programOptions: [],
        programUid: '',
        jsToJava: '',
        jsToJavaPrintln: '',
        jsToCplus: '',
        jsToCplusCout: '',
    },
    mutations: {
        setJsToPython(state, value)
        {
            state.jsToPython = value
        },
        setJsToPythonPrint(state, value) 
        {
            state.jsToPythonPrint = value
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
        setProgramUid(state, value) 
        {
            state.programUid = value
        },
        setJsToJava(state, value) 
        {
            state.jsToJava = value
        },
        setJsToJavaPrintln(state, value)
        {
            state.jsToJavaPrintln = value
        },
        setJsToCplus(state, value) 
        {
            state.jsToCplus = value
        },
        setJsToCplusCout(state, value)
        {
            state.jsToCplusCout = value
        }
    },
    getters: {
        jsToPythonData (state) {
            return state.jsToPython
        },
        jsToPythonPrint (state) {
            return state.jsToPythonPrint
        }
        ,
        jsToPythonBucleData (state) {
            return  state.jsToPythonBucle
        }
        ,
        jsImport (state) {
            return state.jsImport
        },
        programOptions (state) {
            return state.programOptions
        }, 
        programUid (state) {
            return state.programUid
        },
        jsToJavaData (state) {
            return state.jsToJava
        },
        jsToJavaPrintlnData (state) {
            return state.jsToJavaPrintln
        },
        jsToCplusData (state) {
            return state.jsToCplus
        },
        jsToCplusCout (state) {
            return state.jsToCplusCout
        }
    }
});

export default store;