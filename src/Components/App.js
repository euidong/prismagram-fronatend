import React from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import {ThemeProvider} from "styled-components";
import Theme from "../Styles/Theme";
import Router from './Router';
import { gql } from "apollo-boost";
import { useQuery } from 'react-apollo-hooks';

const QUERY = gql`
  {
  isLoggedIn @client
  }
`

export default () => {
  const { data: { isLoggedIn } } = useQuery(QUERY);
  console.log(isLoggedIn);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router isLoggedIn={isLoggedIn} />
      </>
    </ThemeProvider>
  )
}