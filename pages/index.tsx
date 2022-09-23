import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '../components/Layouts';
import styled from '@emotion/styled';
import BasicExample from '../examples/BasicExample';

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Head>
        <title>react-frame-table</title>
        <meta name='description' content='Index' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <div>
          <h1>Basic</h1>
          <BasicExample />
        </div>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 20px;
`;

export default Home;
