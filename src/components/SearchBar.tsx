import {
  Autocomplete,
  AutocompleteItem,
  Box,
  Button,
  Flex,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import {
  IconX,
  IconSearch,
  IconMicrophone,
  IconDotsVertical,
  IconUserCircle,
} from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  useGetSearchAutocompleteQuery,
  useGetSearchQuery,
} from "../services/search";
import "./SearchBar.css";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {
  setSearchOpen: SetState;
  searchOpen: boolean;
};

export default function SearchBar({
  setSearchOpen,
  searchOpen,
}: Props): JSX.Element {
  const searchMatch = useMatch("/search/:slug");
  let location = searchMatch?.pathname.replace("/search/", "").replace("/", "");
  const slug = searchMatch?.params.slug;
  let navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const [autoValue, setAutoValue] = useState(location || "");
  const [autoValueDebounced] = useDebouncedValue(autoValue, 200);
  const isAutoEmpty = autoValue.trim() === "";
  //   breakpoint for full width search bar: 656px

  useEffect(() => {
    if (slug && slug !== "" && slug !== autoValue) {
      setAutoValue(slug);
    }
  }, [location]);

  useEffect(() => {
    if (searchOpen) {
      ref.current?.focus();
    }
  }, [searchOpen]);

  //@ts-expect-error
  const { refetch: refetch } = useGetSearchQuery(location, {
    skip: !location || location === "",
  });

  const { data: autoData } = useGetSearchAutocompleteQuery(autoValueDebounced, {
    skip: autoValueDebounced.trim() === "",
  });

  const submitHandler = () => {
    ref.current?.blur();

    if (!isAutoEmpty) {
      if (location?.trim() === encodeURI(autoValue).trim()) {
        console.log("REFETCHING");
        refetch();
      } else {
        navigate(`/search/${encodeURI(autoValue)}`);
      }
    }
  };

  const searchSubmitHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  const autoValueNavigateHandler = (item: AutocompleteItem) => {
    ref.current?.blur();
    navigate(`/search/${item.value}`);
  };

  const openSearchHandler = () => {
    setSearchOpen(true);
  };

  const clearSearchHandler = () => {
    setAutoValue("");
    ref.current?.focus();
  };

  return (
    <>
      <Flex
        sx={{
          flex: "0 1 728px",

          "@media (max-width: 656px)": {
            flex: 1,
            justifyContent: "flex-end",
          },
        }}
      >
        <Box
          px={4}
          h={40}
          mih={40}
          w="100%"
          display="flex"
          sx={{
            marginLeft: 40,

            "@media (max-width: 656px)": {
              marginLeft: 0,
              display: searchOpen ? "flex" : "none",
            },
          }}
        >
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
                <UnstyledButton
                  miw={40}
                  w={40}
                  mih={40}
                  h={40}
                  onClick={clearSearchHandler}
                  sx={{
                    borderRadius: 20,
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,.1)",
                    },
                    "&:active": {
                      backgroundColor: "rgba(255,255,255,.2)",
                    },
                  }}
                  bg="transparent"
                >
                  <IconX stroke={1} size={25} color="#f1f1f1" />
                </UnstyledButton>
              }
              rightSectionWidth="24px"
              styles={() => ({
                dropdown: {
                  width: "calc(100%)!important",
                  marginTop: 3,
                  borderRadius: 12,
                  marginLeft: -21,
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
                rightSection: {
                  display: isAutoEmpty ? "none" : "flex",
                  alignItems: "center",
                  width: 24,
                  height: 24,
                },
              })}
              data={
                typeof autoData === "object" &&
                autoData.length > 0 &&
                !isAutoEmpty
                  ? autoData
                  : []
              }
            />
          </Flex>
          <UnstyledButton
            onClick={submitHandler}
            sx={{
              border: "1px solid hsl(0,0%,18.82%)",
              backgroundColor: "hsla(0,0%,100%,0.08)",
              borderRadius: "0 40px 40px 0",
              padding: "1px 6px",
              height: 40,
              width: 64,
              minWidth: 64,
              minHeight: 40,
              textAlign: "center",
            }}
          >
            <IconSearch
              size={22}
              color="#f1f1f1"
              stroke={1}
              display="inline-flex"
              style={{ verticalAlign: "middle" }}
            />
          </UnstyledButton>
        </Box>

        {/* Search Button Small Width Screen */}
        <UnstyledButton
          miw={40}
          w={40}
          mih={40}
          h={40}
          p={8}
          display="none"
          onClick={openSearchHandler}
          sx={{
            borderRadius: 20,
            textAlign: "center",

            "&:hover": {
              backgroundColor: "rgba(255,255,255,.1)",
            },
            "&:active": {
              backgroundColor: "rgba(255,255,255,.2)",
            },

            "@media (max-width: 656px)": {
              display: searchOpen ? "none" : "inline-block",
            },
          }}
          bg="transparent"
        >
          <IconSearch
            size={22.5}
            color="#f1f1f1"
            stroke={1}
            display="inline-flex"
            style={{ verticalAlign: "middle" }}
          />
        </UnstyledButton>
        <Flex
          w={40}
          miw={40}
          h={40}
          mih={40}
          ml={4}
          justify="center"
          align="center"
          sx={{
            borderRadius: 100,
            backgroundColor: "#181818",

            "@media (max-width: 656px)": {
              borderRadius: 0,
              backgroundColor: "#212121",
            },

            "& path:first-of-type": {
              fill: "#fff",
            },
          }}
        >
          <IconMicrophone size={22} color="#fff" stroke={1} />
        </Flex>
      </Flex>

      {/* Right Side Buttons */}
      <Box
        miw={225}
        w={225}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",

          "@media (max-width: 656px)": {
            minWidth: 141.31,
            width: 141.31,
            display: searchOpen ? "none" : "flex",
          },
        }}
      >
        <UnstyledButton
          w={40}
          miw={40}
          h={40}
          mih={40}
          p={8}
          display="inline-block"
          sx={{
            borderRadius: 20,
            textAlign: "center",
            backgroundColor: "transparent",
            marginRight: 8,

            "&:active": {
              backgroundColor: "rgba(255,255,255,.1)",
            },

            "@media (max-width: 656px)": {
              marginRight: 0,
            },
          }}
          bg="transparent"
        >
          <IconDotsVertical
            size={24}
            color="#fff"
            stroke={1}
            fill="#FFF"
            display="inline-flex"
            style={{ verticalAlign: "middle" }}
          />
        </UnstyledButton>
        <Flex
          px={15}
          h={36}
          color="#3ea6ff"
          justify="center"
          align="center"
          sx={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: 18 }}
        >
          <Box mr={6} ml={-6} w={24} h={24}>
            <IconUserCircle color="#3ea6ff" size={24} stroke={1} />
          </Box>
          <Text
            color="#3ea6ff"
            fw={500}
            sx={{
              fontSize: 14,
              letterSpacing: 0.5,
              "@media (pointer: coarse)": {
                fontSize: 13,
              },
            }}
          >
            Sign in
          </Text>
        </Flex>
      </Box>
    </>
  );
}
