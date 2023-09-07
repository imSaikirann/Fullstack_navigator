import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Center,
  FormControl,
  FormLabel,
  Text,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; 

import { useLogin } from '../hooks/useLogin';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const { login, error } = useLogin();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }; 
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <Center h="100vh">
      <Box
        p={10}
        w="450px"
        padding="1.5rem 2rem"
        boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"
        borderRadius="md"
        bg="#FFFFFF"
        border="none"
        color="#000000"
      >
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <Center>
            <Text fontSize="1.6rem"  fontWeight="bold" fontStyle="Raleway">Login</Text>
          </Center>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
            <Input
                type={showPassword ? "text" : "password"}
              
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
                 <InputRightElement>
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={togglePasswordVisibility}
                  variant="ghost"
                />
              </InputRightElement>
              </InputGroup>
          </FormControl>
          <Button mt={4} w="100%" type="submit" bgColor="#1A191E" _hover={{style:"#1A191E"} } color="whiteAlpha.900">
            Login
          </Button>

          {error && (
            <Alert status="error" mt="5">
              <AlertIcon />
              {error}
            </Alert>
          )}
        </form>
      </Box>
    </Center>
  );
}
