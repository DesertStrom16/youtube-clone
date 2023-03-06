import { Box, Button, Flex, Loader, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import GridItemSkeleton from "./GridItemSkeleton";
import { useGetHomeContinuationQuery } from "../services/home";
import { useState } from "react";
import GridItem from "./GridItem";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {
  isOpen: boolean;
  numBlocks: number;
  token: string;
  index: number;
  dataLength: number;
  client: any;
  requestKey: string;
};

export default function GridContinuation({
  isOpen,
  numBlocks,
  token,
  index,
  dataLength,
  requestKey,
  client,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [fetchData, setFetchData] = useState(true);

  const { data, isLoading, isFetching, isError } = useGetHomeContinuationQuery(
    {
      key: requestKey,
      client: client,
      token: token,
    },
    {
      skip: index < dataLength ? false : fetchData,
    }
  );

  const isQueryLoading = isLoading || isFetching;

  const loadMoreHandler = () => {
    setFetchData(false);
  };

  const hasData = data && data.content && data.content.length > 0;

  return (
    <>
      {isQueryLoading || !hasData ? (
        <>
          {numBlocks > 0 && (
            <>
              <GridItemSkeleton isOpen={isOpen} />
              <GridItemSkeleton isOpen={isOpen} />
            </>
          )}
          {numBlocks > 1 && (
            <>
              <GridItemSkeleton isOpen={isOpen} />
              <GridItemSkeleton isOpen={isOpen} />
            </>
          )}
          {numBlocks > 2 && (
            <>
              <GridItemSkeleton isOpen={isOpen} />
              <GridItemSkeleton isOpen={isOpen} />
            </>
          )}
          {numBlocks > 3 && (
            <>
              <GridItemSkeleton isOpen={isOpen} />
              <GridItemSkeleton isOpen={isOpen} />
            </>
          )}
          {numBlocks > 4 && (
            <>
              <GridItemSkeleton isOpen={isOpen} />
              <GridItemSkeleton isOpen={isOpen} />
            </>
          )}
          {numBlocks > 5 && (
            <>
              <GridItemSkeleton isOpen={isOpen} />
              <GridItemSkeleton isOpen={isOpen} />
            </>
          )}
        </>
      ) : null}
      {data && data.content && data.content.length > 0 ? (
        data.content.map((item, index) => (
          <GridItem
            key={`${item.videoId}${index}`}
            isOpen={isOpen}
            dataLength={dataLength}
            index={index}
            {...item}
          />
        ))
      ) : isQueryLoading ? (
        <Loader />
      ) : isError ? (
        <Text>Error</Text>
      ) : (
        <Button
          w="20%"
          mx="40%"
          sx={{ alignSelf: "center" }}
          children="Load More"
          onClick={loadMoreHandler}
        />
      )}
    </>
  );
}
