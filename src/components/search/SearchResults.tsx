import { Box, Flex, Loader, Text } from "@mantine/core";
import { useEffect } from "react";
import { useMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetSearchQuery } from "../../services/search";
import SearchResultItem from "./SearchResultItem";
import "./SearchResults.css";
import SearchResultWrapper from "./SearchResultWrapper";
import { useMediaQuery } from "@mantine/hooks";
import GridItemBase from "../grid-item/GridItemBase";

type Props = {};

export default function SearchResults({}: Props): JSX.Element {
  const searchMatch = useMatch("/search/:slug");
  const isTouchScreen = useMediaQuery("(pointer:coarse)");
  let location = searchMatch?.pathname.replace("/search/", "").replace("/", "");

  const {
    data: searchData,
    isLoading,
    isFetching,
    isError,
    //@ts-expect-error
  } = useGetSearchQuery(location, {
    skip: !location,
  });

  const loading = isLoading || isFetching;

  const initialData =
    searchData &&
    searchData.content &&
    searchData.content.content?.length > 0 &&
    searchData.content.content.map((item, index) =>
      isTouchScreen ? (
        <GridItemBase key={`${item.videoId}${index}`} {...item} />
      ) : (
        <SearchResultItem key={`${item.videoId}${index}`} {...item} />
      )
    );

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
    <Flex
      py={16}
      px={24}
      justify="center"
      maw={1144}
      w="100%"
      sx={{
        "@media (pointer:coarse)": {
          padding: 0,
        },
      }}
    >
      {loading || isError ? (
        <Flex h={45} justify="center" align="center">
          {loading ? <Loader /> : <Text color="#f1f1f1">ERROR</Text>}
        </Flex>
      ) : (
        <Flex maw={1096} direction="column" sx={{ flexGrow: 1 }}>
          {initialData}
          {followOnData}
        </Flex>
      )}
    </Flex>
  );
}
