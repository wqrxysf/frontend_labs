import { EditorType } from "./EditorType";

function removeContentFromSlide(
  editor: EditorType,
  payload: { slideId: string; contentId: string }
): EditorType {
  const slides = editor.presentation.slideCollection.slides.map((slide) =>
    slide.id === payload.slideId
      ? {
          ...slide,
          contents: slide.contents.filter(
            (content) => content.contentId !== payload.contentId
          ),
        }
      : slide
  );
  editor.selection.selectedContentId = "";

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slideCollection: {
        slides,
      },
    },
    selection: {
      ...editor.selection,
      selectedContentId: editor.selection.selectedContentId,
    },
  };
}

export { removeContentFromSlide };
