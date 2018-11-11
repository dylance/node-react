import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";
// Code to test email send in browser
import axios from "axios";
window.axios = axios;
// browser code
// const survey = { title: 'my title', subject: 'my subbject', recipients: 'dylancellison@gmail.com, dylanellison35mm@gmail.com, dylan.ellison@fahrenheit.io', body: 'here is the body of the email'}
// axios.post('/api/surveys', survey);

// instance of redux store, arguments are  reducers to be used in app
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
