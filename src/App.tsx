import styles from "./App.module.css";
import { Workspace } from "./view/workspace/Workspace";
import { TopPanel } from "./view/topPanel/TopPanel";
import { SlideList } from "./view/slideList/SlideList";
import { HistoryContext } from "./hooks/HistoryContext";
import { HistoryType } from "./utils/history";
import { BrowserRouter, Route, Routes } from "react-router";
import Player from "./view/player/Player";

type AppProps = {
  history: HistoryType;
};

function App({ history }: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HistoryContext.Provider value={history}>
              <>
                <TopPanel></TopPanel>
                <main className={styles.container}>
                  <SlideList></SlideList>
                  <Workspace></Workspace>
                </main>
              </>
            </HistoryContext.Provider>
          }
        />
        <Route path="player" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
