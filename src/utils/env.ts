export const serverUrl =
  process.env.NODE_ENV === "development"
    ? 'http://localhost:8000/'
    : 'https://blackbird.quest/';

const disableImages = true;
export const areImagesDisabled =
  process.env.NODE_ENV === "development" ? disableImages : false;
