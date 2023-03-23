import { Box, Flex } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import useIsTouchscreen from "../hooks/use-is-touchscreen";
import VideoScreenInner from "./VideoScreenInner";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setActiveVideo } from "../store/dataSlice";

type Props = {};

export default function VideoScreen({}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const activeVideoId = useAppSelector((state) => state.data.activeVideoId);
  const isTouchScreen = useIsTouchscreen();
  const navigate = useNavigate();

  useEffect(() => {
    if (isTouchScreen) {
      dispatch(setActiveVideo({ activeVideoId: id, isRedirect: true }));
      navigate(`/`);
    }
  }, [isTouchScreen]);

  return <VideoScreenInner id={id} />;
}
