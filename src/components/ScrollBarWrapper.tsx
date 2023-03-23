import { ScrollArea } from "@mantine/core";

type Props = React.PropsWithChildren & {};

export default function ScrollBarWrapper({ children }: Props): JSX.Element {
  return (
    <ScrollArea.Autosize
      maxHeight="100vh"
      sx={{ flex: 1 }}
      style={{ height: "100%", width: "100%" }}
      // scrollbarSize={16}
      bg="#0f0f0f"
      scrollHideDelay={0}
      type="always"
      styles={() => ({
        scrollbar: {
          width: "16px!important",
          padding: 0,

          "&, &:hover": {
            background: "transparent",
          },
          "&:hover > .mantine-ScrollArea-thumb": {
            background: "#717171",
          },
          "@media (pointer:coarse)": {
            width: "5px!important",
          },
        },
        thumb: {
          background: "hsl(0,0%,67%)",
          border: "4px solid #0f0f0f",

          "&:hover": {
            background: "#717171",
          },

          "@media (pointer:coarse)": {
            border: 0,
            width: 3,
            maxWidth: 3,
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
