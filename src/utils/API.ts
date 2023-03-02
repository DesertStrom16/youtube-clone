import Video from "../models/video";
import { testData } from "./dummyData";

export const fetchVideos = async (): Promise<Video[]> => {
  await new Promise((r) => setTimeout(r, 500));
  return testData;
};
