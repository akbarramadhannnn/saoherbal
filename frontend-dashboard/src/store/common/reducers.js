import { CHANGE_ERROR_COMMON } from "./actionsTypes";

const initialState = {
  error: "",
};

const Common = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_ERROR_COMMON:
      state = {
        ...state,
        error: payload.error,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default Common;
