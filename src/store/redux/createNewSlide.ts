import { uuidV4 } from "../../utils/uuidV4";
import { SlideType } from "../PresentationType";

function createNewSlide(): SlideType {
  return {
    id: uuidV4(),
    background: {
      color: "#FFFFFF",
      type: "solid",
    },
    contents: [],
  };
}

export { createNewSlide };
