import axios from "axios";
import { URL_API_BACKEND } from "../config/url";
import store from "../store";
import { LOAD_USER } from "../store/auth/actionsTypes";
import { CHANGE_ERROR_COMMON } from "../store/common/actionsTypes";

const axiosInstanceDefault = axios.create({
  baseURL: URL_API_BACKEND,
});
axiosInstanceDefault.interceptors.request.use(async config => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    Accept: "application/json",
  };
  return config;
});
axiosInstanceDefault.interceptors.response.use(
  async response => {
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
  },
  async error => {
    if (error.message === "Network Error") {
      store.dispatch({
        type: CHANGE_ERROR_COMMON,
        payload: {
          error: error.message,
        },
      });
    }
  }
);

export default axiosInstanceDefault;
