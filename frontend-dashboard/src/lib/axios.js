import axios from "axios";
import { URL_API_BACKEND } from "../config/url";
import store from "../store";
import { LOAD_USER } from "../store/auth/actionsTypes";

axios.defaults.baseURL = URL_API_BACKEND;
axios.interceptors.response.use(async response => {
  if (response.data.status === 401) {
    store.dispatch({
      type: LOAD_USER,
      payload: {
        isAuth: false,
        user: {},
      },
    });
    localStorage.removeItem("token");
  } else {
    return response.data;
  }
});
