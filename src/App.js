import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Box } from '@chakra-ui/react';
import FrontendRoadmap from './Roadmaps/FrontendRoadmap';
import Loginpage from './pages/Loginpage';
import Navbar from './Components/Navbar';

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Navbar />
                <Box className='content'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/frontend' element={<FrontendRoadmap />} />
                        <Route path='/login' element={<Loginpage />} />
                    </Routes>
                </Box>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
