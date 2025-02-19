import { SlideText } from "../../store/PresentationType";
import { CSSProperties, DragEvent, useState } from "react";
import styles from "./TextObject.module.css";
import { SelectionType } from "../../store/EditorType";
import { useDispatch } from "react-redux";
import { setSelection } from "../../store/redux/selectionActionCreators";
import { changeTextContent } from "../../store/redux/slideActionCreators";

type TextObjectProps = {
  textObject: SlideText;
  scale?: number;
  isSelectedContent?: boolean;
  selection?: SelectionType;
  slideId: string;
};

function TextObject({ textObject, scale = 0.5, selection }: TextObjectProps) {
  const dispatch = useDispatch();
  const [editedText, setEditedText] = useState(textObject.field);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const textObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${textObject.y * scale}px`,
    left: `${textObject.x * scale}px`,
    width: `${textObject.width * scale}px`,
    height: `${textObject.height * scale}px`,
    fontSize: `${textObject.fontSize * scale}px`,
    cursor: isDragging ? "move" : "default",
    opacity: isDragging ? 0.5 : 1,
    transition: "opacity 0.2s ease",
  };
  const isSelected = selection?.selectedContentId === textObject.contentId;
  if (isSelected) {
    textObjectStyles.border = "3px solid #0b57d0";
  }

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    if (isEditing) return;
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        offsetX,
        offsetY,
        contentId: textObject.contentId,
      })
    );
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selection?.selectedSlideId) {
      dispatch(
        setSelection({
          selectedSlideId: selection.selectedSlideId,
          selectedContentId: textObject.contentId,
        })
      );
    }
  };
  const onBlur = () => {
    setIsEditing(false);
    if (selection?.selectedSlideId && editedText !== textObject.field) {
      dispatch(
        changeTextContent(
          selection.selectedSlideId,
          textObject.contentId,
          editedText
        )
      );
    }
  };
  const onDoubleClick = () => {
    setIsEditing(true);
  };
  return (
    <div
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDoubleClick={onDoubleClick}
      style={textObjectStyles}
      className={styles.textField}
    >
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          name="inputField"
          onBlur={onBlur}
          autoFocus
          style={{
            width: "100%",
            height: "100%",
            fontSize: "inherit",
            fontFamily: "inherit",
            color: "inherit",
            resize: "none",
            border: "none",
            background: "transparent",
          }}
        ></textarea>
      ) : (
        <div>{textObject.field}</div>
      )}
    </div>
  );
}

export { TextObject };
