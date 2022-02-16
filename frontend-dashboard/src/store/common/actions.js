import { CHANGE_ERROR_COMMON } from "./actionsTypes";

export const changerErrorCommon = value => {
  dispatch({
    type: CHANGE_ERROR_COMMON,
    payload: {
      error: value,
    },
  });
};
