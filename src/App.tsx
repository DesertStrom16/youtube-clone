import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import NotFound from "./components/NotFound";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import AppBar from "./components/AppBar";
import VideoScreen from "./components/VideoScreen";
import Video from "./models/video";
import { useAppDispatch } from "./app/hooks";

// FINAL CHECKS:
// - Changed nav links from "a" to "Link", need to double check styles.

function App() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const socketRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const matches = useMediaQuery("(min-width: 1300px)");

  useEffect(() => {
    if (matches) {
      setIsDrawer(false);
      setIsSmall(false);
    }
  }, [matches]);

  return (
    <BrowserRouter>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          breakpoints: {
            xs: 576,
            sm: 792,
            md: 992,
            lg: 1300,
            xl: 1400,
          },
        }}
      >
        <AppBar
          isOpen={isOpen}
          isDrawer={isDrawer}
          isSmall={isSmall}
          matches={matches}
          setIsOpen={setIsOpen}
          setIsDrawer={setIsDrawer}
          setIsSmall={setIsSmall}
          socketRef={socketRef}
        >
          <Routes>
            <Route
              path="/search/:id"
              element={<SearchResults socketRef={socketRef} />}
            />
            <Route path="/watch/:id" element={<VideoScreen />} />
            <Route path="/" element={<Home isOpen={isOpen} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppBar>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
