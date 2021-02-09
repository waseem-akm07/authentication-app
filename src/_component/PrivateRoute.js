import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <component {...props} />
            : <Redirect to={{
                pathname='/login', state={
                    from: props.location
                }
            }} />
    )} />
)