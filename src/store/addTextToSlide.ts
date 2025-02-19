import { uuidV4 } from "../utils/uuidV4";
import { EditorType } from "./EditorType";
import { Content } from "./PresentationType";

function addTextToSlide(
  editor: EditorType,
  payload: { slideId: string }
): EditorType {
  const content: Content = {
    contentId: uuidV4(),
    type: "text",
    field: "Text Field",
    fontSize: 20,
    fontFamily: "Arial",
    width: 300,
    height: 80,
    x: Math.random() * 1000,
    y: Math.random() * 600,
  };

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slideCollection: {
        slides: editor.presentation.slideCollection.slides.map((slide) => {
          if (slide.id !== payload.slideId) return slide;
          return {
            ...slide,
            contents: [...slide.contents, content],
          };
        }),
      },
    },
    selection: {
      selectedSlideId: payload.slideId,
      selectedContentId: content.contentId,
    },
  };
}

export { addTextToSlide };
