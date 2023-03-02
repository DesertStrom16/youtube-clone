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

  const minWidth1300 = useMediaQuery("(min-width: 1300px)");

  useEffect(() => {
    if (minWidth1300) {
      setIsDrawer(false);
      setIsSmall(false);
    }
  }, [minWidth1300]);

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
          minWidth1300={minWidth1300}
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
