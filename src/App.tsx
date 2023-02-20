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
import SocketHandler from "./components/SocketHandler";
import { setSearchPaginateData } from "./store/data/dataSlice";
import Video from "./models/video";
import { useAppDispatch } from "./app/hooks";
import { socket } from "./socket";

// onResponseReceivedCommands[0].appendContinuationItemsAction.continuationItems[1].continuationItemRenderer.continuationEndpoint.continuationCommand
// Continuation data, includes token. Could be used for paginate request.
// Instead of web scrape.


function App() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const socketRef = useRef(socket);

  const matches = useMediaQuery("(min-width: 1300px)");

  useEffect(() => {
    socket.open();

    socket.on("connect", connectHandler);

    socket.on("paginateSearchReponse", paginateHandler);

    return () => {
      socket.off("connect", connectHandler);
      socket.off("paginateSearchReponse", paginateHandler);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (matches) {
      setIsDrawer(false);
      setIsSmall(false);
    }
  }, [matches]);

  const connectHandler = () => {
    console.log("Connected to Server");
    //   socket.emit('active', userRedux.uid);
  };

  const paginateHandler = (data: Video[]) => {
    console.log(data);
    console.log("HEYHEY");
    console.log(socket.id)

    dispatch(setSearchPaginateData(data));
  };

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
