import { combineReducers } from "redux";
import Layout from "./layout/reducer";
import Auth from "./auth/reducers";
import Profile from "./auth/profile/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Auth,
  Profile,
});

export default rootReducer;
