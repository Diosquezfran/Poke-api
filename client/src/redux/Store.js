import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//importo el reducer
import Reducer from './Reducers';

export const store = createStore(
    //el reducer y thunk para async
    Reducer, applyMiddleware(thunk)
);