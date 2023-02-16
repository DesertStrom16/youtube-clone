import "./App.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import NotFound from "./components/NotFound";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import AppBar from "./components/AppBar";
import VideoScreen from "./components/VideoScreen";
import SocketHandler from "./components/SocketHandler";
import { io } from "socket.io-client";
import { serverUrl } from "./utils/env";

// onResponseReceivedCommands[0].appendContinuationItemsAction.continuationItems[1].continuationItemRenderer.continuationEndpoint.continuationCommand
// Continuation data, includes token. Could be used for paginate request.
// Instead of web scrape.

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const socket = io(`${serverUrl}`, { autoConnect: false });
  const socketRef = useRef(socket);

  const matches = useMediaQuery("(min-width: 1300px)");

  useEffect(() => {
    if (matches) {
      setIsDrawer(false);
      setIsSmall(false);
    }
  }, [matches]);

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
          {/* If you don't end up needing redux for socket ".on" events... */}
          {/* Then move useEffect back up and remove this component */}
          <SocketHandler socket={socket}>
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
                <Route path="/search/:id" element={<SearchResults socketRef={socketRef} />} />
                <Route path="/watch/:id" element={<VideoScreen />} />
                <Route path="/" element={<Home isOpen={isOpen} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppBar>
          </SocketHandler>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  );
}

export default App;
