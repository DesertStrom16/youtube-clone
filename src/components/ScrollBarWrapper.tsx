import { ScrollArea } from "@mantine/core";

type Props = React.PropsWithChildren & {};

export default function ScrollBarWrapper({ children }: Props): JSX.Element {
  return (
    <ScrollArea.Autosize
      maxHeight="100vh"
      sx={{ flex: 1 }}
      style={{ height: "100%", width: "100%" }}
      scrollbarSize={16}
      bg="#0f0f0f"
      scrollHideDelay={0}
      type="always"
      styles={() => ({
        scrollbar: {
          "&, &:hover": {
            background: "transparent",
          },
          "&:hover > .mantine-ScrollArea-thumb": {
            background: "#717171",
          },
          padding: 0,
        },
        thumb: {
          background: "hsl(0,0%,67%)",
          border: "4px solid #0f0f0f",

          "&:hover": {
            background: "#717171",
          },
        },
        corner: {
          background: "transparent",
          height: "0px",
        },
      })}
    >
      {children}
    </ScrollArea.Autosize>
  );
}
