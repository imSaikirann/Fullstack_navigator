import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <Box bg="blue.800" py={4} px={8} color="white" width="100%" marginBottom="30px">
      <Flex align="center" justify="space-between">
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold">
            LOGO
          </Text>
        </Link>

        <Flex as="nav" align="center">
          <Link to="/bf" px={4}>
            Roadmap
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
