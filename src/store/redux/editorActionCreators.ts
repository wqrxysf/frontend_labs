import { EditorType } from "../EditorType";
import { ActionType } from "./actions";

function setEditor(newEditor: EditorType) {
  return {
    type: ActionType.SET_EDITOR,
    payload: newEditor,
  };
}
const importEditor = (presentationJson: string) => ({
  type: ActionType.IMPORT_PRESENTATION,
  payload: {
    presentation: presentationJson,
  },
});
const exportEditor = () => ({
  type: ActionType.EXPORT_PRESENTATION,
});

const exportToPDF = () => ({
  type: ActionType.EXPORT_TO_PDF,
});

const undo = () => ({
  type: ActionType.UNDO,
});

const redo = () => ({
  type: ActionType.REDO,
});

export { setEditor, importEditor, exportEditor, exportToPDF, undo, redo };
