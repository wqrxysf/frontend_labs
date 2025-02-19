import { EditorType } from "./EditorType";

function removeSlide(editor: EditorType): EditorType {
  if (!editor.selection) {
    return editor;
  }

  const removeSlideId = editor.selection.selectedSlideId;
  const removeSlideIndex = editor.presentation.slideCollection.slides.findIndex(
    (slide) => slide.id == removeSlideId
  );

  const newSlides = editor.presentation.slideCollection.slides.filter(
    (slide) => slide.id != removeSlideId
  );

  let newSelectedSlideId = undefined;
  if (newSlides.length > 0) {
    const index = Math.min(removeSlideIndex, newSlides.length - 1);
    newSelectedSlideId = newSlides[index].id;
  }

  return {
    presentation: {
      ...editor.presentation,
      slideCollection: {
        slides: newSlides,
      },
    },
    selection: {
      selectedSlideId: newSelectedSlideId,
      selectedContentId: undefined,
    },
  };
}

export { removeSlide };
