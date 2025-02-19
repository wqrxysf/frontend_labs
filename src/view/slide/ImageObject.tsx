import { SlideImage } from "../../store/PresentationType";
import { SelectionType } from "../../store/EditorType";
import { CSSProperties, DragEvent, useState } from "react";
import styles from "./ImageObject.module.css";
import { setSelection } from "../../store/redux/selectionActionCreators";
import { useDispatch } from "react-redux";

type ImageObjectProps = {
  imageObject: SlideImage;
  scale?: number;
  selection?: SelectionType;
  slideId: string;
};

function ImageObject({
  imageObject,
  scale = 0.1,
  selection,
}: ImageObjectProps) {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);

  const imageObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${imageObject.y * scale}px`,
    left: `${imageObject.x * scale}px`,
    width: `${imageObject.width * scale}px`,
    height: `${imageObject.height * scale}px`,
  };
  const isSelected = selection?.selectedContentId === imageObject.contentId;
  if (isSelected) {
    imageObjectStyles.border = "3px solid #0b57d0";
  }

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        offsetX,
        offsetY,
        objectId: imageObject.contentId,
      })
    );
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(1);
    if (selection?.selectedSlideId) {
      dispatch(
        setSelection({
          selectedSlideId: selection.selectedSlideId,
          selectedContentId: imageObject.contentId,
        })
      );
    }
  };

  return (
    <div
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={imageObjectStyles}
    >
      <img
        className={styles.imageField}
        src={imageObject.src}
        alt="image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "fill",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export { ImageObject };
