import { Slide } from "../slide/Slide";
import styles from "./SlideList.module.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppActions } from "../../hooks/useAppActions";
import { DragEvent } from "react";

const SLIDE_PREVIEW_SCALE = 0.2;

function getSlideWrapperClassName(
  slideId: string,
  selectedSlideId: string | undefined,
  isDragging: boolean
): string {
  let className = styles.slideWrapper;
  if (slideId === selectedSlideId) {
    className = `${className} ${styles.selectedSlide}`;
  }
  if (isDragging) {
    className = `${className} ${styles.dragging}`;
  }
  return className;
}

function SlideList() {
  const editor = useAppSelector((editor) => editor);
  const slides = editor.presentation.slideCollection.slides;
  const selection = editor.selection;

  const { setSelection, moveSlide } = useAppActions();

  function onSlideClick(slideId: string) {
    setSelection({
      selectedSlideId: slideId,
    });
  }
  const handleDragStart = (e: DragEvent<HTMLElement>, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
    const target = e.target as HTMLDivElement;
    target.classList.add(styles.dragging);
  };

  const handleDragEnd = (e: DragEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    target.classList.remove(styles.dragging);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLElement>, toIndex: number) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (fromIndex === toIndex) return;

    moveSlide(fromIndex, toIndex);
  };

  return (
    <ul className={styles.slideList}>
      {slides.map((slide, index) => (
        <li
          key={slide.id}
          onClick={() => onSlideClick(slide.id)}
          className={getSlideWrapperClassName(
            slide.id,
            selection?.selectedSlideId,
            false
          )}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          <Slide
            slide={slide}
            scale={SLIDE_PREVIEW_SCALE}
            className={styles.item}
          ></Slide>
        </li>
      ))}
    </ul>
  );
}

export { SlideList };
