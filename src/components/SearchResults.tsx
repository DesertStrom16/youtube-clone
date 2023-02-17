import { Box, Flex, Loader, Text } from "@mantine/core";
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
  const paginateData = useAppSelector((state) => state.data.searchPaginateData);
  const paginateLoading = useAppSelector(
    (state) => state.data.searchPaginateLoading
  );

  const {
    data: searchData,
    isLoading,
    isFetching,
    isError,
    //@ts-expect-error
  } = useGetSearchQuery(id, { skipToken: !id });

  const loading = isLoading || isFetching;

  const initialData =
    searchData &&
    searchData.length > 0 &&
    searchData.map((item, index) => (
      <SearchResultItem key={`${item.videoId}${index}`} {...item} />
    ));

  const followOnData =
    paginateData &&
    paginateData.length > 0 &&
    paginateData.map((item) =>
      item.map((item, index) => (
        <SearchResultItem key={`${item.videoId}${index}`} {...item} />
      ))
    );

  return (
    <Flex py={16} px={24} direction="column">
      {loading ? (
        <Text>LOADING</Text>
      ) : isError ? (
        <Text>ERROR</Text>
      ) : (
        <>
          {initialData}
          {followOnData}
          <Flex h={50} w="100%" justify="center" align="center">
            {paginateLoading ? <Loader /> : null}
          </Flex>
        </>
      )}
    </Flex>
  );
}
