import { EditorType } from "./EditorType";
import { Content } from "./PresentationType";

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function addImageToSlide(
  editor: EditorType,
  payload: { slideId: string; src: string }
): EditorType {
  console.log(editor);
  const slideId = editor.selection.selectedSlideId;
  let content: Content;
  content = {
    contentId: generateId(),
    type: "image",
    src: payload.src,
    width: 200,
    height: 150,
    x: Math.random() * 100 + 350,
    y: Math.random() * 60 + 200,
  };

  const slides = editor.presentation.slideCollection.slides.map((slide) =>
    slide.id === slideId
      ? { ...slide, contents: [...slide.contents, content] }
      : slide
  );

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
      selectedContentId: content.contentId,
    },
  };
}

export { addImageToSlide };
