import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import SearchResults from "./components/search/SearchResults";
import NotFound from "./components/NotFound";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import AppBar from "./components/AppBar";
import VideoScreen from "./components/VideoScreen";
import { useAppDispatch } from "./app/hooks";

// FINAL CHECKS:
// - Need to double check styles on nav links (Changed from "a" to "Link").

function App() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
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
          fontFamily: '"Roboto","Arial",sans-serif',
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
        >
          <Routes>
            <Route path="/search/:id" element={<SearchResults />} />
            <Route path="/search/" element={<NotFound />} />
            <Route path="/watch/:id" element={<VideoScreen />} />
            <Route path="/watch/" element={<NotFound />} />
            <Route path="/" element={<Home isOpen={isOpen} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppBar>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
