import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import DevTools from '../components/DevTools';

export default function Home() {
  return (
    <>
    <Flex height="100vh" align="center" justify="center">
      <Box>
        <Link to="/bf">
          <Button >Frontend Basic Roadmap</Button>
        </Link>
      </Box>
    </Flex>
    <Flex>
      <DevTools></DevTools>
    </Flex>
    </>
  );
}
