import { useState, useEffect, useRef } from "react";
import { useViewportSize } from "@mantine/hooks";
import { Box, Button, Flex } from "@mantine/core";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {};

export default function VideoScreenMobile({}: Props): JSX.Element {
  const { height } = useViewportSize();
  const openRef = useRef<{ state: "open" | "closed" | "closed-off-screen" }>({
    state: "open",
  });

  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const halfHeight = height / 2;

  useEffect(() => {
    if (height > 0) {
      if (openRef.current.state === "closed") {
        console.log("Firing Correction")
        api.start({ y: height - 100, immediate: true });
      }
    }
  }, [height]);

  const bind = useDrag(
    ({ down, offset: [, oy], velocity: [, vy], direction: [, dy] }) => {
      if (down) {
        api.start({ y: oy, immediate: true });
      } else {
        if ((oy < halfHeight && vy <= 0.3) || (vy > 0.7 && dy < 0)) {
          console.log("FIRE", y.get());
          api.start({
            y: 0,
            immediate: false,
            onResolve: () => {
              if (y.get() > 0) {
                console.log("Caught");
              } else {
                console.log("Done");
                openRef.current.state = "open";
              }
            },
          });
        } else {
          api.start({
            y: height - 100,
            immediate: false,
            onResolve: () => {
              if (height - 100 > y.get()) {
                console.log("Caught");
              } else {
                console.log("Done");
                openRef.current.state = "closed";
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
        background: "green",
        zIndex: 2400,
      }}
    >
      <Flex>Hey There</Flex>
    </animated.div>
  );
}
