import { useMediaQuery } from "@mantine/hooks";

// TODO
// Right now a touch screen mobile is simply pointer coarse, there are no size restrictions.
// In the future, add a size maximum for mobile devices...
// Then go back everywhere this hook is used and replace/add the styles for touchscreens that aren't mobile devices.

const useIsMobileDevice = () => {
  const isTouchScreen = useMediaQuery("(pointer:coarse)");

  return isTouchScreen;
};

export default useIsMobileDevice;
