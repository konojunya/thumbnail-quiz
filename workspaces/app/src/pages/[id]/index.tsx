import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {useState} from 'react';
import type {Artist} from '../../../types/model';
import {ArtistDetail} from '../../components/pages/ArtistDetail';
import {Share} from '../../components/pages/Share';
import {Quiz} from '../../hooks/useQuiz';

interface Props {
  artist: Artist;
}

const ArtistDetailPage: NextPage<Props> = ({artist}) => {
  const [quizList, setQuizList] = useState<Quiz[] | null>(null);

  if (quizList == null) {
    return <ArtistDetail artist={artist} onSubmit={setQuizList} />;
  }

  return <Share artist={artist} quizList={quizList} />;
};

export const getStaticProps: GetStaticProps<Props> = async ctx => {
  const {default: artists} = await import('../../contents/videos.json');
  const id = ctx.params?.id;
  const artist = artists.find(artist => artist.id === id);

  if (artist == null) {
    return {notFound: true};
  }

  return {
    props: {
      artist,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const {default: artists} = await import('../../contents/videos.json');
  const paths = artists.map(artist => ({params: {id: artist.id}}));

  return {
    fallback: false,
    paths,
  };
};

export default ArtistDetailPage;
