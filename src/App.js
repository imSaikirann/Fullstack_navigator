import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Box } from '@chakra-ui/react';
import FrontendRoadmap from './Roadmaps/FrontendRoadmap';
import Loginpage from './pages/Loginpage';
import Navbar from './Components/Navbar';
import Signup from './pages/Signup';
import Resource from './pages/Resource'
import { UserContext } from './Context/UserContext';
import Profile from './Components/Profile';

function App() {
  const { resource } = React.useContext(UserContext);

    return (
        <ChakraProvider>
            <BrowserRouter> 
                <Navbar />
                <Box className='content'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/frontend' element={<FrontendRoadmap />} />
                        <Route path='/login' element={<Loginpage />} />
                        <Route path='/Signup' element={<Signup />} />
                        <Route path={`/frontend/${resource && resource.name}`} element={<Resource />} />
                        <Route path='/profile' element={<Profile/>}></Route>


                    </Routes>
                </Box>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
