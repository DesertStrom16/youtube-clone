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
  videoId
}: Props) {
  return (
    <Link to={'/watch/' + videoId} style={{display: 'flex', marginBottom: 8, width: '100%', color: 'transparent', fontSize: undefined, textDecoration: 'none'}}>
      <Box h={94} w={168} miw={168} mr={8} sx={{ position: "relative" }}></Box>
      <Flex w="100%" pr={24} direction={"column"}>
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
      </Flex>
    </Link>
  );
}
