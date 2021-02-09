import { combineReducers } from 'redux';

import { authentication } from './Authentication-Reducer';
import { registration } from './Registration-Reducer';
import { user } from './User-Reducer';
import { alert } from './Alert-Reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    user,
    alert
});

export default rootReducer;