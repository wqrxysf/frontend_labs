import { EditorType } from "./EditorType";
import { Presentation, SlideType } from "./PresentationType";

const slide1: SlideType = {
  id: "slide-1",
  background: {
    color: "#FFFFFF",
    type: "solid",
  },
  contents: [],
};
const presentation: Presentation = {
  title: "New Presentation",
  slideCollection: {
    slides: [slide1],
  },
};

export const defaultData: EditorType = {
  presentation,
  selection: {
    selectedSlideId: presentation.slideCollection.slides[0].id,
    selectedContentId: "",
  },
};
