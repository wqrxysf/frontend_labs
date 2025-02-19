import { EditorType } from "../EditorType";
import { addSlide } from "../addSlide";
import { ActionType, EditorAction } from "./actions";
import { removeSlide } from "../removeSlide";
import { defaultEditor } from "../data";
import { addTextToSlide } from "../addTextToSlide";
import { addImageToSlide } from "../addImageToSlide";
import { removeContentFromSlide } from "../removeContentFromSlide";
import { changeTextContent } from "../changeTextContent";
import { changeSlideBackground } from "../changeSlideBackground";
import { importPresentation } from "../importPresentation";
import { exportPresentation } from "../exportPresentation";
import { exportEditorToPDF } from "../exportToPDF";

let undoStack: EditorType[] = [];
let redoStack: EditorType[] = [];
const MAX_HISTORY_LENGTH = 50;

function shouldSaveToHistory(action: EditorAction): boolean {
  return ![ActionType.SET_SELECTION, ActionType.UNDO, ActionType.REDO].includes(
    action.type
  );
}

const editorReducer = (
  editor: EditorType = defaultEditor,
  action: EditorAction
): EditorType => {
  if (shouldSaveToHistory(action)) {
    undoStack.push(JSON.parse(JSON.stringify(editor)));
    if (undoStack.length > MAX_HISTORY_LENGTH) {
      undoStack.shift();
    }
  }

  switch (action.type) {
    case ActionType.ADD_SLIDE:
      return addSlide(editor);
    case ActionType.REMOVE_SLIDE:
      return removeSlide(editor);
    case ActionType.SET_SELECTION:
      return {
        ...editor,
        selection: action.payload,
      };
    case ActionType.SET_EDITOR:
      return action.payload;
    case ActionType.ADD_TEXT_CONTENT:
      return addTextToSlide(editor, action.payload);
    case ActionType.ADD_IMAGE_CONTENT:
      return addImageToSlide(editor, action.payload);
    case ActionType.ADD_IMAGE_CONTENT_UNSPLASH:
      return {
        ...editor,
        ...action.payload,
      };
    case ActionType.REMOVE_CONTENT:
      return removeContentFromSlide(editor, action.payload);
    case ActionType.CHANGE_TEXT_CONTENT:
      return changeTextContent(editor, action.payload);
    case ActionType.CHANGE_SLIDE_BACKGROUND:
      return changeSlideBackground(editor, action.payload);
    case ActionType.RENAME_PRESENTATION_TITLE:
      return {
        ...editor,
        presentation: {
          ...editor.presentation,
          title: action.payload.title,
        },
      };
    case ActionType.IMPORT_PRESENTATION:
      return importPresentation(action.payload.presentation);
    case ActionType.EXPORT_PRESENTATION:
      return exportPresentation(editor);
    case ActionType.EXPORT_TO_PDF:
      return exportEditorToPDF(editor);
    case ActionType.UNDO:
      if (undoStack.length > 0) {
        const prevState = undoStack.pop()!;
        redoStack.push(JSON.parse(JSON.stringify(editor)));
        return prevState;
      }
      return editor;
    case ActionType.REDO:
      if (redoStack.length > 0) {
        const nextState = redoStack.pop()!;
        undoStack.push(JSON.parse(JSON.stringify(editor)));
        return nextState;
      }
      return editor;
    case ActionType.MOVE_SLIDE:
      const { fromIndex, toIndex } = action.payload;
      const newSlides = [...editor.presentation.slideCollection.slides];
      const [movedSlide] = newSlides.splice(fromIndex, 1);
      newSlides.splice(toIndex, 0, movedSlide);
      return {
        ...editor,
        presentation: {
          ...editor.presentation,
          slideCollection: {
            slides: newSlides,
          },
        },
      };
    case ActionType.MOVE_OBJECT:
      const { slideId, contentId, x, y } = action.payload;
      return {
        ...editor,
        presentation: {
          ...editor.presentation,
          slideCollection: {
            slides: editor.presentation.slideCollection.slides.map((slide) => {
              if (slide.id !== slideId) return slide;
              return {
                ...slide,
                contents: slide.contents.map((content) => {
                  if (content.contentId !== contentId) return content;
                  return {
                    ...content,
                    x,
                    y,
                  };
                }),
              };
            }),
          },
        },
      };
    default:
      return editor;
  }
};

export { editorReducer };
