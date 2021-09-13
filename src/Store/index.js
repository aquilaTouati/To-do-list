import { createStore } from "redux";
import listReducer from "../Reducer/reducer";

const store = createStore(
  listReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
);

export default store;
