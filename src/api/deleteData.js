import store from '../store/index'

export const deleteData = async ()=>{
    const programId = store.state.programId
    fetch(`http://localhost:5000/deleteProgram?id=${programId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    })
}