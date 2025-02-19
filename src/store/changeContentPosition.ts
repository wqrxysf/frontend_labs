import { EditorType } from "./EditorType";
import { Position } from "./PresentationType";

function changeContentPosition(
  editor: EditorType,
  payload: { newPos: Position }
): EditorType {
  const slideId = editor.selection.selectedSlideId;
  const contentId = editor.selection.selectedContentId;
  // console.log(newPos, slideId, contentId)

  const slides = editor.presentation.slideCollection.slides.map((slide) => {
    // console.log(slide.id, slideId)
    if (slide.id === slideId) {
      const contents = slide.contents.map((content) => {
        if (content.contentId === contentId) {
          return {
            ...content,
            x: payload.newPos.x,
            y: payload.newPos.y,
          };
        }
        return content;
      });

      return {
        ...slide,
        contents: contents,
      };
    }
    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slideCollection: {
        slides,
      },
    },
  };
}

export { changeContentPosition };
