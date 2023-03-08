import { Box, Button, Flex, Text } from "@mantine/core";
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

  console.log(data);

  return (
    <Flex
      w="100%"
      // maw='100vw'
      sx={{
        flexDirection: "column",

        "@media (min-width: 1015px)": {
          flexDirection: "row",
        },
      }}
    >
      <Flex ml={24} pt={24} pr={24} w="100%">
        <Flex
          pos="relative"
          pt="56.25%"
          w="100%"
          bg="red"
          sx={{
            minWidth: "calc(240px * (16 / 9))",
            maxWidth: "calc((100vh - (56px + 24px + 36px)) * (16/9))",

            "@media (min-width: 1015px)": {
              minWidth: "calc(360px * (16 / 9))",
            },
            "@media (min-width: 1343px)": {
              minWidth: "calc(480px * (16 / 9))",
            },
          }}
        >
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

      <Box
        sx={{
          "@media (min-width: 1015px)": {
            minWidth: 300,
            maxWidth: 402,
            width: "100%",
            paddingTop: 24,
            paddingRight: 24,
          },
        }}
      >
        <Flex mb={8} w="100%">
          <Box
            h={94}
            w={168}
            miw={168}
            mr={8}
            sx={{ position: "relative" }}
          ></Box>
          <Flex w="100%" pr={24}>
            <Text
              color="#f1f1f1"
              size={14}
              lh="20px"
              mah={40}
              lineClamp={2}
              fw={500}
              sx={{ textOverflow: "ellipsis" }}
            >
              Sound City
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
