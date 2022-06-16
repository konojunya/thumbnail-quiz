import {Grid, GridItem} from '@chakra-ui/react';
import styled from '@emotion/styled';

const Header = styled.header`
  padding: 8px;
  display: flex;
  height: 65px;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 240px;
  height: 40px;
`;

interface Props {
  children: React.ReactNode;
}

export const CommonLayout: React.FC<Props> = ({children}) => {
  return (
    <Grid h="100vh" templateRows="65px 1fr">
      <GridItem rowSpan={1} as="header">
        <Header>
          <Image src="/logo.png" alt="thumbnail quiz logo" />
        </Header>
      </GridItem>
      <GridItem rowSpan={1}>
        <Wrapper>{children}</Wrapper>
      </GridItem>
    </Grid>
  );
};
