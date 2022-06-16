import {CheckIcon, CloseIcon, ExternalLinkIcon} from '@chakra-ui/icons';
import {Box, Button, Image, Stack, Text} from '@chakra-ui/react';
import {useCallback} from 'react';
import type {Artist} from '../../../../types/model';
import type {Quiz} from '../../../hooks/useQuiz';

interface Props {
  artist: Artist;
  quizList: Quiz[];
}

function scoreIcon(score: number) {
  if (score === 0) {
    return '\u{1F605}';
  }

  if (score < 2) {
    return '\u{1F600}';
  }

  if (score < 4) {
    return '\u{1F970}';
  }

  if (score < 6) {
    return '\u{1F973}';
  }

  if (score < 9) {
    return '\u{1F389}';
  }

  return '\u{1F451}';
}

export const Share: React.FC<Props> = ({artist, quizList}) => {
  const score = quizList.filter(quiz => quiz.answer === quiz.title).length;

  const handlePlayAgain = useCallback(() => {
    window.location.reload();
    window.scrollTo(0, 0);
  }, []);

  const handleShare = useCallback(() => {
    const data = {
      title: 'thumbnail quiz!',
      text: `Do you know about ${artist.name}?`,
      url: location.href,
    };

    navigator.share(data);
  }, [artist.name]);

  const handleTweet = useCallback(() => {
    const text = `Do you know about ${artist.name}? ${location.href}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, '_blank');
  }, [artist.name]);

  return (
    <Stack gap={16}>
      <Stack gap={8}>
        <Stack>
          <Text as="h1" fontSize="3xl" fontWeight="bold">
            {artist.name} QUIZ!
          </Text>

          <Text fontSize="2xl" fontWeight="bold">
            {score === 10 && (
              <Text fontSize="sm" fontWeight="bold">
                {`\\ Congratulations! You are ${artist.name}'s best friend! /`}
              </Text>
            )}
            Correct {score} / 10 {scoreIcon(score)}
          </Text>
        </Stack>

        {navigator.share == null ? (
          <Button
            rightIcon={<ExternalLinkIcon />}
            colorScheme="blue"
            onClick={handleTweet}
          >
            Twitter Share
          </Button>
        ) : (
          <Button
            rightIcon={<ExternalLinkIcon />}
            colorScheme="blue"
            onClick={handleShare}
          >
            Share
          </Button>
        )}

        <Stack gap={8}>
          {quizList.map((quiz, index) => (
            <Stack key={quiz.title}>
              <Text fontSize="sm">
                {quiz.answer === quiz.title ? (
                  <CheckIcon color="green.500" />
                ) : (
                  <CloseIcon color="red.500" />
                )}{' '}
                Question {index + 1}.
              </Text>
              <Text fontWeight="bold">
                Which is the thumbnail of「{quiz.title}」
              </Text>

              <Box paddingTop={8} />

              <Stack gap={8}>
                {quiz.selection.map(video => {
                  return (
                    <a
                      href={video.link}
                      target="_blank"
                      key={video.title}
                      rel="noreferrer"
                    >
                      <Stack key={video.title}>
                        <Image src={video.thumbnail} alt="" />
                        <Text fontWeight="bold">{video.title}</Text>
                      </Stack>
                    </a>
                  );
                })}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Button onClick={handlePlayAgain}>Play again</Button>

      <Box paddingBottom={16} />
    </Stack>
  );
};
