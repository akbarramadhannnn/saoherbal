import { LOAD_USER } from "./actionsTypes";

const initialState = {
  isAuth: "",
  user: {},
};

const Auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      state = {
        ...state,
        isAuth: payload.isAuth,
        user: payload.user,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default Auth;
