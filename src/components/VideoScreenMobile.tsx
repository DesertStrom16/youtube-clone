import { useState, useEffect, useRef } from "react";
import { useViewportSize } from "@mantine/hooks";
import { Box, Button, Flex } from "@mantine/core";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setActiveVideo } from "../store/dataSlice";
import VideoScreenInner from "./VideoScreenInner";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = { id: string };

export default function VideoScreenMobile({ id }: Props): JSX.Element {
  const { height } = useViewportSize();
  const dispatch = useAppDispatch();
  const openPosition = useAppSelector((state) => state.data.openPosition);
  const activeVideoId = useAppSelector((state) => state.data.activeVideoId);
  const isRedirect = useAppSelector((state) => state.data.isRedirect);
  const openRef = useRef<{ state: "open" | "closed" }>({
    state: "open",
  });

  const [{ y }, api] = useSpring(() => ({
    to: { y: isRedirect ? window.innerHeight - 100 : 0 },
    from: {
      y: isRedirect
        ? window.innerHeight
        : openPosition || window.innerHeight - 100,
    },
    onResolve: () => (isRedirect ? (openRef.current.state = "closed") : null),
    // delay: 10000
  }));

  const halfHeight = height / 2;

  useEffect(() => {
    if (openRef.current.state === "closed" && activeVideoId) {
      let openPos =
        openPosition && openPosition > window.innerHeight - 100
          ? window.innerHeight - 100
          : openPosition;

      // Open player popup on video selection.
      api.start({
        to: { y: 0 },
        from: { y: openPos || window.innerHeight - 100 },
        immediate: false,
        config: { duration: 200 },
      });
    }
  }, [openPosition, activeVideoId]);

  useEffect(() => {
    if (height > 0) {
      // Window Resize Correction Handler
      if (openRef.current.state === "closed") {
        api.start({
          y: height - 100,
          immediate: true,
          config: { duration: 200 },
        });
      }
    }
  }, [height]);

  const bind = useDrag(
    ({ down, offset: [, oy], velocity: [, vy], direction: [, dy], tap }) => {
      if (down) {
        api.start({ y: oy, immediate: true, config: { duration: 200 } });
      } else {
        if ((oy < halfHeight && vy <= 0.5) || (vy > 0.5 && dy < 0)) {
          api.start({
            y: 0,
            immediate: false,
            config: { duration: 200 },
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
          if (tap) {
            api.start({ y: 0, config: { duration: 200 }, immediate: false });
          } else {
            api.start({
              y: height - 100,
              config: { duration: 200 },
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
      }
    },
    { from: () => [0, y.get()], bounds: { top: 0, bottom: height - 100 } }
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
      <VideoScreenInner id={id} videoWrapperProps={{padding: 0, margin: 0}} />
    </animated.div>
  );
}
