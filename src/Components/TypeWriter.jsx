import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Box, Heading } from '@chakra-ui/react';

export default function TypeWriter() {
  const [text ] = useTypewriter({
    words: ['Roadmaps', 'Github Projects'],
    loop: {},
  });

  return (
    <Box width="80%"  textAlign="left" padding="2rem 1rem" >
      <Heading as="h2" size="lg" >
        Discover everything you need for your journey
        <br />
        at Full Stack Navigator With{' '}
        <Box as="span" color="purple">
          {text}
        </Box>
        <Cursor />
      </Heading>
    </Box>
  );
}
