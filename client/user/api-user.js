const create = (user) => {
    return fetch('/api/users/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            return response.json()
        })
        .catch((err) => console.log(err))
}

const list = ()=>{
    return fetch('/api/user',{
        method : 'GET'
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}