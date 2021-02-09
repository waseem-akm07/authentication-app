import { alertConstant } from '../_constant';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstant.SUCCESS, message };
}

function error(message) {
    return { type: alertConstant.ERROR, message };
}

function clear(message) {
    return { type: alertConstant.clear, message };
}