import type {NextApiRequest, NextApiResponse} from 'next';
import videos from '../../../contents/videos.json';

export default (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const artists = videos.map(video => ({
      id: video.id,
      name: video.name,
    }));

    res.status(200).json(artists);
  } catch (e) {
    console.error(e);

    res.status(500).json(e);
  }
};
