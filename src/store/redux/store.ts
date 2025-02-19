import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";
import {
  loadStateFromLocalStorage,
  localStorageMiddleware,
} from "./localStorage";

const initialState = loadStateFromLocalStorage();

const store = createStore(
  editorReducer,
  initialState,
  applyMiddleware(localStorageMiddleware)
);

export { store };
