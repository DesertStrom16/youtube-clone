import { UnstyledButton } from "@mantine/core";

type Props = React.PropsWithChildren & {
  url: string;
};

export default function NavButton({ children, url }: Props): JSX.Element {
  return (
    <UnstyledButton
      component="a"
      href={url}
      w="100%"
      h="100%"
      display="block"
      p={0}
      sx={{
        backgroundColor: "rgba(255,255,255,0)",
        borderRadius: "10px",
        transition: "background 0.3s ease",
        color: "#FFFFFF",

        "&:hover": {
          backgroundColor: "rgba(255,255,255,.1)",
        },
        "&:active": {
          backgroundColor: "rgba(255,255,255,.2)",
          transition: "background 0s ease",
        },
      }}
    >
      {children}
    </UnstyledButton>
  );
}
