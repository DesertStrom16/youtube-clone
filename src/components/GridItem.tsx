import { Box, Button, Flex, Text, UnstyledButton } from "@mantine/core";
import IconWrapper from "./IconWrapper";
import NavButton from "./navbar/NavButton";
import "./GridItem.css";
import { Link } from "react-router-dom";
import { Video } from "../types/video";
import { mdMin, smMin, xsMin } from "../utils/breakpoints";
import GridItemTitle from "./grid-item/GridItemTitle";
import GridItemChannel from "./grid-item/GridItemChannel";
import { areImagesDisabled } from "../utils/env";
import GridItemBase from "./grid-item/GridItemBase";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = Video & {
  isOpen: boolean;
};

export default function GridItem({ isOpen, ...videoData }: Props): JSX.Element {
  const xlMin = isOpen ? 2303 : 2135;
  const lgMin = isOpen ? 1968 : 1800;

  return (
    <GridItemBase
      {...videoData}
      wrapperProps={{
        "@media (pointer:fine) or (pointer:none)": {
          maxWidth: 320,
          width: "calc(100% - 16px)",
          marginLeft: 8,
          marginRight: 8,
          marginBottom: 40,
        },
        [`@media (min-width: ${xsMin}px)`]: {
          // 2
          width: "calc(50% - 16px)",
          maxWidth: 320,
          marginLeft: 8,
          marginRight: 8,
        },
        [`@media (min-width: ${smMin}px)`]: {
          // 3
          width: "calc((100% / 3) - 16px)",
        },
        [`@media (min-width: ${mdMin}px)`]: {
          // 4
          width: "calc(25% - 16px)",
        },
        [`@media (min-width: ${isOpen ? "calc(1463px + 168px)" : "1463px"})`]: {
          maxWidth: 360,
        },
        [`@media (min-width: ${lgMin}px)`]: {
          // 5
          width: "calc(20% - 16px)",
        },
        [`@media (min-width: ${xlMin}px)`]: {
          // 6
          width: "calc((100% / 6) - 16px)",
        },
      }}
      viewCountWrapper={{
        [`@media (min-width: ${isOpen ? "calc(1631px + 168px)" : "1631px"})`]: {
          maxHeight: 40,
        },
      }}
    />
  );
}
