import { Box, Button, Flex, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { Video } from "../../types/video";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = Video & {};

export default function SearchResultItem({
  videoId,
  thumbnailUrl,
  title,
  uploadDate,
  viewCount,
  avatarUrl,
  channel,
  desc,
}: Props): JSX.Element {
  return (
    <Flex mt={16} direction="row">
      <div className="thumbnail-wrapper">
        <Box
          component={Link}
          w="100%"
          h="100%"
          pos="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          to={`/watch/${videoId}`}
          sx={{ cursor: "pointer", overflow: "hidden", borderRadius: 12 }}
        >
          <img
            src={thumbnailUrl}
            width="100%"
            height="100%"
            style={{
              background: "transparent",
              objectFit: "cover",
              display: "inline-block",
              minWidth: "1px",
              minHeight: "1px",
            }}
          />
        </Box>
      </div>

      {/* Text Outer Wrapper */}
      <Link
        to={"/watch/" + videoId}
        style={{
          display: 'flex',
          flex: 1,
          height: 'fit-content',
          color: "transparent",
          fontSize: undefined,
          textDecoration: "none",
        }}
      >
      <Flex sx={{ flex: 1 }} direction="column">
        {/* Title Wrapper */}
        <Flex>
          <Box mr={8} color="#0f0f0f">
            {/* <Box component="a" mr={8} color="#0f0f0f"> */}
            <Text
              lineClamp={2}
              fw={400}
              size={18}
              lh="26px"
              mah={52}
              color="#f1f1f1"
            >
              {title}
            </Text>
          </Box>
          <Box w={40} miw={40} h={24}></Box>
        </Flex>

        {/* Sub-Title Wrapper */}
        <Flex direction="row" wrap="wrap" mah={36} sx={{ lineClamp: 2 }}>
          <span className="view-count-upload-date">{viewCount}</span>
          {uploadDate.trim() !== "" && (
            <span className="view-count-upload-date with-dot">
              {uploadDate}
            </span>
          )}
        </Flex>

        <Flex py={12} direction="row" align="center">
          <Box pr={8} lh="normal" sx={{ fontSize: 10 }}>
            <Box
              display="inline-block"
              bg="transparent"
              sx={{ borderRadius: "50%", overflow: "hidden" }}
            >
              <img style={{ display: "block", width: 24 }} src={avatarUrl} />
            </Box>
          </Box>
          <Text
            display="inline-block"
            color="#aaa"
            lh="18px"
            fw={400}
            sx={{ fontSize: 12 }}
          >
            {channel}
          </Text>
         
        </Flex>
        <Text
            mah={36}
            lh="18px"
            fw={400}
            lineClamp={2}
            mb={8}
            color='#aaa'
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              fontSize: 12,
            }}
          >
            {desc}
          </Text>
      </Flex></Link>
    </Flex>
  );
}
