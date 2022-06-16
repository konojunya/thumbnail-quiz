import {Grid, GridItem} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import logo from '../../../../public/logo.png';

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

interface Props {
  children: React.ReactNode;
}

export const CommonLayout: React.FC<Props> = ({children}) => {
  return (
    <Grid h="100vh" templateRows="65px 1fr">
      <GridItem rowSpan={1} as="header">
        <Header>
          <Image
            src={logo}
            alt="thumbnail quiz logo"
            width={240}
            height={40}
            layout="fixed"
          />
        </Header>
      </GridItem>
      <GridItem rowSpan={1}>
        <Wrapper>{children}</Wrapper>
      </GridItem>
    </Grid>
  );
};
