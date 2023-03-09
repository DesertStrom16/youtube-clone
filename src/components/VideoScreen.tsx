import { Box, Button, Flex, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useGetRecommendedQuery } from "../services/watch";
import VideoScreenItem from "./VideoScreenItem";

type Props = {};

export default function VideoScreen({}: Props): JSX.Element {
  const { id } = useParams();

  // @ts-expect-error
  const { data, isLoading, isFetching, isError } = useGetRecommendedQuery(id, {
    skip: !id,
  });

  // console.log(data);

  return (
    <Flex
      w="100%"
      sx={{
        flexDirection: "column",
        maxWidth: "calc(1280px + 402px + (3 * 24px))",

        "@media (min-width: 1015px)": {
          flexDirection: "row",
        },
      }}
    >
      <Flex ml={24} pt={24} pr={24} sx={{ flexGrow: 1 }} direction='column'>
        <Flex
          pos="relative"
          pt="56.25%"
          w="100%"
          bg="red"
          mah={0}
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
            onReady={() => console.log("Player Ready")}
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
        <Flex mt={12}>
          <Text
            lh="28px"
            color="rgb(241,241,241)"
            fw={600}
            sx={{ fontSize: 20, fontFamily: "Youtube Sans", wordBreak: 'break-word' }}
          >
            {data?.watchTitle}
          </Text>
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
            boxSizing: "content-box",
          },
        }}
      >
        {data && data.content.content.length > 0
          ? data.content.content.map((item) => <VideoScreenItem {...item} />)
          : null}
      </Box>
    </Flex>
  );
}
