import React, {useContext} from 'react';
import './App.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'; // Import extendTheme
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
import { AuthContext } from './Context/AuthContext';

// Define your custom theme using extendTheme
const theme = extendTheme({
  // Customize your theme properties here
  // For example: 
  colors: {
    primary: '#FF5733',
    secondary: '#4CAF50',
    btn:"#434343"
  },
  fonts: {
    body: 'Raleway, sans-serif',
    heading: 'Raleway, sans-serif',
    // Add more font styles if needed
  },
});

function App() {
const {userData} = useContext(AuthContext)

  const { resource } = React.useContext(UserContext);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Box className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/frontend' element={<FrontendRoadmap />} />
            <Route path='/login' element={<Loginpage />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path={`/frontend/${resource && resource.name}`} element={<Resource />} />
            <Route path='/profile' element={userData ? <Profile/> : <Loginpage/>}></Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
