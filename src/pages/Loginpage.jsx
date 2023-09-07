// LoginPage.js
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
} from '@chakra-ui/react';
import { useLogin } from '../hooks/useLogin';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <Center h="100vh">
      <Box
        p={10}
        w="450px"
        padding="2rem 3rem"
        boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"
        borderRadius="md"
        bg="#FFFFFF"
        border="none"
        color="#000000"
      >
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <Center>
            <Text fontSize="1.6rem">Login</Text>
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
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button mt={4} w="100%" type="submit" colorScheme="teal">
            Login
          </Button>

          {error && (
            <Alert status="error" >
              <AlertIcon />
              {error}
            </Alert>
          )}
        </form>
      </Box>
    </Center>
  );
}
