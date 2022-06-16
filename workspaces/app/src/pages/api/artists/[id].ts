import type {NextApiRequest, NextApiResponse} from 'next';
import videos from '../../../contents/videos.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id;
    const artist = videos.find(video => video.id === id);

    if (artist == null) {
      res.status(404).send('artist not found');
      return;
    }

    res.status(200).json(artist);
  } catch (e) {
    console.error(e);

    res.status(500).json(e);
  }
};
