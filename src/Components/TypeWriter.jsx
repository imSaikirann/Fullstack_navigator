import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Box, Heading } from '@chakra-ui/react';

export default function TypeWriter() {
  const [text ] = useTypewriter({
    words: ['Roadmaps', 'Github Projects','Developer Tools'],
    loop: {},
  });

  return (
    <Box width="80%"  textAlign="left" padding="3rem 0.4rem"   fontFamily="Raleway" >
      <Heading as="h3" size="xl" color="#000000"   fontFamily="fira sans" >
        Discover everything you need for your journey
        <br />
        at Full Stack Navigator With{' '}
        <Box as="span" color="#1A191E">
          {text}
        </Box>
        <Cursor cursorStyle="|" />
      </Heading>
    </Box>
  );
}
