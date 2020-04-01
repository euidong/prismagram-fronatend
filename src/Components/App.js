import React from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import styled, {ThemeProvider} from "styled-components";
import Theme from "../Styles/Theme";
import Router from './Router';
import { gql } from "apollo-boost";
import { useQuery } from 'react-apollo-hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';


const QUERY = gql`
  {
  isLoggedIn @client
  }
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

export default () => {
  const { data: { isLoggedIn } } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <Wrapper>
        <GlobalStyles />
        <Router isLoggedIn={isLoggedIn} />
        <Footer />
        <ToastContainer positon={toast.POSITION.TOP_RIGHT}/>
      </Wrapper>
    </ThemeProvider>
  );
}