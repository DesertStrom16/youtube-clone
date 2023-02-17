import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
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
import { setSearchPaginateData } from "./store/data/dataSlice";
import Video from "./models/video";
import { useAppDispatch } from "./app/hooks";

// onResponseReceivedCommands[0].appendContinuationItemsAction.continuationItems[1].continuationItemRenderer.continuationEndpoint.continuationCommand
// Continuation data, includes token. Could be used for paginate request.
// Instead of web scrape.

function App() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const socket = io(`${serverUrl}`, { autoConnect: false });
  const socketRef = useRef(socket);

  const matches = useMediaQuery("(min-width: 1300px)");


  useEffect(() => {
    socket.open();

    socket.once("connect", () => {
      console.log("Connected to Server");
      //   socket.emit('active', userRedux.uid);
    });

    socket.on("paginateSearchReponse", (data: Video[]) => {
      console.log(data);
      console.log("HEYHEY");
      dispatch(setSearchPaginateData(data));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (matches) {
      setIsDrawer(false);
      setIsSmall(false);
    }
  }, [matches]);

  return (
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
  );
}

export default App;
