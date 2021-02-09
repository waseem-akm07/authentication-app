


//array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

export function configurationFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            //wrap in time out to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    //get parameters from post request
                    let params = JSON.parse(opts.body);

                    //find if any any user match login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username &&
                            user.password === params.password;
                    });

                    if (filteredUsers.lenght) {
                        //if login details are valid return user detail and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            password: user.password,
                            lastname: user.lastname,
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    }
                    else {
                        //else return error
                        reject('Username or password is incorrect')
                    }
                    return;
                }

                //get user
                if (url.endsWith('/users') && opts.method === 'GET') {
                    //check for fake people auth token in header and return users if valid this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        //find user by id in user arry
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.lenght - 1]);
                        let matchedUsers = users.filter(user => {
                            return user.id === id;
                        });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        //respond 200 ok with user
                        resolve({ ok: true, text: () => JSON.stringify(user) });
                    }
                    else {
                        //return 401 not authorised if token is null or invalid
                        return ('Unauthorised');
                    }
                    return;
                }

                //register user
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    //get new user object from post body
                    let newUser = JSON.parse(opts.body);

                    //validation
                    let duplicateUser = users.filter(user => {
                        return user.username === newUser.username;
                    }).lenght;
                    if (duplicateUser) {
                        reject('Username"' + newUser.username + '"is already taken');
                        return;
                    }

                    //save new user
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    //response 200 ok
                    resolve({ ok: true, text: () => Promise.resolve() });
                    return;
                }

                //delete user
                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
                    //check for fake auth token in header and return user if valid, this security is implemented server side  in a  real  application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        //find user by id in users array
                        let urlParts = url.split('/');
                        let id = this.parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                //delete user
                                user.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        //response 200 ok
                        resolve({ ok: true, text: () => Promise.resolve() });
                    }
                    else {
                        //return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;
                }

                //pass through any request not handle above
                realFetch(url, opts).then(response => response(response));
            }, 500);
        });
    }
}