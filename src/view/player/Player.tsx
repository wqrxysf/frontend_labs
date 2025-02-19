import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { _editor } from "../../store/editor";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./Player.module.css";
import { Button } from "../../components/button/Button";

const Player = () => {
  const navigate = useNavigate();

  const editor = useAppSelector((editor) => editor);
  const slides = editor.presentation.slideCollection.slides;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [scale, setScale] = useState({ width: 1, height: 1 });
  const playerRef = useRef<HTMLDivElement | null>(null);

  const updateScale = () => {
    if (playerRef.current) {
      const rect = playerRef.current.getBoundingClientRect();
      const defaultWidth = 1135;
      const defaultHeight = 645;
      const newWidth = rect.width;
      const newHeight = rect.height;

      const widthScale = newWidth / defaultWidth;
      const heightScale = newHeight / defaultHeight;

      setScale({ width: widthScale, height: heightScale });
    }
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      updateScale();
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      updateScale();
    }
  };

  const renderContent = (content: any) => {
    switch (content.type) {
      case "text":
        return (
          <div
            key={content.id}
            style={{
              position: "absolute",
              left: content.x * scale.width,
              top: content.y * scale.height,
              fontSize: content.fontSize * scale.height,
              fontFamily: content.fontFamily,
              width: content.width * scale.width,
              height: content.height * scale.height,
            }}
          >
            {content.field}
          </div>
        );
      case "image":
        return (
          <img
            key={content.id}
            src={content.src}
            alt=""
            style={{
              position: "absolute",
              left: content.x * scale.width,
              top: content.y * scale.height,
              width: content.width * scale.width,
              height: content.height * scale.height,
            }}
          />
        );
      default:
        return null;
    }
  };

  const backgroundStyle = slides[currentSlideIndex].background;
  const backgroundStyleObject = {
    backgroundColor:
      backgroundStyle.type === "solid" ? backgroundStyle.color : "white",
    backgroundImage:
      backgroundStyle.type === "image" && backgroundStyle.src
        ? `url(${backgroundStyle.src})`
        : "none",
    backgroundSize: "cover",
  };

  const toggleFullScreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current
          .requestFullscreen()
          .then(updateScale)
          .catch((err) => console.log(err));
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (document.fullscreenElement) {
      if (event.key === "ArrowRight") {
        nextSlide();
      } else if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "Escape") {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlideIndex]);

  useEffect(() => {
    const handleResize = () => {
      updateScale();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.player_container}>
      <div
        ref={playerRef}
        className={styles.background}
        style={backgroundStyleObject}
      >
        <div className={styles.slide_container}>
          {slides[currentSlideIndex].contents.map(renderContent)}
        </div>
      </div>
      <ul className={styles.buttons}>
        <li><Button
          text={"Полноэкранный режим"}
          onClick={toggleFullScreen}
        ></Button></li>
        <li><Button
          text={"Назад"}
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
        ></Button></li>
        <li><Button
          text={"Вперед"}
          onClick={nextSlide}
          disabled={currentSlideIndex === slides.length - 1}
        ></Button></li>
        <li><Button
          text={"Вернуться к редактору"}
          onClick={() => navigate("/")}
        ></Button></li>
        
      </ul>
    </div>
  );
};

export default Player;
