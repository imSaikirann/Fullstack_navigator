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
  Stack,
  MenuItem,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useLogout } from '../hooks/useLogout';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { userData } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const progressValue = Math.round(((userData?.Data?.completedLanguages.length) / 55) * 100) || 0;
  const bprogressValue = Math.round(((userData?.Data?.bcompletedLanguages.length) / 40) * 100) || 0;

  const isMobile = window.innerWidth <= 768;

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close the mobile drawer
  const closeMobileDrawer = () => {
    setIsMobileMenuOpen(false);
  };

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
      <HStack px={isMobile ? '14px' : '40px'} gap="1rem">
        <Link to="/">
          <Image w="90px" h="90px" src="Untitled_design_7_-removebg-preview.png" alt="Logo" />
        </Link>
      </HStack>
      <HStack align={isMobile ? 'center' : 'flex-end'} gap="1.6rem">
        {isMobile ? (
          <Box onClick={handleMenuClick} style={{ cursor: 'pointer' }} marginRight="1rem">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                style={{ width: '20px', height: '3px', backgroundColor: '#1A191E', marginBottom: '4px' }}
              />
            ))}
          </Box>
        ) : (
          <HStack spacing="1rem">
            <Menu>
              <MenuButton variant="outline" size="sm" marginRight="1rem">
                Roadmaps
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to="/frontend">Frontend</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/backend">Backend</Link>
                </MenuItem>
              </MenuList>
            </Menu>
            <Link to="/developertools">
              <Text fontSize="1rem" fontFamily="Raleway">
                Developer Tools
              </Text>
            </Link>
          </HStack>
        )}
        {!isMobile && userData ? (
          <>
            <Button colorScheme="blue" size="sm" onClick={handleProfile} marginRight="1rem">
              <Text>Profile</Text>
            </Button>
            <Drawer placement="right" onClose={onCloseDrawer} isOpen={isDrawerOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader fontStyle="Raleway">
                  Hello {userData.user.email.split('@')[0]} &#x1F680;
                </DrawerHeader>
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
                        <Progress h="15px" borderRadius="8px" value={progressValue} colorScheme="blue" />
                      </Box>
                      <Text ml="1rem" fontWeight="bold">{progressValue}%</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Box flex="1">
                        <Text fontSize="1.2rem" fontFamily="Raleway">
                          Backend Progress
                        </Text>
                        <Progress h="15px" borderRadius="8px" value={bprogressValue} colorScheme="blue" />
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
          !isMobile && (
            <>
              <Link to="/login">
                <Text fontSize="1rem" fontWeight="bold">
                  Login
                </Text>
              </Link>
              <HStack marginRight="1rem">
                <Link to="/signup">
                  <Button bg="#1A191E" size="sm" borderRadius="14px">
                    <Text fontSize="15px" color="#FFFFFF" borderRadius="10px">
                      Signup
                    </Text>
                  </Button>
                </Link>
              </HStack>
            </>
          )
        )}
      </HStack>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <Drawer placement="right" onClose={closeMobileDrawer} isOpen={isMobileMenuOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <Stack spacing="1rem" padding="1rem">
              <ChakraLink as={Link} to="/frontend" onClick={closeMobileDrawer}>
                <Text fontSize="1rem" fontFamily="Raleway">
                  Frontend
                </Text>
              </ChakraLink>
              <ChakraLink as={Link} to="/backend" onClick={closeMobileDrawer}>
                <Text fontSize="1rem" fontFamily="Raleway">
                  Backend
                </Text>
              </ChakraLink>
              <ChakraLink as={Link} to="/developertools" onClick={closeMobileDrawer}>
                <Text fontSize="1rem" fontFamily="Raleway">
                  Developer Tools
                </Text>
              </ChakraLink>
              {!userData ? (
                <>
                  <ChakraLink as={Link} to="/login" onClick={closeMobileDrawer}>
                    <Text fontSize="1rem" fontFamily="Raleway">
                      Login
                    </Text>
                  </ChakraLink>
                  <Link to="/signup" >
                    <Button bg="#1A191E" w="100%" borderRadius="14px" onClick={closeMobileDrawer}>
                      <Text fontSize="15px" color="#FFFFFF" borderRadius="10px">
                        Signup
                      </Text>
                    </Button>
                  </Link>
                </>
              ) : (
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
                      <Progress h="15px" borderRadius="8px" value={progressValue} colorScheme="blue" />
                    </Box>
                    <Text ml="1rem" fontWeight="bold">{progressValue}%</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Box flex="1">
                      <Text fontSize="1.2rem" fontFamily="Raleway">
                        Backend Progress
                      </Text>
                      <Progress h="15px" borderRadius="8px" value={bprogressValue} colorScheme="blue" />
                    </Box>
                    <Text ml="1rem" fontWeight="bold">{bprogressValue}%</Text>
                  </Flex>
                </Box>
              )}
              {userData ? (
                <Button colorScheme="blue" size="sm" onClick={handleLogout} >
                  <Text>Logout</Text>
                </Button>
              ) : (
                null
              )}
            </Stack>
          </DrawerContent>
        </Drawer>
      )}
    </Flex>
  );
}
