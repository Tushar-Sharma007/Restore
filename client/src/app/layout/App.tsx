import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
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
  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  },[]);

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
        <Catalog products = {products}/>
      </Container>
    </Box>
      
    </ThemeProvider>
  )
}

export default App
