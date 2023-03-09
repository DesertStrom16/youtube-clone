import { Box, Flex, Text } from "@mantine/core";
import { Video } from "../types/video";
import "./VideoScreenItem.css";

type Props = Video & {};

export default function VideoScreenItem({
  title,
  channel,
  viewCount,
  uploadDate,
}: Props) {

  return (
    <Flex mb={8} w="100%">
      <Box h={94} w={168} miw={168} mr={8} sx={{ position: "relative" }}></Box>
      <Flex w="100%" pr={24} direction={"column"}>
        <Text
          color="#f1f1f1"
          size={14}
          lh="20px"
          mah={40}
          lineClamp={2}
          fw={500}
          sx={{
            textOverflow: "ellipsis",
            "@media (min-width: 1015px)": {
              marginBottom: 4,
            },
          }}
        >
          {title}
        </Text>
        <Text
          color="rgb(170,170,170)"
          size={12}
          lh="18px"
          fw={400}
          sx={{
            textOverflow: "ellipsis",
            wordBreak: "break-word",
            whiteSpace: "nowrap",
          }}
        >
          {channel}
        </Text>
        <Flex direction="row">
          <Text className="date-wrapper">{viewCount}</Text>
          <Text
            className={
              "date-wrapper" + ((!uploadDate ||
              !viewCount ||
              uploadDate === "" ||
              viewCount === "")
                ? ""
                : " dot")
            }
          >
            {uploadDate}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
