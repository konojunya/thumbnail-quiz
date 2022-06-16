import axios from 'axios';
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
  const {data} = await axios.get<Artist[]>('http://localhost:5000/api/artists');

  return {
    props: {
      artists: data,
    },
  };
};

export default TopPage;
