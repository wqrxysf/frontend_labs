import { EditorType } from "../EditorType";

enum ActionType {
  ADD_SLIDE = "addSlide",
  REMOVE_SLIDE = "removeSlide",
  SET_SELECTION = "setSelection",
  SET_EDITOR = "setEditor",
  RENAME_PRESENTATION_TITLE = "renamePresentationTitle",
  ADD_TEXT_CONTENT = "addTextToSlide",
  ADD_IMAGE_CONTENT = "addImageToSlide",
  ADD_IMAGE_CONTENT_UNSPLASH = "addImageFromUnsplash",
  REMOVE_CONTENT = "removeContentFromSlide",
  CHANGE_TEXT_CONTENT = "changeTextContent",
  CHANGE_SLIDE_BACKGROUND = "changeSlideBackground",
  IMPORT_PRESENTATION = "importPresentation",
  EXPORT_PRESENTATION = "exportPresentation",
  EXPORT_TO_PDF = "exportToPDF",
  UNDO = "undo",
  REDO = "redo",
  MOVE_SLIDE = "MOVE_SLIDE",
  MOVE_OBJECT = "MOVE_OBJECT",
}
type SetPresentationTitleAction = {
  type: ActionType.RENAME_PRESENTATION_TITLE;
  payload: {
    title: string;
  };
};
type AddSlideAction = {
  type: ActionType.ADD_SLIDE;
};

type RemoveSlideAction = {
  type: ActionType.REMOVE_SLIDE;
};

type SetSelectionAction = {
  type: ActionType.SET_SELECTION;
  payload: {
    selectedSlideId?: string;
    selectedContentId?: string;
  };
};

type SetEditorAction = {
  type: ActionType.SET_EDITOR;
  payload: EditorType;
};

type addTextToSlideAction = {
  type: ActionType.ADD_TEXT_CONTENT;
  payload: {
    slideId: string;
    field: string;
  };
};

type AddImageToSlideAction = {
  type: ActionType.ADD_IMAGE_CONTENT;
  payload: {
    slideId: string;
    src: string;
    alt: string;
  };
};

type AddImageFromUnsplashAction = {
  type: ActionType.ADD_IMAGE_CONTENT_UNSPLASH;
  payload: {
    slideId: string;
    src: string;
    alt: string;
  };
};

type RemoveContentAction = {
  type: ActionType.REMOVE_CONTENT;
  payload: {
    slideId: string;
    contentId: string;
  };
};
type ChangeTextContentAction = {
  type: ActionType.CHANGE_TEXT_CONTENT;
  payload: {
    slideId: string;
    contentId: string;
    field: string;
  };
};

type SetSlideBackgroundAction = {
  type: ActionType.CHANGE_SLIDE_BACKGROUND;
  payload: {
    slideId: string;
    background: string;
  };
};

type ImportPresentationAction = {
  type: ActionType.IMPORT_PRESENTATION;
  payload: {
    presentation: string;
  };
};

type ExportPresentationAction = {
  type: ActionType.EXPORT_PRESENTATION;
};
type ExportToPDFAction = {
  type: ActionType.EXPORT_TO_PDF;
};
type UndoAction = {
  type: ActionType.UNDO;
};

type RedoAction = {
  type: ActionType.REDO;
};

type MoveSlideAction = {
  type: ActionType.MOVE_SLIDE;
  payload: {
    fromIndex: number;
    toIndex: number;
  };
};

type MoveObjectAction = {
  type: ActionType.MOVE_OBJECT;
  payload: {
    slideId: string;
    contentId: string;
    x: number;
    y: number;
  };
};

type EditorAction =
  | SetPresentationTitleAction
  | AddSlideAction
  | RemoveSlideAction
  | SetSelectionAction
  | SetEditorAction
  | addTextToSlideAction
  | AddImageToSlideAction
  | AddImageFromUnsplashAction
  | RemoveContentAction
  | ChangeTextContentAction
  | SetSlideBackgroundAction
  | ImportPresentationAction
  | ExportPresentationAction
  | ExportToPDFAction
  | UndoAction
  | RedoAction
  | MoveObjectAction
  | MoveSlideAction;

export { ActionType, type SetSelectionAction, type EditorAction };
