import "./App.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{
        breakpoints: {
          xs: 576,
          sm: 792,
          md: 992,
          lg: 1300,
          xl: 1400,
        },
      }}>
        <BrowserRouter>
          <Routes>
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  );
}

export default App;
