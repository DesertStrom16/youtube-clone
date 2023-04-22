export const serverUrl =
  process.env.NODE_ENV === "development"
    ? 'http://localhost:8000/'
    : 'https://avalanche-z8e3.onrender.com';

const disableImages = true;
export const areImagesDisabled =
  process.env.NODE_ENV === "development" ? disableImages : false;
