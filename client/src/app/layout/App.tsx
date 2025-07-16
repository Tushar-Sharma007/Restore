import {useState} from "react";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode : paletteType,
      background : {
        default: paletteType === 'dark' ? '#121212' : '#eaeaea',
      }
    }
  })
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: darkMode ? '#121212' : '#eaeaea',
      py : 6
    }}>
      <Container maxWidth = 'xl' sx={{mt:8}}>
        <Outlet/>
      </Container>
    </Box>
      
    </ThemeProvider>
  )
}

export default App
