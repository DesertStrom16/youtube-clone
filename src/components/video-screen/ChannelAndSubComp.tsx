import { Flex, Text } from "@mantine/core";
import "./VideoScreen.css";
import { useParams } from "react-router-dom";
import { useGetRecommendedQuery } from "../../services/watch";
import { useEffect, useState } from "react";
import { getObject, setObject } from "../../utils/localStorage";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNewSub, removeSub } from "../../features/storage";

type Props = {};

export default function ChannelAndSubComp({}: Props) {
  const dispatch = useAppDispatch();
  const storageSubsSelector = useAppSelector(
    (state) => state.storage.subscriptions
  );
  const { id } = useParams();
  const [imageLoaded, setImageLoaded] = useState(false);

  // @ts-expect-error
  const { data, isLoading, isFetching, isError } = useGetRecommendedQuery(id, {
    skip: !id,
  });

  const isSubbed = storageSubsSelector.find(
    (item) => item === data?.channelCannonicalURL
  );

  const imageLoadHandler = () => {
    setImageLoaded(true);
  };

  const subscribeHandler = () => {
    //  Button is disabled if "data" is undefined. Otherwise I wouldn't use non-null assertions.
    if (storageSubsSelector.length > 0) {
      // Not happy with this at all.
      setObject("@SUBS", [...storageSubsSelector, data!.channelCannonicalURL]);
      dispatch(addNewSub(data!.channelCannonicalURL));
    } else {
      setObject("@SUBS", [data!.channelCannonicalURL]);
      dispatch(addNewSub(data!.channelCannonicalURL));
    }
  };

  const unsubscribeHandler = () => {
    let updatedSubs = storageSubsSelector.filter(
      (item) => item !== data!.channelCannonicalURL
    );
    setObject("@SUBS", [...updatedSubs]);
    dispatch(removeSub(data!.channelCannonicalURL))
  };

  return (
    <Flex miw={0} py={8}>
      {/* Channel Avatar, Name, and Sub Count Container */}
      <Flex miw={0} align="center" style={{ flexGrow: 1 }}>
        {/* Channel Avatar */}
        <Flex
          w={34}
          miw={34}
          h={34}
          mih={34}
          mr={12}
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            background: "grey",
          }}
        >
          <img
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
          />
        </Flex>
        {/* Channel Name and Sub Count Container */}
        <Flex miw={0} style={{ alignItems: "baseline" }}>
          {/* Channel Name */}
          <Flex
            // mah={17.5}
            // lh="17.5px"
            style={{
              overflow: "hidden",
            }}
          >
            <Text
              lh="17.5px"
              color="rgb(241,241,241)"
              fw={400}
              sx={{
                fontSize: 14,
                // Roboto Arial sans-serif looks closer to the youtube app (and mobile desktop as well.)
                // fontFamily: "Youtube Sans",
                textOverflow: "ellipsis",
                overflowWrap: "break-word",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {data?.channelTitle}
            </Text>
          </Flex>
          {/* Sub Count */}
          <Flex
            mx={8}
            style={{
              opacity: 0.6,
            }}
          >
            <Text
              lh="15px"
              color="rgb(241,241,241)"
              fw={400}
              sx={{
                fontSize: 12,
                fontFamily: "Youtube Sans",
              }}
            >
              {data?.channelSubCount}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Subscribe Button Container */}
      <button
        onClick={isSubbed ? unsubscribeHandler : subscribeHandler}
        disabled={!data}
        id="subscribe-btn"
        style={{
          display: "flex",
          alignItems: "center",
          height: 36,
          margin: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 16,
          paddingRight: 16,
          textAlign: "center",
          borderRadius: 18,
          backgroundColor: "rgba(255,255,255,0.1)",
          border: 0,
          boxShadow: "none",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "rgb(241,241,241)",
          }}
        >
          {data ? (isSubbed ? "Subscribed!" : "Subscribe") : "Error"}
        </Text>
      </button>
    </Flex>
  );
}
