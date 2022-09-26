import { createStore } from 'vuex'

const store = createStore({
    state: {
        jsToPython: '',
        jsToPythonCount: '',
        jsToPythonBucle: [],
        jsImport: {},
        programOptions: [],
        programId: '',
        jsToJava: '',
        jsToJavaPrintln: ''
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
        },
        setJsToJava(state, value) 
        {
            state.jsToJava = value
        },
        setJsToJavaPrintln(state, value)
        {
            state.jsToJavaPrintln = value
        }
    },
    getters: {
        jsToPythonData: function (state) {
            return `${state.jsToPython}`
        },
        jsToPythonCountData: function (state) {
            return `${state.jsToPythonCount}`
        }
        ,
        JsToPythonBucleData: function (state) {
            return  `${state.jsToPythonBucle}`
        }
        ,
        JsImportData: function (state) {
            return `${state.jsImport}`
        },
        programOptionsData: function (state) {
            return `${state.programOptions}`
        }, 
        programIdData: function (state) {
            return `${state.programId}`
        },
        jsToJavaData: function (state) {
            return `${state.jsToJava}`
        },
        jsToJavaPrintlnData: function (state) {
            return `${state.jsToJavaPrintln}`
        }
    }
});

export default store;