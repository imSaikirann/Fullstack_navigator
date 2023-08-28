import React from 'react';
import { Flex, Text,HStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


import { useLogout } from '../hooks/useLogout';


export default function Navbar() {
  const { userData } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const { logout } = useLogout()
  const handleLogout =() =>
  {
    logout()
  }
  const handleProfile=()=>{
    navigate('/profile')
  } 
    return (
        <Flex bgColor="#EBECF1" color="#222831"
        fontFamily="Raleway"
        boxShadow=" rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;" 
        height="65px" width="100%" position="fixed" alignItems="center" justify="space-between" zIndex={999}>
            <HStack  px={10}>
                <Link to="/">
                    <Text fontSize="1.8rem" t fontWeight="bold">
                        FSN
                    </Text>
                </Link>
                </HStack>
                <HStack align="center" gap="1.6rem">
                    <Link to="/about">
                        <Text fontSize="sm">About</Text>
                    </Link>
                    <Link to="/roadmaps">
                        <Text fontSize="sm">Roadmaps</Text>
                    </Link>
                    <Link to="/devtools">
                        <Text fontSize="sm">Developer Tools</Text>
                    </Link>
                </HStack>
             <HStack px={10} gap="2rem">
                {userData?(
                    <>
                   <Button colorScheme="gray" size="sm" borderRadius="20px" onClick={handleLogout}> <Text>Logout</Text></Button>
                  <Link to="/profile">
                  <Button colorScheme="gray" 
                   size="sm"
                    borderRadius="20px" 
                    onClick={handleProfile}>
                         <Text>Profile</Text></Button>
                  </Link>
                   </>
                ):
                (
                    <>   
                    <Link to="/login">  
                    <Text>Login</Text>
                </Link>
                <Link to="/Signup">
                   <Button colorScheme="gray" size="sm" borderRadius="0px"> <Text color="blackAlpha.900">Signup</Text></Button>
                </Link>
                </>
                )
                }
             </HStack>
        </Flex>
    );
}
