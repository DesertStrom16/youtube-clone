import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { createUseGesture, dragAction, useDrag } from "@use-gesture/react";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {};

export default function VideoScreenMobile({}: Props): JSX.Element {
  useEffect(() => {
    const handler = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", handler);
    document.addEventListener("gesturechange", handler);
    document.addEventListener("gestureend", handler);
    return () => {
      document.removeEventListener("gesturestart", handler);
      document.removeEventListener("gesturechange", handler);
      document.removeEventListener("gestureend", handler);
    };
  }, []);

  const useGesture = createUseGesture([dragAction]);

  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));
  const ref = useRef<HTMLDivElement>(null);

  useGesture(
    {
      onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel();
        api.start({ x, y, immediate: true });
      },
    },
    {
      target: ref,
      drag: { from: () => [style.x.get(), style.y.get()] },
    }
  );

  return (
    <animated.div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: "red",
        touchAction: "none",
        position: "absolute",
        top: 0,
        zIndex: 2400,
        ...style,
      }}
    ></animated.div>
  );
}
