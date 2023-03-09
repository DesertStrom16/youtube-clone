import GridItemSkeleton from "./GridItemSkeleton";

type Props = { numBlocks: number; isOpen: boolean };

export default function HomeLoadingSkeleton({ numBlocks, isOpen }: Props) {
  return (
    <>
      {numBlocks > 0 && (
        <>
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
        </>
      )}
      {numBlocks > 1 && (
        <>
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
        </>
      )}
      {numBlocks > 2 && (
        <>
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
        </>
      )}
      {numBlocks > 3 && (
        <>
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
        </>
      )}
      {numBlocks > 4 && (
        <>
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
        </>
      )}
      {numBlocks > 5 && (
        <>
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
          <GridItemSkeleton isOpen={isOpen} />
        </>
      )}
    </>
  );
}
