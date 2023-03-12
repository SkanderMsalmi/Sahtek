import {createStore,applyMiddleware,combineReducers} from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key:'main-root',
    storage,
}
const appReducer = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig,appReducer);

const middleware = [thunkMiddleware];

if(process.env.NODE_ENV === 'development'){
    middleware.push(logger);
}

 const store = createStore(persistedReducer,composeWithDevTools(
    applyMiddleware(...middleware))
    );

    const Persistor = persistStore(store);
    export {Persistor};
    export default store;