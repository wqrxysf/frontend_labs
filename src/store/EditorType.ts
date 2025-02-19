import { Presentation } from "./PresentationType";

export type SelectionType = {
  selectedSlideId?: string;
  selectedContentId?: string;
};

export type EditorType = {
  presentation: Presentation;
  selection: SelectionType;
};
