import { authHeader } from '../_helper';

export const userService={
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOption={
        method: 'POST',
        headers: { 'Content-Type': 'application/josn'},
        body: JSON.stringify({ username, password})
    };

    return fetch(`/users/authenticate`, requestOption)
    .then(handleResponse)
    .then(user=>{
        //store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    });
}

function logout() {
    //remove user to localsotrage on user log out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOption={
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`users/${id}`, requestOption).then(handleResponse);
}

function getById(id) {
    const requestOption={
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`users${id}`, requestOption).then(handleResponse);
}

function request(user) {
    const requestOption={
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type':'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(`users/register`, requestOption).then(handleResponse);
}

function update(user) {
    const requestOption={
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type':'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(`user/${id}`, requestOption).then(handleResponse);
}

function _delete(id) {
    const requestOption={
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`users/${id}`, requestOption).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text=>{
        const data=text && JSON.parse(text);
        if(!response.ok){
            if(response.status===401){
                //auto log out if 401 response return from api
                logout();
                location.relod(true);
            }

            const error={ data && data.message} || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}