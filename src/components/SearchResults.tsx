import { Box, Flex, Loader, Text } from "@mantine/core";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useGetSearchQuery } from "../services/search";
import { setVideos, setLoading } from "../store/data/dataSlice";
import SearchResultItem from "./SearchResultItem";
import "./SearchResults.css";
import SearchResultWrapper from "./SearchResultWrapper";

type Props = { socketRef: React.MutableRefObject<any> };

export default function SearchResults({ socketRef }: Props): JSX.Element {
  const { id } = useParams();
  const paginateLoading = useAppSelector(
    (state) => state.data.searchPaginateLoading
  );

  const {
    data: searchData,
    isLoading,
    isFetching,
    isError,
    //@ts-expect-error
  } = useGetSearchQuery(id, {
    skipToken: !id,
    // selectFromResult: ({ data }) => ({}),
  });

  const loading = isLoading || isFetching;

  console.log(searchData);

  const initialData =
    searchData &&
    searchData.content &&
    searchData.content.length > 0 &&
    searchData.content[0].content?.length > 0 &&
    searchData.content[0].content.map((item, index) => (
      <SearchResultItem key={`${item.videoId}${index}`} {...item} />
    ));

  const followOnData =
    searchData &&
    searchData.tokens.length > 0 &&
    searchData.tokens.map((item, index) => (
      <SearchResultWrapper
        index={index}
        length={searchData.tokens.length - 1}
        token={item}
        client={searchData.client}
        requestKey={searchData.key}
        id={searchData.query}
      />
    ));

  return (
    <Flex py={16} px={24} justify="center">
      {loading ? (
        <Loader />
      ) : isError ? (
        <Text>ERROR</Text>
      ) : (
        <Flex maw={1096} direction="column">
          {initialData}
          {followOnData}
          <Flex h={50} w="100%" justify="center" align="center">
            {paginateLoading ? <Loader /> : null}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
