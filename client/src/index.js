import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

// import 'normalize.css';
import './index.css';

import App from './components/App/App';
import reducers from './reducers';
import { fetchUser } from './actions';

import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

store.dispatch(fetchUser()).then(() => console.log(store.getState()));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
