import React, { useContext, useState } from 'react';
import {
  Image,
  Progress,
  Flex,
  Box,
  Text,
  HStack,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useLogout } from '../hooks/useLogout';
import { UserContext } from '../Context/UserContext';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { userData } = useContext(AuthContext);


  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  const handleProfile = () => {
    setIsDrawerOpen(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const progressValue = ((userData?.Data?.completedLanguages.length) / 40) * 100 || 0;
  const bprogressValue = ((userData?.Data?.bcompletedLanguages.length) / 40) * 100 || 0;

  

  return (
    <Flex
      bgColor="#F4F6F6"
      color="#222831"
      fontFamily="Raleway"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;"
      height="65px"
      width="100%"
      position="fixed"
      alignItems="center"
      justify="space-between"
      zIndex={999}
    >
      <HStack px={14} gap="1rem">
        <Link to="/">
          <Image w="90px" h="90px" src="Untitled_design_7_-removebg-preview.png" alt="Logo"></Image>
        </Link>
      </HStack>
      <HStack align="center" gap="1.6rem">
        <Link to="/about">
          <Text fontSize="sm">About</Text>
        </Link>
        <Link to="/developertools">
          <Text fontSize="sm">Developer Tools</Text>
        </Link>
        {userData ? (
          <>
            <Button colorScheme="blue" size="sm" onClick={handleProfile} marginRight="1rem">
              <Text>Profile</Text>
            </Button>
            <Drawer placement="right" onClose={onCloseDrawer} isOpen={isDrawerOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Hello {userData.user.email}</DrawerHeader>
                <DrawerBody>
                  <Box
                    bgColor="gray.200"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="18px"
                    w="270px"
                    h="300px"
                  >
                    <Box>
                      <Text fontSize="1.3rem">Frontend Progress</Text>
                      <Progress h="15px" borderRadius="8px" value={progressValue} colorScheme="blue" />
                    </Box>
                    <Box>
                      <Text fontSize="1.3rem">Backend Progress</Text>
                      <Progress h="15px" borderRadius="8px" value={bprogressValue} colorScheme="blue" />
                    </Box>
                  </Box>
                </DrawerBody>
                <DrawerFooter>
                  <Button colorScheme="blue" size="sm" onClick={handleLogout}>
                    <Text>Logout</Text>
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer> 
          </>
        ) : (
          <>
            <Link to={userData ? '/' : '/login'}>
              <Text>Login</Text>
            </Link>
            <Link to="/Signup">
              <Button colorScheme="blue" size="sm" borderRadius="9px" marignRight="1.5rem">
                <Text >Signup</Text>
              </Button>
            </Link>
          </>
        )}
      </HStack>
    </Flex>
  );
}
