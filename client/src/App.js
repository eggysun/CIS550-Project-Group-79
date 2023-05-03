import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { indigo, amber, blue, cyan, lightBlue, red } from '@mui/material/colors'
import { createTheme } from "@mui/material/styles";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import BusinessPage from './pages/BusinessPage';
import LocationPage from './pages/LocationPage';
import ReservationPage from './pages/ReservationPage';
import FriendsPage from './pages/FriendsPage';

// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme
export const theme = createTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}