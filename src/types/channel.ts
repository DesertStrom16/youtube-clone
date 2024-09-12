export type SubVideos = {
  title: string;
  viewCount: string;
  uploadDate: string;
  desc: string;
  videoId: string;
  thumbnailUrl: string;
  length: string;
};

export type GetSubs = {
  token: string;
  content: SubVideos[];
  channelInfo: {
    title: string;
    avatarThumbnail: { url: string; width: number; height: number };
  };
};

export type GetSubsTypeResponse = {
  key: string;
  client: any;
  content: GetSubs;
};
