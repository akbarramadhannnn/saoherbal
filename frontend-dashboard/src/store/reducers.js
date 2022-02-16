import { combineReducers } from "redux";
import Layout from "./layout/reducer";
import Auth from "./auth/reducers";
import Profile from "./auth/profile/reducer";
import Common from "./common/reducers";

const rootReducer = combineReducers({
  // public
  Layout,
  Auth,
  Profile,
  Common,
});

export default rootReducer;
