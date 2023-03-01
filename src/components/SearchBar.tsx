import { Autocomplete, AutocompleteItem, Box, Flex, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { IconX } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  useGetSearchAutocompleteQuery,
  useGetSearchQuery,
} from "../services/search";
import { setVideos, setLoading } from "../store/data/dataSlice";
// import "./SearchResults.css";

type Props = {};

export default function SearchBar(props: Props): JSX.Element {
  const searchMatch = useMatch("/search/:slug");
  let location = searchMatch?.pathname.replace("/search/", "").replace("/", "");
  const slug = searchMatch?.params.slug;
  let navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const [autoValue, setAutoValue] = useState(location || "");
  const [autoValueDebounced] = useDebouncedValue(autoValue, 200);
  const isAutoEmpty = autoValue.trim() === "";

  useEffect(() => {
    if (slug && slug !== "" && slug !== autoValue) {
      setAutoValue(slug);
    }
  }, [location]);

  //@ts-expect-error
  const { refetch: refetch } = useGetSearchQuery(location, {
    skip: !location || location === "",
  });

  const { data: autoData } = useGetSearchAutocompleteQuery(autoValueDebounced, {
    skip: autoValueDebounced.trim() === "",
  });

  //   breakpoint for full width search bar: 656px

  const searchSubmitHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      ref.current?.blur();
      console.log(autoValue.trim(), "HERE");
      console.log(encodeURI(autoValue).trim(), "HERE");
      console.log(location?.trim(), "HERE");
      if ((location?.trim()) === encodeURI(autoValue).trim()) {
        console.log("REFETCHING");
        refetch();
      } else {
        navigate(`/search/${encodeURI(autoValue)}`);
      }
    }
  };

  const autoValueNavigateHandler = (item: AutocompleteItem) => {
    ref.current?.blur();
    navigate(`/search/${item.value}`);
  };

  return (
    <Flex sx={{ flex: "0 1 728px" }}>
      <Flex px={4} ml={40} h={40} w="100%">
        <Flex
          sx={{
            border: "1px solid #ccc",
            borderRight: "none",
            borderRadius: "40px 0 0 40px",
            boxShadow: "inset 0 1px 2px #eee",
          }}
          w="100%"
          ml={32}
          pl={16}
          pr={4}
          align="center"
        >
          <Autocomplete
            ref={ref}
            value={autoValue}
            onChange={setAutoValue}
            onKeyDown={searchSubmitHandler}
            onItemSubmit={autoValueNavigateHandler}
            filter={() => true}
            placeholder="Search"
            h="fit-content"
            w="100%"
            rightSection={
              <Box
                display={isAutoEmpty ? "none" : "flex"}
                sx={{ alignItems: "center" }}
              >
                <IconX stroke={1} size={24} />
              </Box>
            }
            rightSectionWidth="24px"
            styles={() => ({
              input: {
                lineHeight: "24px",
                padding: "1px 0",
                paddingRight: "24px",
                height: "fit-content",
                minHeight: "0px",
                border: 0,
                caretColor: "#0f0f0f",
                fontSize: 16,
                fontWeight: 400,
                color: "hsl(0deg 0% 7%)",
                background: "transparent",

                "&::placeholder": {
                  color: "#888",
                },
              },
            })}
            data={
              typeof autoData === "object" && autoData.length > 0
                ? autoData
                : []
            }
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
