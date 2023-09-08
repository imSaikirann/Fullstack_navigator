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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useLogout } from '../hooks/useLogout';

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

  const progressValue =Math.round(((userData?.Data?.completedLanguages.length) / 55) * 100) || 0;
  const bprogressValue =Math.round (((userData?.Data?.bcompletedLanguages.length) / 40) * 100) || 0;

  return (
    <Flex
      bgColor="#FFFFFF"
      color="#222831"
      fontFamily="Raleway"
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
      <Box>
        <Menu>
          <MenuButton variant="outline" size="sm" marginRight="1rem">
            Roadmaps
          </MenuButton>
          <MenuList>
            <Link to="/frontend">
            <MenuItem>Frontend</MenuItem>
            </Link>
            <Link to="/backend">
            <MenuItem>Backend</MenuItem>
            </Link>

          
          </MenuList>
        </Menu>
      </Box>
        <Link to="/developertools">
          <Text fontSize="1rem" fontFamily="Raleway">Developer Tools</Text>
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
                <DrawerHeader fontStyle="Raleway">Hello {userData.user.email.split('@')[0]} &#x1F680; </DrawerHeader>


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
                  <Flex alignItems="center" mb="1rem">
  <Box flex="1">
    <Text fontSize="1.2rem" fontFamily="Raleway">
      Frontend Progress
    </Text>
    <Progress
      h="15px"
      borderRadius="8px"
      value={progressValue}
      colorScheme="blue"
    />
  </Box>
  <Text ml="1rem" fontWeight="bold">{progressValue}%</Text>
</Flex>

<Flex alignItems="center">
  <Box flex="1">
    <Text fontSize="1.2rem" fontFamily="Raleway">
      Backend Progress
    </Text>
    <Progress
      h="15px"
      borderRadius="8px"
      value={bprogressValue}
      colorScheme="blue"
    />
  </Box>
  <Text ml="1rem" fontWeight="bold">{bprogressValue}%</Text>
</Flex>

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
              <Text fontSize="1rem" fontWeight="bold">Login</Text>
            </Link>
            <HStack marginRight="1rem">
              <Link to="/signup">
                <Button bg="#1A191E" size="sm" borderRadius="14px">
                  <Text fontSize="15px" color="#FFFFFF" borderRadius="10px">Signup</Text>
                </Button>
              </Link>
            </HStack>
          </>
        )}
      </HStack>
    </Flex>
  );
}
