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
  const { height, width } = useViewportSize();
  const dispatch = useAppDispatch();
  const openPosition = useAppSelector((state) => state.data.openPosition);
  const activeVideoId = useAppSelector((state) => state.data.activeVideoId);
  const isRedirect = useAppSelector((state) => state.data.isRedirect);
  const openRef = useRef<{ state: "open" | "closed" }>({
    state: "open",
  });
  const videoBlockerRef = useRef<any>();

  const [{ y }, api] = useSpring(() => ({
    to: { y: isRedirect ? window.innerHeight - 100 : 0 },
    from: {
      y: isRedirect
        ? window.innerHeight
        : openPosition || window.innerHeight - 100,
    },
    // Need it here I think
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
        onResolve: () => {
          if (videoBlockerRef.current) {
            videoBlockerRef.current.style.display = 'none'
          }
          
        }
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
                if (videoBlockerRef.current) {
                  videoBlockerRef.current.style.display = 'none'
                }
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
                  if (videoBlockerRef.current) {
                    videoBlockerRef.current.style.display = 'flex'
                  }
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

  // Bottom height - tab height = min video height
  const minimizedVideoHeight = (100 - 48.67) / (width * 0.5625);

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
      <animated.div
        {...bind()}
        style={{
          scaleY: y.to([0, height - 100], [1, minimizedVideoHeight]),
          transformOrigin: "top",
          touchAction: "none",
          width: "100%",
          height: 0,
          background: "green",
          zIndex: 2400,
        }}
      ></animated.div>
      <VideoScreenInner
        id={id}
        videoBlockerRef={videoBlockerRef}
        videoWrapperProps={{
          "@media (max-width: 1014px)": {
            padding: 0,
            margin: 0,
          },
        }}
      />
    </animated.div>
  );
}