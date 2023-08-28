import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Box, Heading } from '@chakra-ui/react';

export default function TypeWriter() {
  const [text ] = useTypewriter({
    words: ['Roadmaps', 'Github Projects'],
    loop: {},
  });

  return (
    <Box width="80%"  textAlign="left" padding="4rem 2rem"   fontFamily="Raleway" >
      <Heading as="h3" size="xl" color="#333333"   fontFamily="fira sans" >
        Discover everything you need for your journey
        <br />
        at Full Stack Navigator With{' '}
        <Box as="span" color="#000000">
          {text}
        </Box>
        <Cursor cursorStyle="|" />
      </Heading>
    </Box>
  );
}
