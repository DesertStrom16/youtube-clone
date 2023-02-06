import { Box, Button, Flex, Text } from "@mantine/core";
import IconWrapper from "./IconWrapper";
import NavButton from "./NavButton";
import "./GridRow.css";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {};

// Unsure on :active styling, may revert back to mantine
export default function GridRow({}: Props): JSX.Element {
  return (
    <Flex bg="red" w="100%" px={16} h="fit-content">
      <Flex mb={40} mx={1} w="100%">
        <div className="image-wrapper">
          <Flex
            w="100%"
            h="100%"
            pos="absolute"
            top={0}
            bottom={0}
            left={0}
            bg="orange"
          ></Flex>
        </div>
      </Flex>
    </Flex>
  );
}
