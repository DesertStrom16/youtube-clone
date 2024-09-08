import { useRef } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import useIsMobileDevice from "../../hooks/use-is-mobile-device";

export default function VideoPlayer(): JSX.Element {
  const { id } = useParams();
  const playerRef = useRef<any>(null);
  const isMobileDevice = useIsMobileDevice();

  return (
    <ReactPlayer
      width="100%"
      height="100%"
      ref={playerRef}
      controls={true}
      playing={true}
      muted={isMobileDevice}
      config={{
        youtube: {
          playerVars: { autoplay: 1,  },
            // When autoplay fails, turning mute on then retrying sometimes works.
          onUnstarted: () => {
            playerRef?.current?.player.player.player.mute();
            playerRef?.current?.player.player.player.playVideo();
          },
        },
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      url={`https://www.youtube.com/watch?v=${id}`}
    />
  );
}
