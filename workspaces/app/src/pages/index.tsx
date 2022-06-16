import type {GetStaticProps, NextPage} from 'next';
import type {Artist} from '../../types/model';
import {Top} from '../components/pages/Top';

interface Props {
  artists: Artist[];
}

const TopPage: NextPage<Props> = ({artists}) => {
  return <Top artists={artists} />;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const {default: artists} = await import('../contents/videos.json');

  return {
    props: {
      artists,
    },
  };
};

export default TopPage;
