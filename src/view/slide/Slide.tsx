import { SlideType } from "../../store/PresentationType";
import styles from "./Slide.module.css";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import { CSSProperties, DragEvent } from "react";
import { setSelection } from "../../store/redux/selectionActionCreators";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { moveObject } from "../../store/redux/slideActionCreators";

const SLIDE_WIDTH = 1135;
const SLIDE_HEIGHT = 645;

type SlideProps = {
  slide: SlideType;
  scale?: number;
  className?: string;
};

function Slide({ slide, scale = 1, className }: SlideProps) {
  const dispatch = useDispatch();
  const selection = useAppSelector((editor) => editor.selection);
  const [isDragOver, setIsDragOver] = useState(false);

  const slideStyles: CSSProperties = {
    position: "relative",
    backgroundColor:
      slide.background.type === "solid" ? slide.background.color : undefined,
    backgroundImage:
      slide.background.type === "image"
        ? `url(${slide.background.src})`
        : undefined,
    backgroundSize: slide.background.type === "image" ? "cover" : undefined,
    width: `${SLIDE_WIDTH * scale}px`,
    height: `${SLIDE_HEIGHT * scale}px`,
  };

  if (selection?.selectedSlideId === slide.id) {
    slideStyles.border = "3px solid #0b57d0";
  }
  const handleSlideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(
        setSelection({
          selectedSlideId: slide.id,
          selectedContentId: undefined,
        })
      );
    }
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));

      const { offsetX, offsetY, objectId } = data;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - offsetX) / scale;
      const y = (e.clientY - rect.top - offsetY) / scale;
      dispatch(moveObject(slide.id, objectId, x, y));
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  return (
    <section
      style={slideStyles}
      className={styles.slide + " " + className}
      onClick={handleSlideClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {slide.contents.map((content) => {
        switch (content.type) {
          case "text":
            return (
              <div key={content.contentId}>
                <TextObject
                  key={content.contentId}
                  textObject={content}
                  scale={scale}
                  selection={selection}
                  slideId={slide.id}
                ></TextObject>
              </div>
            );
          case "image":
            return (
              <div key={content.contentId}>
                <ImageObject
                  key={content.contentId}
                  imageObject={content}
                  scale={scale}
                  selection={selection}
                  slideId={slide.id}
                ></ImageObject>
              </div>
            );
          default:
            throw new Error(`Unknown slide type: ${content}`);
        }
      })}
    </section>
  );
}

export { Slide };
