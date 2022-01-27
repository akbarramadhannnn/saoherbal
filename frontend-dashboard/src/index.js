import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";

import { Provider } from "react-redux";
import { LOAD_USER } from "./store/auth/actionsTypes";
import { HandleLoadUser } from "./api/auth";
import store from "./store";

// Import scss
import "./assets/scss/theme.scss";

const Index = () => {
  useEffect(() => {
    HandleLoadUser().then(response => {
      if (response) {
        if (response.status === 200) {
          store.dispatch({
            type: LOAD_USER,
            payload: {
              isAuth: true,
              user: response.result,
            },
          });
        }
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
serviceWorker.unregister();
