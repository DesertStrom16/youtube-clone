import { Box, Flex, Text } from "@mantine/core";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useGetSearchQuery } from "../services/search";
import { setVideos, setLoading } from "../store/data/dataSlice";
import SearchResultItem from "./SearchResultItem";
import "./SearchResults.css";

type Props = { socketRef: React.MutableRefObject<any> };

export default function SearchResults({ socketRef }: Props): JSX.Element {
  const { id } = useParams();

  const {
    data: searchData,
    isLoading,
    isFetching,
    isError,
    //@ts-expect-error
  } = useGetSearchQuery(id, { skipToken: !id });

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
        searchData.map((item, index) => (
          <SearchResultItem key={`${item.videoId}${index}`} {...item} />
        ))
      )}
    </Flex>
  );
}
