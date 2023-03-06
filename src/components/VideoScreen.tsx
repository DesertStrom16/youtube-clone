import { Box, Button, Flex } from "@mantine/core";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useGetRecommendedQuery } from "../services/watch";

type Props = {};

export default function VideoScreen({}: Props): JSX.Element {
  const { id } = useParams();

  // @ts-expect-error
  const { data, isLoading, isFetching, isError } = useGetRecommendedQuery(id, {
    skip: !id,
  });

  console.log(data)

  return (
    <Flex ml={24} pt={24} pr={24} w="100%">
      <Flex pos="relative" miw={320} pt="56.25%" w="100%" bg="red">
        <ReactPlayer
          width="100%"
          height="100%"
          controls={true}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          url={`https://www.youtube.com/watch?v=${id}`}
        />
      </Flex>
    </Flex>
  );
}
