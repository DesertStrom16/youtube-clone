import { useEffect } from "react";

type Props = React.PropsWithChildren & {
    socket: any
};

export default function SocketHandler({ children, socket }: Props): JSX.Element {
  useEffect(() => {
    socket.open();
    socket.once('connect', () => {
        console.log("Connected to Server")
    //   socket.emit('active', userRedux.uid);
    });

    socket.on('paginateSearchReponse', (data: any) => {
      console.log(data)
    })

    return () => {
      socket.disconnect();
    };
  }, []);


  return <>{children}</>;
}
