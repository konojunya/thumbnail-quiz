import type {Artist} from '../../../../types/model';
import {
  Box,
  UnorderedList,
  ListItem,
  Stack,
  Text,
  Link as Anchor,
} from '@chakra-ui/react';
import Link from 'next/link';

interface Props {
  artists: Artist[];
}

export const Top: React.FC<Props> = ({artists}) => {
  return (
    <Stack gap={16}>
      <Text fontSize="3xl" fontWeight="bold">
        Answer the correct answer from the 4 thumbnail images! How much do you
        know? :p
      </Text>

      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          Artist List
        </Text>
        <UnorderedList>
          {artists.map(artist => (
            <ListItem key={artist.id}>
              <Link href={`/${artist.id}/`}>
                <Anchor>
                  <Text fontSize="large">{artist.name}</Text>
                </Anchor>
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Stack>
  );
};
