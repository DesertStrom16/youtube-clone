import { Box, Button, Flex } from "@mantine/core";
import { useParams } from "react-router-dom";

type Props = {};

export default function VideoScreen({}: Props): JSX.Element {
  const { id } = useParams();

  return <Flex>{id}</Flex>;
}
