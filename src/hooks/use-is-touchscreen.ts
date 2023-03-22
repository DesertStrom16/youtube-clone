import { useMediaQuery } from "@mantine/hooks";

const useIsTouchscreen = () => {
    const isTouchScreen = useMediaQuery("(pointer:coarse)");

    return isTouchScreen
}

export default useIsTouchscreen;