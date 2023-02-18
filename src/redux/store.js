import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';
import rootReducer from './rootReducer';


const composedEnhancer = composeWithDevTools({trace: true});

const store = createStore(
	rootReducer,
	composedEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
