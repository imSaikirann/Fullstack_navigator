import React from 'react';
import './App.css';
import { ChakraProvider} from '@chakra-ui/react'; // Import extendTheme
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Box } from '@chakra-ui/react';
import FrontendRoadmap from './Roadmaps/FrontendRoadmap';
import Loginpage from './pages/Loginpage';
import Navbar from './Components/Navbar';
import Signup from './pages/Signup';
import Resource from './pages/Resource'
import { UserContext } from './Context/UserContext';
import DeveloperTools from './pages/DeveloperTools';
import BackendRoadmap from './Roadmaps/BackendRoadmap'; 
import Bresource from './pages/Bresouce'


function App() {

  const { resource } = React.useContext(UserContext); 

  return (
    <ChakraProvider >
      <BrowserRouter>
        <Navbar />
        <Box className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/frontend' element={<FrontendRoadmap />} />
            <Route path='/backend' element={<BackendRoadmap />} />

            <Route path={`/backend/${resource && resource.name}`} element={<Bresource/>} />

            <Route path='/login' element={<Loginpage />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path={`/frontend/${resource && resource.name}`} element={<Resource />} />
            <Route path='/developertools' element={<DeveloperTools />} />

          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
