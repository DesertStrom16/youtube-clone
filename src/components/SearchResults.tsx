import { Box, Flex, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useGetSearchQuery } from "../services/search";
import { setVideos, setLoading } from "../store/data/dataSlice";
import "./SearchResults.css";

type Props = {};

export default function SearchResults(props: Props): JSX.Element {
  const { id } = useParams();

  const {
    data: searchData,
    isLoading,
    isFetching,
    isError,
    //@ts-expect-error
  } = useGetSearchQuery(id, { skipToken: !id });

  if (searchData) {
    console.log(searchData);
  }

  const loading = isLoading || isFetching;

  return (
    <Flex py={16} px={24} direction="column">
      {loading ? (
        <Text>LOADING</Text>
      ) : isError ? (
        <Text>ERROR</Text>
      ) : (
        searchData &&
        searchData.length > 0 &&
        searchData.map((item) => (
          <Flex mt={16} direction="row">
            <div className="thumbnail-wrapper">
              <Box
                component="a"
                w="100%"
                h="100%"
                pos="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                bg="orange"
                href={`/watch/${item.videoId}`}
                sx={{ cursor: "pointer", overflow: "hidden", borderRadius: 12 }}
              >
                <img
                  src={item.thumbnailUrl}
                  width="100%"
                  height="100%"
                  style={{
                    background: "transparent",
                    objectFit: "cover",
                    display: "inline-block",
                    minWidth: "1px",
                    minHeight: "1px",
                  }}
                />
              </Box>
            </div>

            {/* Text Outer Wrapper */}
            <Flex sx={{ flex: 1 }} direction="column">
              {/* Title Wrapper */}
              <Flex>
                <Box component="a" mr={8} color="#0f0f0f">
                  <Text lineClamp={2} fw={400} size={18} lh="26px" mah={52}>
                    {item.title}
                  </Text>
                </Box>
                <Box w={40} h={24}></Box>
              </Flex>

              {/* Sub-Title Wrapper */}
              <Flex direction="row" wrap="wrap" mah={36} sx={{ lineClamp: 2 }}>
                <span className="view-count-upload-date">{item.viewCount}</span>
                {item.uploadDate.trim() !== '' && <span className="view-count-upload-date with-dot">
                  {item.uploadDate}
                </span>}
              </Flex>
            </Flex>
          </Flex>
        ))
      )}
    </Flex>
  );
}
