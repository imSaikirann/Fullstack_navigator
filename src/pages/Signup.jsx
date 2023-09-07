import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const { signup, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      p={4}
      maxW="500px"
      m="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <VStack
        spacing={4}
        bgColor="#EDF0F5"
        padding="1.5rem"
        borderRadius="md"
        w="100%"
        maxW="400px"
        textAlign="center"
      >
        <Text fontSize="xl" fontWeight="bold">
          Signup
        </Text>

     

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              placeholder="Enter your email"
              bgColor="white"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
                bgColor="white"
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

          <Button colorScheme="teal" type="submit" width="100%" mt="2">
            Signup
          </Button>

          {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        </form>
      </VStack>
    </Box>
  );
};

export default Signup;
