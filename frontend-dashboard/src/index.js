import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";

import { Provider } from "react-redux";
import store from "./store";

// Import scss
import "./assets/scss/theme.scss";

const Index = () => {
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
