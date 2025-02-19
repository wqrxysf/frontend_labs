import { Middleware } from "redux";
import { EditorType } from "../EditorType";
import Ajv from "ajv";
import { schema } from "../importPresentation";
import { _editor } from "../editor";

const LOCAL_STORAGE_KEY = "presentation_editor_state";

const ajv = new Ajv();
const validate = ajv.compile(schema);

const localStorageMiddleware: Middleware = (editor) => (next) => (action) => {
  const result = next(action);

  try {
    const state = editor.getState() as EditorType;
    const valid = validate(state);
    if (!valid) {
      console.error("Ошибка валидации перед сохранением:", validate.errors);
      return result;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Ошибка при сохранении состояния редактора:", error);
  }

  return result;
};

const loadStateFromLocalStorage = (): EditorType | undefined => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Ошибка при загрузке состояния редактора:", error);
    return undefined;
  }
};

export { localStorageMiddleware, loadStateFromLocalStorage };
