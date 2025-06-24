import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Dashboard } from './pages/Dashboard';
import { Producers } from './pages/Producers';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f9fafb;
  }

  #root {
    min-height: 100vh;
  }
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/producers" element={<Producers />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;