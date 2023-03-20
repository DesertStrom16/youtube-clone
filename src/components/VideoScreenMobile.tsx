import { useState, useEffect, useRef } from "react";
import { useViewportSize } from "@mantine/hooks";
import { Box, Button, Flex } from "@mantine/core";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import VideoScreenInner from "./VideoScreenInner";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {fromInitValue: number};

export default function VideoScreenMobile({fromInitValue}: Props): JSX.Element {
  const { height } = useViewportSize();
  const openRef = useRef<{ state: "open" | "closed" }>({
    state: "open",
  });

  const [{ y }, api] = useSpring(() => ({ to: {y: 0}, from: {y: fromInitValue} }));

  const halfHeight = height / 2;

  useEffect(() => {
    if (height > 0) {
      if (openRef.current.state === "closed") {
        console.log("Firing Correction");
        api.start({ y: height - 100, immediate: true });
      }
    }
  }, [height]);

  const bind = useDrag(
    ({ down, offset: [, oy], velocity: [, vy], direction: [, dy] }) => {
      if (down) {
        api.start({ y: oy, immediate: true });
      } else {
        if ((oy < halfHeight && vy <= 0.5) || (vy > 0.5 && dy < 0)) {
          api.start({
            y: 0,
            immediate: false,
            onResolve: () => {
              if (y.get() <= 0) {
                console.log("Done");
                openRef.current.state = "open";
              } else {
                console.log("Caught");
              }
            },
          });
        } else {
          api.start({
            y: height - 100,
            immediate: false,
            onResolve: () => {
              if (height - 100 <= y.get()) {
                console.log("Done");
                openRef.current.state = "closed";
              } else {
                console.log("Caught");
              }
            },
          });
        }
      }
    },
    { from: () => [0, y.get()] }
  );

  return (
    <animated.div
      {...bind()}
      style={{
        y,
        touchAction: "none",
        top: 0,
        left: 0,
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "powderblue",
        // background: "#0f0f0f",
        zIndex: 2400,
      }}
    >
      <VideoScreenInner id={'ZtJcfMnhZ0Y'} />
    </animated.div>
  );
}
