import {
  Autocomplete,
  AutocompleteItem,
  Box,
  Flex,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { IconX, IconSearch } from "@tabler/icons-react";
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

      if (location?.trim() === encodeURI(autoValue).trim()) {
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
          pos="relative"
          sx={{
            border: "1px solid hsl(0,0%,18.82%)",
            borderRight: "none",
            borderRadius: "40px 0 0 40px",
            boxShadow: "inset 0 1px 2px hsla(0,0,0,0)",
            padding: "0 4px 0 16px",

            "&:focus-within": {
              border: "1px solid #1c62b9",
              boxShadow: "inset 0 1px 2px rgb(0 0 0 / 30%)",
              marginLeft: 0,
              padding: "2px 4px 2px 48px",
            },
            "&:focus-within .search-icon-wrapper": {
              width: 20,
              height: 20,
              padding: "0 12px 0 16px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
          bg="hsl(0,0%,7%)"
          w="100%"
          ml={32}
          align="center"
        >
          <Box
            className="search-icon-wrapper"
            sx={{
              display: "none",
              boxSizing: "content-box",
              position: "absolute",
              left: 0,
              padding: "0 10px",
            }}
          >
            <IconSearch color="#fff" stroke={1} />
          </Box>

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
                <IconX stroke={1} size={24} color="#f1f1f1" />
              </Box>
            }
            rightSectionWidth="24px"
            styles={() => ({
              dropdown: {
                marginTop: 3,
                borderRadius: 12,
              },
              itemsWrapper: {
                padding: "16px 0 18px 0",
              },
              item: {
                // padding: '0 24px 0 16px'
                paddingRight: 24,
                paddingLeft: 16,
              },
              input: {
                lineHeight: "24px",
                padding: "1px 0",
                paddingRight: "24px",
                width: "100%",
                height: "fit-content",
                minHeight: "0px",
                border: 0,
                caretColor: "#f1f1f1",
                fontSize: 16,
                fontWeight: 400,
                color: "hsla(0, 100%, 100%, 0.88)",
                background: "transparent",
                outline: "none",
                margin: 0,

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
        <UnstyledButton
          sx={{
            border: "1px solid hsl(0,0%,18.82%)",
            backgroundColor: "hsla(0,0%,100%,0.08)",
            borderRadius: "0 40px 40px 0",
            padding: "1px 6px",
            height: 40,
            width: 64,
            minWidth: 64,
            minHeight: 40,
            textAlign: 'center'
          }}
        
        ><IconSearch size={24} color='#f1f1f1' stroke={1} display='inline-flex' style={{verticalAlign: 'middle'}} /></UnstyledButton>
      </Flex>
      <Flex miw={40} mih={40} ml={4}></Flex>
    </Flex>
  );
}
