import { useState, useEffect } from "react";
import { Position } from "../store/PresentationType";
import { dispatch } from "../store/editor";
import { changeContentPosition } from "../store/changeContentPosition";

function useDragAndDrop(
  ref: React.RefObject<HTMLDivElement>,
  initialPosition: Position
) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [shiftX, setShiftX] = useState(0);
  const [shiftY, setShiftY] = useState(0);

  const handleMouseEnter = () => {
    if (ref.current) {
      ref.current.style.cursor = "grab";
    }
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.cursor = "";
    }
  };

  function onChangeContentPosition() {
    console.log("change");
    dispatch(changeContentPosition, {});
  }

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);
    const imageElement = ref.current;
    if (imageElement) {
      setShiftX(event.clientX - imageElement.getBoundingClientRect().left / 2);
      setShiftY(event.clientY - imageElement.getBoundingClientRect().top / 2);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && ref.current) {
      const newX = event.clientX - shiftX;
      const newY = event.clientY - shiftY;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const imageElement = ref.current;
    imageElement?.addEventListener("mousedown", handleMouseDown);
    imageElement?.addEventListener("mouseenter", handleMouseEnter);
    imageElement?.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      imageElement?.removeEventListener("mousedown", handleMouseDown);
      imageElement?.removeEventListener("mouseenter", handleMouseEnter);
      imageElement?.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, ref, shiftX, shiftY]);

  return position;
}

export default useDragAndDrop;

// import { useState, useEffect } from 'react';

// const useDragAndDrop = (initialX: number, initialY: number) => {
//     const [position, setPosition] = useState({ x: initialX, y: initialY });
//     const [isDragging, setIsDragging] = useState(false);

//     const handleMouseDown = (event: MouseEvent) => {
//         setIsDragging(true);
//     };

//     const handleMouseMove = (event: MouseEvent) => {
//         if (isDragging) {
//             setPosition({
//                 x: position.x + event.movementX,
//                 y: position.y + event.movementY,
//             });
//         }
//     };

//     const handleMouseUp = () => {
//         setIsDragging(false);
//     };

//     useEffect(() => {
//         window.addEventListener('mousemove', handleMouseMove);
//         window.addEventListener('mouseup', handleMouseUp);
//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove);
//             window.removeEventListener('mouseup', handleMouseUp);
//         };
//     }, [isDragging, position]);

//     const onMouseDown = (event: React.MouseEvent) => {
//         event.preventDefault(); // Предотвращаем выделение текста
//         handleMouseDown(event.nativeEvent);
//     };

//     return { position, onMouseDown };
// };

// export default useDragAndDrop;
