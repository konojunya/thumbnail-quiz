import type {Artist} from '../../../../types/model';
import {Link as Anchor, List, ListItem} from '@chakra-ui/react';
import Link from 'next/link';

interface Props {
  artists: Artist[];
}

export const Top: React.FC<Props> = ({artists}) => {
  return (
    <List>
      {artists.map(artist => (
        <ListItem key={artist.id}>
          <Link href={`/${artist.id}`}>
            <Anchor>{artist.name}</Anchor>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
