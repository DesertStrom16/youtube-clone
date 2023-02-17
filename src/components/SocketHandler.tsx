import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import Video from "../models/video";
import { setSearchPaginateData } from "../store/data/dataSlice";

type Props = React.PropsWithChildren & {
  socket: any;
};

export default function SocketHandler({
  children,
  socket,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("HELLO???");

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

  return <>{children}</>;
}
