import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { toggleDarkMode } from "./darkModeSlice";

function App() {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const dispatch = useDispatch();
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode : paletteType,
      background : {
        default: paletteType === 'dark' ? '#121212' : '#eaeaea',
      }
    }
  })
  

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <NavBar darkMode={darkMode} toggleDarkMode={handleToggleDarkMode}/>
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
