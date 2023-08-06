
import './App.css';
import BasicFrontend from './Roadmaps/BasicFrontend';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Box } from '@chakra-ui/react';
import ResourcePage from './components/ResourcePage';
function App() {
  return (
    <ChakraProvider>

      <BrowserRouter>
    <Navbar></Navbar>
    <Box >
    <Routes>
        <Route path ='/' element={<Home/>}></Route>
        <Route path ='/bf' element={<BasicFrontend></BasicFrontend>}></Route>
        <Route path='/rp' element={<ResourcePage></ResourcePage>}></Route>
      </Routes>
    </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
