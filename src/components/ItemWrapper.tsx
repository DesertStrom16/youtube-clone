import { Flex } from "@mantine/core";

type Props = React.PropsWithChildren & {};

export default function ItemWrapper({ children }: Props): JSX.Element {
  return (
    <Flex
      w="100%"
      direction="column"
      p="12px"
      sx={{ borderBottom: "1px solid rgba(255,255,255,.2)" }}
    >
      {children}
    </Flex>
  );
}
