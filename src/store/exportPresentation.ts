import { EditorType } from "./EditorType";

function exportPresentation(editor: EditorType): EditorType {
  const jsonString = JSON.stringify(editor, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const fileName = prompt(
    "Введите название экспортируемого файла (без расширения):",
    "editor"
  );
  if (fileName === null) {
    return editor;
  }

  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return editor;
}

export { exportPresentation };
