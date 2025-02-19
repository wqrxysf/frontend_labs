import { jsPDF } from "jspdf";
import { EditorType } from "./EditorType";
import { SlideType } from "./PresentationType";

function exportEditorToPDF(editor: EditorType): EditorType {
  const WIDTH_PIXELS = 1135;
  const HEIGHT_PIXELS = 645;

  const pdf = new jsPDF("l", "px", [WIDTH_PIXELS, HEIGHT_PIXELS]);


  editor.presentation.slideCollection.slides.forEach(
    (slide: SlideType, index: number) => {

      if (slide.background.type === "solid") {
        pdf.setFillColor(slide.background.color);
        pdf.rect(
          0,
          0,
          WIDTH_PIXELS,
          HEIGHT_PIXELS,
          "F"
        );
      } else if (slide.background.type === "image") {
        pdf.addImage(
          slide.background.src,
          "JPEG",
          0,
          0,
          WIDTH_PIXELS,
          HEIGHT_PIXELS
        );
      }

      slide.contents.forEach((content) => {
        if (content.type === "text") {
          pdf.setFont(content.fontFamily, "normal");
          pdf.setFontSize(content.fontSize * 1.3);
          pdf.text(
            content.field,
            content.x,
            content.y
          );
          console.log("x:", content.x, " y:", content.y);
        } else if (content.type === "image") {
          pdf.addImage(
            content.src,
            "JPEG",
            content.x,
            content.y,
            content.width,
            content.height
          );
          console.log(
            "x:",
            content.x,
            " y:",
            content.y,
            " h:",
            content.height,
            " w:",
            content.width
          );
        }
      });

      if (index < editor.presentation.slideCollection.slides.length - 1) {
        pdf.addPage();
      }
    }
  );

  const fileName = prompt(
    "Введите название экспортируемого файла PDF:",
    "presentation"
  );
  if (fileName === null) {
    return editor;
  }

  pdf.save(`${fileName}.pdf`);
  pdf.output("dataurlnewwindow");

  return editor;
}

export { exportEditorToPDF };
