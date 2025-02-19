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

const slide2: SlideType = {
  id: "slide-2",
  background: { src: "background-1.jpg", type: "image" },
  contents: [
    {
      type: "text",
      contentId: "text-1",
      field: "Text Field",
      fontSize: 24,
      fontFamily: "Arial",
      x: 600,
      y: 200,
      width: 300,
      height: 50,
    },
    {
      type: "image",
      contentId: "image-8",
      src: "image-2.jpg",
      x: 20,
      y: 20,
      width: 400,
      height: 300,
    },
    {
      type: "image",
      contentId: "image-4",
      src: "image-2.jpg",
      x: 70,
      y: 380,
      width: 100,
      height: 70,
    },
  ],
};

const presentation: Presentation = {
  title: "New Presentation",
  slideCollection: {
    slides: [slide1, slide2],
  },
};

export const defaultEditor: EditorType = {
  presentation,
  selection: {
    selectedSlideId: presentation.slideCollection.slides[0].id,
    selectedContentId: "",
  },
};
