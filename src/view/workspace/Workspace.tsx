import { SlideType } from "../../store/PresentationType";
import { Slide } from "../slide/Slide";
import styles from "./Workspace.module.css";
import { useAppSelector } from "../../hooks/useAppSelector";

function Workspace() {
  const editor = useAppSelector((editor) => editor);
  const slides = editor.presentation.slideCollection.slides;
  const selection = editor.selection;
  const selectedSlide: SlideType =
    slides.find((slide) => slide.id === selection.selectedSlideId) || slides[0];
  return (
    <section className={styles.workspace}>
      <Slide slide={selectedSlide}></Slide>
    </section>
  );
}

export { Workspace };
