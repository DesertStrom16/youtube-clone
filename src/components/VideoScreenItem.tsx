import { Box, Flex, Text } from "@mantine/core";
import { Video } from "../types/video";
import "./VideoScreenItem.css";
import { Link } from "react-router-dom";

type Props = Video & {};

export default function VideoScreenItem({
  title,
  channel,
  viewCount,
  uploadDate,
  videoId,
  thumbnailUrl,
}: Props) {
  return (
    <Flex mb={8} w="100%">
      <Box
        h={94}
        w={168}
        miw={168}
        mr={8}
        sx={{
          position: "relative",
        }}
      >
        <Link
          to={"/watch/" + videoId}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
            }}
            src={thumbnailUrl}
          />
        </Link>
      </Box>
      <Box
        w="100%"
        pr={24}
        h="fit-content"
        sx={{
          color: "transparent",
          fontSize: undefined,
          textDecoration: "none",
          display: "flex",
          flexDirection: 'column'
        }}
        component={Link}
        to={"/watch/" + videoId}
      >
        <Text
          color="#f1f1f1"
          size={14}
          lh="20px"
          mah={40}
          lineClamp={2}
          fw={500}
          mb={4}
          // sx={{
          //   "@media (min-width: 1015px)": {

          //   },
          // }}
        >
          {title}
        </Text>

        <Text
          color="rgb(170,170,170)"
          size={12}
          lh="18px"
          mah={18}
          fw={400}
          lineClamp={1}
          sx={{
            wordBreak: "break-all",
          }}
        >
          {channel}
        </Text>
        <Text
          mah="18px"
          maw="100%"
          lh="18px"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          lineClamp={1}
          color="rgb(170,170,170)"
        >
          <span className="date-wrapper">{viewCount}</span>
          <span
            className={
              "date-wrapper" +
              (!uploadDate ||
              !viewCount ||
              uploadDate === "" ||
              viewCount === ""
                ? ""
                : " dot")
            }
          >
            {uploadDate}
          </span>
        </Text>
      </Box>
    </Flex>
  );
}
