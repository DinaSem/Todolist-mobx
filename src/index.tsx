import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {store} from './app/store';
import {Provider} from 'react-redux';
import {RootStateProvider} from "./app/stores/RootStateContext";
import AppAntD from "./app/AppAntD";

ReactDOM.render(
    <Provider store={store}>
    <RootStateProvider>
        <AppAntD/>
    </RootStateProvider>
</Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
