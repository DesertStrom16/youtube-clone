export const serverUrl =
  process.env.NODE_ENV === "development"
    ? window.navigator.platform === "iPhone"
      ? "http://192.168.68.79:8000/"
      : "http://localhost:8000/"
    : "https://avalanche.herokuapp.com/";

const disableImages = true;
export const areImagesDisabled =
  process.env.NODE_ENV === "development" ? disableImages : false;
