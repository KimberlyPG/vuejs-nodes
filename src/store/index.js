import { createStore } from 'vuex'

const store = createStore({
    state: {
        jsToPython: '',
        jsToPythonPrint: '',
        jsToPythonBucle: [],
        jsImport: {},
        programOptions: [],
        programId: '',
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
        setProgramId(state, value) 
        {
            state.programId = value
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
        jsImportData (state) {
            return state.jsImport
        },
        programOptionsData (state) {
            return state.programOptions
        }, 
        programIdData (state) {
            return state.programId
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