const fs = require("fs");
const path = require("path");

let latestEtag = null;

const CHANNEL_MAP = {
  florida: {
    channelId: "UCBRFlde39a2U4nAkmGqJwAQ",
    name: "Flo Rida",
  },
};

async function fetchVideos(id) {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.append("key", process.env.YOUTUBE_API_KEY);
  url.searchParams.append("channelId", id);
  url.searchParams.append("part", "snippet, id");
  url.searchParams.append("order", "date");
  url.searchParams.append("maxResults", "40");

  if (latestEtag != null) {
    url.searchParams.append("etag", latestEtag);
  }

  const response = await fetch(url.toString());
  const data = await response.json();

  latestEtag = data.etag;

  return data.items.map((item) => {
    const title = item.snippet.title;
    const thumbnail = item.snippet.thumbnails.high.url;
    const link = `https://youtube.com/watch?v=${item.id.videoId}`;

    return { title, thumbnail, link };
  });
}

function writeFile(data) {
  fs.writeFileSync(
    path.resolve(__dirname, "../app/src/contents/videos.json"),
    JSON.stringify(data)
  );
}

const channels = Array.from(Object.keys(CHANNEL_MAP));
Promise.all(
  channels.map(async (id) => {
    const channel = CHANNEL_MAP[id];

    return {
      id,
      name: channel.name,
      channelId: channel.channelId,
      videos: await fetchVideos(channel.channelId),
    };
  })
).then(writeFile);
