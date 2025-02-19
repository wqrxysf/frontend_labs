import { EditorType } from "./EditorType";

function changeTextContent(
  editor: EditorType,
  payload: { slideId: string; contentId: string; field: string }
): EditorType {
  console.log(1, editor);

  const slides = editor.presentation.slideCollection.slides.map((slide) => {
    if (slide.id === payload.slideId) {
      const contents = slide.contents.map((content) => {
        if (content.contentId === payload.contentId && "field" in content) {
          return {
            ...content,
            field: payload.field,
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

export { changeTextContent };
