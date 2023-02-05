import { Flex } from "@mantine/core";
import { PathMatch } from "react-router-dom";

type Props = React.PropsWithChildren & {
  match: PathMatch<string> | null;
};

export default function IconWrapper({ children, match }: Props): JSX.Element {
  return (
    <Flex
      sx={{
        "& > svg": {
          fill: match ? "#FFFFFF" : "transparent",
        },
      }}
    >
      {children}
    </Flex>
  );
}
