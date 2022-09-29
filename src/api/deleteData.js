import store from '../store/index'

export const deleteData = async ()=>{
    const programUid = store.getters.programUid;
    fetch(`http://localhost:5000/deleteProgram?id=${programUid}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    })
}