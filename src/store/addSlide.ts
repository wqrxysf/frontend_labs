import { EditorType } from "./EditorType";
import { SlideType } from "./PresentationType";
import { createNewSlide } from "./redux/createNewSlide";

function addSlide(editor: EditorType): EditorType {
  const selection = editor.selection;
  const newSlide = createNewSlide();
  const slides: SlideType[] = [];
  if (selection) {
    for (const slide of editor.presentation.slideCollection.slides) {
      slides.push(slide);
      if (slide.id === selection.selectedSlideId) {
        slides.push(newSlide);
      }
    }
  } else {
    slides.push(newSlide);
  }
  return {
    presentation: {
      ...editor.presentation,
      slideCollection: {
        slides: slides,
      },
    },
    selection: {
      selectedSlideId: newSlide.id,
    },
  };
}

export { addSlide };
