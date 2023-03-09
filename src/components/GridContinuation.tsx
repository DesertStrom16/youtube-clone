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
  xsMinMatch: boolean;
  overallLength: number;
};

export default function GridContinuation({
  isOpen,
  numBlocks,
  token,
  index,
  dataLength,
  requestKey,
  client,
  xsMinMatch,
  overallLength,
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

  const remainder = hasData && xsMinMatch ? overallLength % numBlocks : 0;

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
      {hasData ? (
        data.content.map((item, i) => {
          if (
            remainder &&
            index === dataLength - 1 &&
            overallLength - (overallLength - data.content.length + i + 1) <
              remainder
          ) {
            console.log(
              `Aborted Continuation: ${index}: overall, `,
              overallLength - data.content.length + i
            );
          } else {
            return (
              <GridItem
                key={`${item.videoId}${i}`}
                isOpen={isOpen}
                dataLength={dataLength}
                index={i}
                {...item}
              />
            );
          }
        })
      ) : isQueryLoading || isError ? (
        <Flex w="100%" justify="center" align="center" mt={5} mb={30}>
          {isQueryLoading ? <Loader /> : <Text color="#f1f1f1">Error</Text>}
        </Flex>
      ) : (
        <Button
          w="20%"
          mt={5}
          mb={30}
          mx="40%"
          fw={500}
          sx={{ alignSelf: "center" }}
          children="Load More"
          onClick={loadMoreHandler}
        />
      )}
    </>
  );
}
