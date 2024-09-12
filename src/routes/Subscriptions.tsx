import { Box, Button, Flex, Loader, ScrollArea, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useState, useEffect, useRef } from "react";
import { getObject, setObject } from "../utils/localStorage";
import { useGetChannelQuery } from "../services/channel";
import CarouselAvatar from "../components/subs-screen/CarouselAvatar";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {};

export default function Subscriptions({}: Props): JSX.Element {
  const storageSubsSelector = useAppSelector(
    (state) => state.storage.subscriptions
  );

// const {} = useGetChannelQuery()

  
  return (
    <Flex>
      {/* Subs Avatar Carousel */}
      <Flex style={{flexDirection: 'row'}}>
        <Flex style={{border: '1px solid green'}}><CarouselAvatar /></Flex>
        
        <CarouselAvatar />
        <CarouselAvatar />
        <CarouselAvatar />
        <CarouselAvatar />
        <CarouselAvatar />
        <CarouselAvatar />
        <CarouselAvatar />
        <CarouselAvatar />
        <CarouselAvatar />
        <Flex style={{border: '1px solid red'}}><CarouselAvatar /></Flex>
      </Flex>

    </Flex>
  );
}
