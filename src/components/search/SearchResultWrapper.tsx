import { Box, Button, Flex, Loader, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetSearchContinuationQuery } from "../../services/search";
import SearchResultItem from "./SearchResultItem";
import "./SearchResults.css";
import GridItemBase from "../grid-item/GridItemBase";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  token: string;
  client: any;
  requestKey: string;
  index: number;
  length: number;
  id: string;
};

export default function SearchResultWrapper({
  token,
  client,
  requestKey,
  index,
  length,
  id,
}: Props): JSX.Element {
  const [fetchData, setFetchData] = useState(true);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isTouchScreen = useMediaQuery("(pointer:coarse)");

  const { data, isLoading, isFetching, isError } =
    useGetSearchContinuationQuery(
      {
        key: requestKey,
        client: client,
        token: token,
        query: id,
      },
      { skip: index < length ? false : fetchData }
    );

  useEffect(() => {
    if (wrapperRef && wrapperRef.current !== null) {
      let observer;

      let options = {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      };

      observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(wrapperRef.current);
    }
  }, []);

  const handleIntersect = (entries: any, observer: any) => {
    console.log(entries[0].isIntersecting);
    if (entries[0].isIntersecting) {
      console.log("INTERSECT");
    }
  };

  const loadMoreHandler = () => {
    setFetchData(false);
  };

  const isContinuationLoading = isLoading || isFetching;

  const divHeight = isContinuationLoading || !data ? 100 : undefined;

  return (
    <Flex
      ref={wrapperRef}
      h={divHeight}
      mah={divHeight}
      mih={divHeight}
      justify={divHeight ? "center" : undefined}
      direction="column"
    >
      {isContinuationLoading ? (
        <Loader sx={{ alignSelf: "center" }} />
      ) : isError ? (
        // Add Refetch Button
        <Text color="#FFFFFF" sx={{ alignSelf: "center" }}>
          Error
        </Text>
      ) : data && data.content.length > 0 ? (
        data?.content.map((item, index) =>
          isTouchScreen ? (
            <GridItemBase key={`${item.videoId}${index}`} {...item} />
          ) : (
            <SearchResultItem key={`${item.videoId}${index}`} {...item} />
          )
        )
      ) : (
        <Button
          w="20%"
          sx={{ alignSelf: "center" }}
          children="Load More"
          onClick={loadMoreHandler}
        />
      )}
    </Flex>
  );
}
