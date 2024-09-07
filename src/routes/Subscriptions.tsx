import { Box, Button, Flex, Loader, ScrollArea, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useState, useEffect, useRef } from "react";
import { getObject, setObject } from "../utils/localStorage";

type SetState = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {};

export default function Subscriptions({}: Props): JSX.Element {
  const [subs, setSubs] = useState([]);

 

  useEffect(() => {
    onInitialMount();
  }, []);

  const onInitialMount = async () => {
    // This setState causing rerender after initial. Idk but it looks bad.
    await getObject("@SUBS").then(async (subsLocalStorage) => {
      console.log(subsLocalStorage);
      setSubs(subsLocalStorage);
    });
  };
  //   const getSomething = async () => {
  //     await getObject("@SUBS").then(async (subs) => {
  //         console.log(subs)
  //     });
  //   };

  //   const setSomething = () => {
  //     setObject("@SUBS", ["@PotentialHistory", "@TheStoryOutWest", "@ShroudedHand"])
  //   }

  return (
    <Flex>
      {subs.length > 1 ? (
        <Text color="#FFFFFF" pt="50px">
          Subs here
        </Text>
      ) : (
        <Text color="#FFFFFF" pt="50px">
          No Subscriptions Found
        </Text>
      )}
    </Flex>
  );
}
