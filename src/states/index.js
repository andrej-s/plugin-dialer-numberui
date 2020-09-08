import { combineReducers } from 'redux';

import { reduce as NumberSelectReducer } from './NumberSelectState';

// Register your redux store under a unique namespace
export const namespace = 'dialer-numberui';

// Combine the reducers
export default combineReducers({
  NumberSelect: NumberSelectReducer
});
