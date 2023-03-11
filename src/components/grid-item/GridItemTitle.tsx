import { Text } from "@mantine/core";

type Props = { title: string };

export default function GridItemTitle({ title }: Props): JSX.Element {
  return (
    <Text
      mt={12}
      mb={4}
      color="#f1f1f1"
      sx={{
        fontSize: 14,
        lineHeight: "20px",
        maxHeight: "40px",
        wordBreak: 'break-word',

        "@media (min-width: 1464px)": {
          fontSize: 16,
          lineHeight: "22px",
          maxHeight: "44px",
        },
      }}
      lineClamp={2}
      fw={500}
    >
      {title}
    </Text>
  );
}
