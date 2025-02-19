import { ActionType } from "./actions";

const renamePresentationTitle = (title: string) => ({
  type: ActionType.RENAME_PRESENTATION_TITLE,
  payload: { title },
});

function addSlide() {
  return {
    type: ActionType.ADD_SLIDE,
  };
}

function removeSlide() {
  return {
    type: ActionType.REMOVE_SLIDE,
  };
}

const addTextToSlide = (slideId: string) => ({
  type: ActionType.ADD_TEXT_CONTENT,
  payload: { slideId },
});
const addImageToSlide = (slideId: string, src: string) => ({
  type: ActionType.ADD_IMAGE_CONTENT,
  payload: {
    slideId,
    src,
  },
});

export const addImageToSlideFromUnsplash = () => ({
  type: ActionType.ADD_IMAGE_CONTENT_UNSPLASH,
});

const removeContentFromSlide = (slideId: string, contentId: string) => ({
  type: ActionType.REMOVE_CONTENT,
  payload: {
    slideId,
    contentId,
  },
});

const changeTextContent = (
  slideId: string,
  contentId: string,
  field: string
) => ({
  type: ActionType.CHANGE_TEXT_CONTENT,
  payload: {
    slideId,
    contentId,
    field,
  },
});
const changeSlideBackground = (slideId: string, background: string) => ({
  type: ActionType.CHANGE_SLIDE_BACKGROUND,
  payload: {
    slideId,
    background,
  },
});

const moveSlide = (fromIndex: number, toIndex: number) => ({
  type: ActionType.MOVE_SLIDE,
  payload: { fromIndex, toIndex },
});

const moveObject = (
  slideId: string,
  contentId: string,
  x: number,
  y: number
) => ({
  type: ActionType.MOVE_OBJECT,
  payload: { slideId, contentId, x, y },
});

export {
  addSlide,
  removeSlide,
  addTextToSlide,
  addImageToSlide,
  removeContentFromSlide,
  changeTextContent,
  changeSlideBackground,
  renamePresentationTitle,
  moveObject,
  moveSlide,
};
