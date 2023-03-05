import { Box, Flex, Loader, Text } from "@mantine/core";
import { useEffect } from "react";
import { useMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useGetSearchQuery } from "../services/search";
import SearchResultItem from "./SearchResultItem";
import "./SearchResults.css";
import SearchResultWrapper from "./SearchResultWrapper";

type Props = {};

export default function SearchResults({}: Props): JSX.Element {
  const searchMatch = useMatch("/search/:slug");
  let location = searchMatch?.pathname.replace("/search/", "").replace("/", "");

  const {
    data: searchData,
    isLoading,
    isFetching,
    isError,
    //@ts-expect-error
  } = useGetSearchQuery(location, {
    skip: !location,
    // selectFromResult: ({ data }) => ({}),
  });

  const loading = isLoading || isFetching;

  console.log(searchData);

  const initialData =
    searchData &&
    searchData.content &&
    searchData.content.content?.length > 0 &&
    searchData.content.content.map((item, index) => (
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
        key={`${item}${index}`}
        requestKey={searchData.key}
        id={searchData.query}
      />
    ));

  return (
      <Flex py={16} px={24} justify="center" maw={1144} w='100%'>
        {loading ? (
          <Loader />
        ) : isError ? (
          <Text color='#f1f1f1'>ERROR</Text>
        ) : (
          <Flex maw={1096} direction="column" sx={{flexGrow: 1}}>
            {initialData}
            {followOnData}
          </Flex>
        )}
      </Flex>
  );
}
