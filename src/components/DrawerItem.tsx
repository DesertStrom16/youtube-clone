import { Box, Button, Text } from "@mantine/core";
import { useMatch } from "react-router-dom";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {
  activeUrl: string;
  text: string;
  icon: JSX.Element;
};

// Unsure on :active styling, may revert back to mantine
export default function DrawerItem({ text, icon, activeUrl }: Props): JSX.Element {
    let match = useMatch(activeUrl);
  return (
    <Box
      h="40px"
      sx={{
        /* Active Link for now */
        backgroundColor: match ? "rgba(255,255,255,.1)" : 'transparent',
        borderRadius: "10px",
      }}
    >
      <Button
        component="a"
        href={activeUrl}
        w="100%"
        h="100%"
        p={0}
        px={12}
        sx={{
          border: "0px",
          backgroundColor: "rgba(255,255,255,0)",
          borderRadius: "10px",
          transition: 'background 0.3s ease',
          
          "&:hover": {
            backgroundColor: "rgba(255,255,255,.1)",
          },
          "&:active": {
            transform: "translateY(0)",
            backgroundColor: "rgba(255,255,255,.2)",
            transition: 'background 0s ease',
          },
        }}
        leftIcon={icon}
        styles={() => ({
          inner: {
            justifyContent: "flex-start",
          },
          leftIcon: {
            marginRight: 24,
          },
        })}
      >
        <Text size={14}>{text}</Text>
      </Button>
    </Box>
  );
}
