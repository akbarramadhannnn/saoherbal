import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import thunk from 'redux-thunk';
import rootSaga from "./sagas";

const initialState = {};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
sagaMiddleware.run(rootSaga);

export default store;
