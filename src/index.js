import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { Store } from './_helper';

// setup fake backend
import { configurationFakeBackend } from './_helper';
configurationFakeBackend();

ReactDOM.render(<Provider Store={Store}>
    <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

