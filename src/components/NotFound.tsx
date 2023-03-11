import { Flex, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVideos, setLoading } from "../store/data/dataSlice";

type Props = {};

export default function NotFound(props: Props): JSX.Element {
  return (
    <Flex w="100%" h={100} justify="center" align="center">
      <Text color="white" fw={400} sx={{ fontSize: 16 }}>
        404 Not Found!
      </Text>
    </Flex>
  );
}
