import { EditorType } from "./EditorType";
import { Background } from "./PresentationType";

function changeSlideBackground(
  editor: EditorType,
  payload: { slideId: string; background: string }
): EditorType {
  if (!editor.selection) {
    return editor;
  }
  const isHexColor = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(payload.background);
  const isRgbColor = /^(rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\))$/.test(
    payload.background
  );

  let newBackground: Background;

  if (isHexColor || isRgbColor) {
    newBackground = {
      type: "solid",
      color: payload.background,
    };
  } else {
    newBackground = {
      type: "image",
      src: payload.background,
    };
  }

  const slides = editor.presentation.slideCollection.slides.map((slide) =>
    slide.id === editor.selection.selectedSlideId
      ? { ...slide, background: newBackground }
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
      selectedSlideId: editor.selection.selectedSlideId,
    },
  };
}

export { changeSlideBackground };
