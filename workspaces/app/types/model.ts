export interface Video {
  title: string;
  thumbnail: string;
}

export interface Artist {
  id: string;
  name: string;
  channelId: string;
  videos: Video[];
}
