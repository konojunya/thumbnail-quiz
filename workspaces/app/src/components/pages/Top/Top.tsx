import type {Artist} from '../../../../types/model';

interface Props {
  artists: Artist[];
}

export const Top: React.FC<Props> = ({artists}) => {
  return (
    <ul>
      {artists.map(artist => (
        <li key={artist.id}>{artist.name}</li>
      ))}
    </ul>
  );
};
