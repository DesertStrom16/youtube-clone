class Video {
  title: string;
  channel: string;
  viewCount: string;
  uploadDate: string;
  videoId: string;
  thumbnailUrl: string;
  avatarUrl: string;
  length: string;

  constructor(
    title: string,
    channel: string,
    viewCount: string,
    uploadDate: string,
    videoId: string,
    thumbnailUrl: string,
    avatarUrl: string,
    length: string
  ) {
    this.title = title;
    this.channel = channel;
    this.viewCount = viewCount;
    this.uploadDate = uploadDate;
    this.videoId = videoId;
    this.thumbnailUrl = thumbnailUrl;
    this.avatarUrl = avatarUrl;
    this.length = length;
  }
}

export default Video;
