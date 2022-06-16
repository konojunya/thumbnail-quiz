import {useEffect, useState} from 'react';
import type {Artist, Video} from '../../types/model';

export function shuffle<T>(array: T[]): T[] {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'test') return array;

  return array
    .map(a => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value);
}

function randomExtract(array: Video[], count: number): Video[] {
  const result: Video[] = [];

  while (result.length < count) {
    const index = Math.floor(Math.random() * array.length);
    const item = array[index];

    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  }

  return result;
}

export interface Quiz {
  title: string;
  selection: Video[];
  answer: string;
}

interface Return {
  quizList: Quiz[];
}

export function useQuiz(artist: Artist): Return {
  const [quizList, setQuiz] = useState<Quiz[]>([]);

  useEffect(() => {
    const quizVideoList = randomExtract(artist.videos, 10);

    const quizList = quizVideoList.map(video => {
      const otherVideo = [...artist.videos];
      const index = otherVideo.indexOf(video);
      otherVideo.splice(index, 1);

      return {
        title: video.title,
        selection: shuffle([video, ...randomExtract(otherVideo, 3)]),
        answer: '',
      };
    });

    setQuiz(quizList);
  }, [artist]);

  return {
    quizList,
  };
}
