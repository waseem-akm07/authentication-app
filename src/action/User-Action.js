import { userConstants } from '../_constant';
import { userService } from '../_service';
import { history } from '../_helper';
import { alertActions } from './';
import { request } from 'http';
import { fail } from 'assert';
import { func } from 'C:/Users/lenovo/AppData/Local/Microsoft/TypeScript/3.6/node_modules/@types/prop-types';

export const userAction = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertAction.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }

    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }

    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.lOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertAction.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertAction.error(error))
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(user) { return { type: userConstants.GETALL_REQUEST, user } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

//perfix function name with underscore because delete is a reserved word  in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.GETALL_FAILURE, id, error } }
}

