import Video from "../models/video";
import { testData } from "./dummyData";

export const fetchVideos = async (): Promise<Video[]> => {
  await new Promise((r) => setTimeout(r, 5000));
  return testData;
};
