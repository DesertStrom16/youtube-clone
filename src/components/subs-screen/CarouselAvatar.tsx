import { Box, Button, Flex, Loader, ScrollArea, Text } from "@mantine/core";
// import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useState, useEffect, useRef } from "react";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {};

// TODO - Channel thumbnail from get request is 900x900. Will be scaling this down as needed.
// Ideally I would be able to get the different variations so I don't have to resize.
export default function CarouselAvatar({}: Props): JSX.Element {
    // const [imageLoaded, setImageLoaded] = useState(false)

    // const imageLoadHandler = () => {
    //     setImageLoaded(true);
    // }
  
  return (
 
      <Flex
          w={48}
          miw={48}
          h={48}
          mih={48}
          mr={12}
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            background: "grey",
          }}
        >
          {/* <img
            src={data?.channelThumbnail[0].url}
            alt="Channel Thumbnail"
            width="34px"
            height="34px"
            style={{
              background: "transparent",
              objectFit: "cover",
              display: imageLoaded ? "inline-block" : "none",
              minWidth: "1px",
              minHeight: "1px",
            }}
            onLoad={imageLoadHandler}
          /> */}
        </Flex>
 
  );
}
