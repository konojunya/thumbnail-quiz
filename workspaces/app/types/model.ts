export interface Video {
  title: string;
  thumbnail: string;
  link: string;
}

export interface Artist {
  id: string;
  name: string;
  channelId: string;
  videos: Video[];
}
