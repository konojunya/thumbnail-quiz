import type {Artist} from '../../../../types/model';
import {
  Image,
  Text,
  Grid,
  GridItem,
  Stack,
  Button,
  Box,
} from '@chakra-ui/react';
import {Quiz, useQuiz} from '../../../hooks/useQuiz';
import {useFormik} from 'formik';
import React, {useCallback, useEffect} from 'react';
import styled from '@emotion/styled';

const ShadowInput = styled.input`
  padding: 0;
  margin: 0;
  position: absolute;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
`;

interface Props {
  artist: Artist;
  onSubmit: (quiz: Quiz[]) => void;
}

export const ArtistDetail: React.FC<Props> = ({artist, onSubmit}) => {
  const {quizList} = useQuiz(artist);
  const formik = useFormik<{quizList: Quiz[]}>({
    initialValues: {
      quizList: [],
    },
    onSubmit: value => {
      window.scrollTo(0, 0);
      onSubmit(value.quizList);
    },
  });

  const handleSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const index = Number(e.target.dataset.id);
      const value = e.target.value;

      formik.setFieldValue(`quizList[${index}].answer`, value);
    },
    [formik]
  );

  useEffect(() => {
    if (formik.values.quizList.length === 0) {
      formik.setFieldValue('quizList', quizList);
    }
  }, [formik, quizList]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={16}>
        <Stack>
          <Text as="h1" fontSize="3xl" fontWeight="bold">
            {artist.name} QUIZ!
          </Text>

          <Stack gap={8}>
            {formik.values.quizList.map((quiz, index) => (
              <Stack key={quiz.title}>
                <Text fontSize="sm">Question {index + 1}.</Text>
                <Text fontWeight="bold">
                  Which is the thumbnail of「{quiz.title}」
                </Text>
                <Grid templateRows="1fr 1fr" templateColumns="1fr 1fr">
                  {quiz.selection.map(video => {
                    return (
                      <GridItem
                        key={video.title}
                        rowSpan={1}
                        colSpan={1}
                        p={1}
                        borderRadius="sm"
                        bg={
                          quiz.answer === video.title ? 'orange.400' : 'white'
                        }
                      >
                        <Box as="label" cursor="pointer">
                          <ShadowInput
                            type="radio"
                            onChange={handleSelect}
                            value={video.title}
                            data-id={index}
                            checked={quiz.answer === video.title}
                          />
                          <Image src={video.thumbnail} alt="" />
                        </Box>
                      </GridItem>
                    );
                  })}
                </Grid>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Button colorScheme="orange" type="submit">
          Check!
        </Button>

        <Box paddingBottom={16} />
      </Stack>
    </form>
  );
};
