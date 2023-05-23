import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import {createStore} from 'redux';
import {applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers/rootReducer';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import thunk from 'redux-thunk';
import {reduxFirestore , getFirestore} from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCPs4B7ZJqh1iYLAFNOyqohYp6FmJ9rHCA",
  authDomain: "resume-banalo.firebaseapp.com",
  projectId: "resume-banalo",
  storageBucket: "resume-banalo.appspot.com",
  messagingSenderId: "685525376579",
  appId: "1:685525376579:web:e69fc33e5e3de41ddd3ef6"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore()

const reduxStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), reduxFirestore(firebase)))

ReactDOM.render(
  <BrowserRouter>
  <Provider store={reduxStore}>/
   
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={reduxStore.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <App />
      </ReactReduxFirebaseProvider>
   
  </Provider>
  </BrowserRouter>
,
  document.getElementById('root')
);