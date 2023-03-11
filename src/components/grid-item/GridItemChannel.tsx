import { Text } from "@mantine/core";

type Props = { channel: string; isOpen: boolean };

export default function GridItemChannel({
  channel,
  isOpen,
}: Props): JSX.Element {
  return (
    <Text
      component="a"
      href=""
      fw={400}
      lineClamp={1}
      lh="20px"
      sx={{
        wordBreak: "break-word",
        fontSize: 14,
        // fontSize: 12,

        // [`@media (min-width: ${isOpen ? "calc(1463px + 168px)" : "1463px"})`]: {
        //   fontSize: 14,
        // },
      }}
      color="#aaa"
      // color="#606060"
    >
      {channel}
    </Text>
  );
}
