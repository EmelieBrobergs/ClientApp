import { ThemeProvider } from '@mui/material/styles';
import React, { Suspense } from 'react';
import { Monkey } from './components/basicRouting/monkey';
import customeStyles from "./components/theme/customStyle";

const Layout = React.lazy(
  () => import(/* webpackChunkName: "layout" */ "./components/basicRouting/layout")
);

function App() {
  return (
    <Suspense fallback={<Monkey />}>
    <ThemeProvider theme={customeStyles.theme}>
      <Layout />
    </ThemeProvider>
  </Suspense>
  );
}

export default App;
