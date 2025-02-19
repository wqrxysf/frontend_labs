import { Button } from "../../components/button/Button";
import styles from "./TopPanel.module.css";
import { _editor } from "../../store/editor";
import { exportEditor, exportToPDF, importEditor} from "../../store/redux/editorActionCreators";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppActions } from "../../hooks/useAppActions";
import * as React from "react"
import { useDispatch } from "react-redux";
import { addImageToSlideFromUnsplash, renamePresentationTitle } from "../../store/redux/slideActionCreators";
import { useNavigate } from "react-router";


function TopPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = useAppSelector(editor => editor.presentation.title)
  const {addSlide, removeSlide, addTextToSlide, addImageToSlide, changeSlideBackground, removeContentFromSlide, undo, redo} = useAppActions()
  const selection = useAppSelector(state => state.selection)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const importFileRef = React.useRef<HTMLInputElement>(null)
  const [editedTitle, setEditedTitle] = React.useState(title);
  
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === 'string') {
            dispatch(importEditor(content));
        }
    };
    reader.readAsText(file);

    if (importFileRef.current) {
        importFileRef.current.value = '';
    }
  };

  const handleExport = () => {
    dispatch(exportEditor());
};

  const handleExportToPDF = () => {
    dispatch(exportToPDF())
  }

  const handleRemoveObject = () => {
    if (selection?.selectedSlideId && selection?.selectedContentId) {
        removeContentFromSlide(selection.selectedSlideId, selection.selectedContentId)
    }
}
  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && selection?.selectedSlideId) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string
            if (selection.selectedSlideId){
              addImageToSlide(selection.selectedSlideId, imageUrl)
            }
            event.target.value = "";
            
        }
        reader.readAsDataURL(file)
    }

    if (fileInputRef.current) {
        fileInputRef.current.value = ''
    }
}

const handleAddImageUnsplash = async () => {
  const query = 'nature';
  dispatch(addImageToSlideFromUnsplash());
}

  const handleAddText = () => {
    if (selection?.selectedSlideId) {
        addTextToSlide(selection.selectedSlideId,)
    }
}
  const onChangeSlideBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && selection?.selectedSlideId) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string
            if (selection.selectedSlideId){
              changeSlideBackground(selection.selectedSlideId, imageUrl)
            }
            event.target.value = "";
            
        }
        reader.readAsDataURL(file)
    }
    else {
      if (selection.selectedSlideId) {
      changeSlideBackground(selection.selectedSlideId, (event.target as HTMLInputElement).value)
      }
    }

    if (fileInputRef.current) {
        fileInputRef.current.value = ''
    }
}

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setEditedTitle(newTitle);
    dispatch(renamePresentationTitle(newTitle));
  };

  const handleUndo = () => {
    undo()
}

const handleRedo = () => {
  redo()
}

const goToPlayer = () => {
  // Передаем слайды при переходе
  navigate("/player", { state: { _editor } });
};

const handleKeyDown = (event: any) => {
  const isMac = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  if (event.ctrlKey || (isMac && event.metaKey)) {
      if (event.key === 'z') {
          event.preventDefault();
          handleUndo();
      } else if (event.key === 'y') {
          event.preventDefault();
          handleRedo();
      }
  }
};

React.useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);

  return (
    <header className={styles.topPanel}>
      <input
        className={styles.title}
        type="text"
        value={editedTitle}
        onChange={handleTitleChange}
      />
      <ul className={styles.topPanel_buttons}>
      <li className={styles.sectionOfButtons}>
        <ul className={styles.buttons}>
            <li>
              <Button text={"Отменить"} onClick={handleUndo}></Button>
            </li>
            <li>
              <Button text={"Вернуть"} onClick={handleRedo}></Button>
            </li>
          </ul>
      </li>
      <li className={styles.sectionOfButtons}>
          <ul className={styles.buttons}>
            <li className={styles.input_field}>
              <label>
                <input
                  className={styles.file_field}
                  type="file"
                  accept="application/json"
                  onChange={handleImport}
                ></input>
                <span>Импортировать презентацию</span>
              </label>
            </li>
            <li>
              <Button text={"Экспортировать презентацию"} onClick={handleExport}></Button>
            </li>
            <li>
              <Button text={"Экспортировать в PDF"} onClick={handleExportToPDF}></Button>
            </li>
            <li>
              <Button text={"Показ слайдов"} onClick={goToPlayer}></Button>
            </li>
          </ul>
        </li>
        <li className={styles.sectionOfButtons}>
          <ul className={styles.buttons}>
            <li>
              <Button text={"Добавить слайд"} onClick={addSlide}></Button>
            </li>
            <li>
              <Button text={"Удалить слайд"} onClick={removeSlide}></Button>
            </li>
          </ul>
        </li>
        <li className={styles.sectionOfButtons}>
          <ul className={styles.buttons}>
            <li className={styles.input_color}>
              <input
                className={styles.color_field}
                type="color"
                id="head"
                defaultValue="#ffffff"
                onChange={onChangeSlideBackground}
              />
              <label>Заливка</label>
            </li>
            <li className={styles.input_field}>
              <label>
                <input
                  className={styles.file_field}
                  type="file"
                  onChange={onChangeSlideBackground}
                ></input>
                <span>Изображение фона</span>
              </label>
            </li>
          </ul>
        </li>
        <li className={styles.sectionOfButtons}>
          <ul className={styles.buttons}>
            <li>
              <Button
                text={"Добавить текст"}
                onClick={handleAddText}
              ></Button>
            </li>
            <li className={styles.input_field}>
              <label>
                <input
                  id="inputField"
                  className={styles.file_field}
                  type="file"
                  onChange={handleAddImage}
                ></input>
                <span>Вставить изображение</span>
              </label>
            </li>
            <li className={styles.input_field}>
              <label>
                <input
                  id="inputField"
                  className="file_field"
                  type="button"
                  value=""
                  onClick={handleAddImageUnsplash}
                  style={{ display: 'none' }}
                />
                <span onClick={handleAddImageUnsplash}>Вставить изображение Unsplash</span>
              </label>
            </li>
            <li>
              <Button
                text={"Удалить объект"}
                onClick={handleRemoveObject}
              ></Button>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
}

export { TopPanel };
