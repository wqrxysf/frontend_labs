import { defaultEditor } from "./data";
import { EditorType } from "./EditorType";

type Handler = () => void;
type ModifyFn = (edtor: EditorType, payload: any) => EditorType;

let _editor = defaultEditor;
let _handler: Handler | null = null;

function getEditor() {
  return _editor;
}

function setEditor(newEditor: any) {
  _editor = newEditor;
}

function dispatch(modifyFn: ModifyFn, payload?: any): void {
  const newEditor = modifyFn(_editor, payload);
  setEditor(newEditor);

  if (_handler) {
    _handler();
  }
}

function addEditorChangeHandler(handler: Handler): void {
  _handler = handler;
}

export { getEditor, dispatch, addEditorChangeHandler, _editor };
