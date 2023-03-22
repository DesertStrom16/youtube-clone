import { Box, Button, Flex, Text, UnstyledButton } from "@mantine/core";
import IconWrapper from "../IconWrapper";
import NavButton from "../navbar/NavButton";
import "./GridItem.css";
import { Link } from "react-router-dom";
import { Video } from "../../types/video";
import { mdMin, smMin, xsMin } from "../../utils/breakpoints";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {
  isOpen: boolean;
};

export default function GridItemSkeleton({ isOpen }: Props): JSX.Element {
  const xlMin = isOpen ? 2303 : 2135;
  const lgMin = isOpen ? 1968 : 1800;

  return (
    <Flex
      h="fit-content"
      w="calc(100% - 16px)"
      direction="column"
      maw={320}
      sx={{
        [`@media (min-width: ${xsMin}px)`]: {
          // 2
          width: "calc(50% - 16px)",
        },
        [`@media (min-width: ${smMin}px)`]: {
          // 3
          width: "calc((100% / 3) - 16px)",
        },
        [`@media (min-width: ${mdMin}px)`]: {
          // 4
          width: "calc(25% - 16px)",
        },
        [`@media (min-width: ${isOpen ? "calc(1463px + 168px)" : "1463px"})`]: {
          maxWidth: 360,
        },
        [`@media (min-width: ${lgMin}px)`]: {
          // 5
          width: "calc(20% - 16px)",
        },
        [`@media (min-width: ${xlMin}px)`]: {
          // 6
          width: "calc((100% / 6) - 16px)",
        },
      }}
      mb={40}
      mx={8}
    >
      <Box
        sx={{ borderRadius: 12 }}
        bg="rgba(255, 255, 255, 0.2)"
        w="100%"
        pt="56.25%"
      ></Box>
      <Flex
        direction="row"
        sx={{
          margin: "0px 12px",
          "@media (min-width: 392px)": {
            margin: 0,
          },
        }}
      >
        <Box
          mt={12}
          mr={12}
          mih={36}
          miw={36}
          bg="rgba(255, 255, 255, 0.2)"
          sx={{ borderRadius: "50%" }}
        ></Box>
        <Flex direction="column" w='100%'>
          <Box
            bg="rgba(255, 255, 255, 0.2)"
            w="90%"
            mt={12}
            pb={4}
            h={12}
            sx={{ borderRadius: 2 }}
          ></Box>
          <Box
            bg="rgba(255, 255, 255, 0.2)"
            w="60%"
            mt={12}
            pb={4}
            h={12}
            sx={{ borderRadius: 2 }}
          ></Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
