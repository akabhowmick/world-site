import "./styles/App.css";
import { GlobalStyle } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import Header from "./Components/Header/Header";
import SearchPage from "./Components/SearchPage/SearchPage";
import styled from "styled-components";
import CountryDetails from "./Components/CountryDetails/CountryDetails";
import { Routes, Route, Navigate } from "react-router-dom";
import { CountriesProvider } from "./Providers/CountriesProviders";

const Content = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 90px 1fr;
`;

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CountriesProvider>
        <GlobalStyle />
        <Content>
          <Header />
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="country/:name" element={<CountryDetails />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Content>
      </CountriesProvider>
    </ThemeProvider>
  );
};
