const fs = require("fs");
const path = require("path");

let latestEtag = null;

const CHANNEL_MAP = {
  "Flo Rida": "UCBRFlde39a2U4nAkmGqJwAQ",
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
    const channelTitle = item.snippet.channelTitle;
    const title = item.snippet.title;
    const thumbnail = item.snippet.thumbnails.high.url;

    return { channelTitle, title, thumbnail };
  });
}

function writeFile(data) {
  fs.writeFileSync(
    path.resolve(__dirname, "../app/contents/videos.json"),
    JSON.stringify(data, null, 2)
  );
}

const channels = Array.from(Object.keys(CHANNEL_MAP));
Promise.all(
  channels.map(async (artistName) => {
    const channelId = CHANNEL_MAP[artistName];

    return {
      artistName,
      channelId,
      videos: await fetchVideos(channelId),
    };
  })
).then(writeFile);
