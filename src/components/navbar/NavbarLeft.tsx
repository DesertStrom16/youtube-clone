import {
  Box,
  Button,
  Flex,
  Title,
  Drawer,
  FlexProps,
  UnstyledButton,
} from "@mantine/core";
import { IconArrowBack, IconArrowLeft, IconMenu2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = FlexProps & {
  menuClickHandler: () => void;
  isDrawer?: boolean;
  searchOpen?: boolean;
  setSearchOpen?: SetState;
};

export default function NavbarLeft(props: Props): JSX.Element {
  const {
    menuClickHandler,
    isDrawer,
    searchOpen,
    setSearchOpen,
    display = "flex",
    ...flexProps
  } = props;

  return (
    <Box
      {...flexProps}
      display={display}
      mih="56px"
      h="56px"
      sx={{ alignItems: "center" }}
    >
      <UnstyledButton
        h={40}
        mih={40}
        w={40}
        miw={40}
        onClick={setSearchOpen ? () => setSearchOpen(false) : undefined}
        sx={{
          marginRight: 8,
          marginLeft: 16,
          borderRadius: 20,
          display: "none",

          "&:hover": {
            backgroundColor: "rgba(255,255,255,.1)",
          },
          "&:active": {
            backgroundColor: "rgba(255,255,255,.2)",
          },

          "@media (max-width: 656px)": {
            marginLeft: 8,
            display: searchOpen ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <IconArrowLeft
          size={28}
          stroke={1}
          color="#fff"
          style={{ position: "relative", top: -0.4, left: 0.25 }}
        />
      </UnstyledButton>
      <UnstyledButton
        w={40}
        miw={40}
        h={40}
        mih={40}
        display={searchOpen ? "none" : "flex"}
        bg="transparent"
        sx={{
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 16,

          "&:hover": {
            backgroundColor: isDrawer ? "transparent" : "rgba(255,255,255,.1)",
          },
          "&:active": {
            backgroundColor: isDrawer
              ? "rgba(255,255,255,.1)"
              : "rgba(255,255,255,.2)",
          },

          "@media (max-width: 656px)": {
            marginLeft: 8,
            marginRight: 4,
          },
        }}
        onClick={menuClickHandler}
      >
        <IconMenu2 size={24} stroke={1.5} color="#fff" />
      </UnstyledButton>

      <Link
        to=""
        style={{
          textDecoration: "none",
          height: "100%",
          display: searchOpen ? "none" : "block",
        }}
      >
        <Box h='100%' sx={{
            "@media (min-width: 876px)": {
              width: 129,
              minWidth: 129,
            },
          }}>
        <Flex
          h="100%"
          w={110}
          miw={110}
          align="center"
          justify="center"
          sx={{
            "@media (min-width: 876px)": {
              width: 120,
              minWidth: 120,
            },
          }}
        >
          <Title size="h3" color="#FFFFFF" lh="normal">
            YT-Clone
          </Title>
        </Flex></Box>
      </Link>
    </Box>
  );
}
