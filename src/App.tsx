import "./App.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import AppBar from "./components/AppBar";
import VideoScreen from "./components/VideoScreen";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  const matches = useMediaQuery("(min-width: 1300px)");

  useEffect(() => {
    if (matches) {
      setIsDrawer(false);
      setIsSmall(false);
    }
  }, [matches]);

  const menuClickHandler = () => {
    if (!matches) {
      setIsDrawer(!isDrawer);
      setIsSmall(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Provider store={store}>
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
        <BrowserRouter>
          <AppBar
            menuClickHandler={menuClickHandler}
            isOpen={isOpen}
            isDrawer={isDrawer}
            isSmall={isSmall}
          >
            <Routes>
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/watch/:id" element={<VideoScreen />} />
              <Route path="/" element={<Home isOpen={isOpen} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppBar>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  );
}

export default App;
