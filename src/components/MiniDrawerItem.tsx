import { Box, Button, Flex, Text, UnstyledButton } from "@mantine/core";
import { useMatch } from "react-router-dom";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;
type RouteType = "/" | "/search-results";

type Props = {
  url: RouteType;
  text: string;
  icon: JSX.Element;
};

export default function MiniDrawerItem({
  text,
  icon,
  url,
}: Props): JSX.Element {
  let match = useMatch(url);
  return (
    <Box
      sx={{
        borderRadius: "10px",
      }}
    >
      <UnstyledButton
        component="a"
        href={url}
        w="100%"
        h="100%"
        display="block"
        p={0}
        sx={{
          backgroundColor: "rgba(255,255,255,0)",
          borderRadius: "10px",
          transition: "background 0.3s ease",
          color: "#FFFFFF",

          "&:hover": {
            backgroundColor: "rgba(255,255,255,.1)",
          },
          "&:active": {
            backgroundColor: "rgba(255,255,255,.2)",
            transition: "background 0s ease",
          },
        }}
      >
        <Flex
          w="100%"
          h="100%"
          px='0px'
          pt='16px'
          pb='14px'
          direction='column'
          justify='center'
          align="center"
          bg="transparent"
        >
          <Flex
            sx={{
              "& > svg": {
                fill: match ? "#FFFFFF" : "transparent",
              },
            }}
          >
            {icon}
          </Flex>

          <Text
            fz={10}
            fw={400}
            mt={6}
            color="#FFFFFF"
          >
            {text}
          </Text>
        </Flex>
      </UnstyledButton>
    </Box>
  );
}
