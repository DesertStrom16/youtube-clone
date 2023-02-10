class Video {
  title: string;
  channel: string;
  viewCount: string;
  uploadDate: string;
  videoUrl: string;
  thumbnailUrl: string;
  avatarUrl: string;
  channelUrl: string;

  constructor(
    title: string,
    channel: string,
    viewCount: string,
    uploadDate: string,
    videoUrl: string,
    thumbnailUrl: string,
    avatarUrl: string,
    channelUrl: string
  ) {
    this.title = title;
    this.channel = channel;
    this.viewCount = viewCount;
    this.uploadDate = uploadDate;
    this.videoUrl = videoUrl;
    this.thumbnailUrl = thumbnailUrl;
    this.avatarUrl = avatarUrl;
    this.channelUrl = channelUrl;
  }
}

export default Video;
