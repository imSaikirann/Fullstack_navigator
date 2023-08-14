import React from 'react';
import { Box, Button, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div class="home" >
            <Center h="100vh">
                <Box>
                    <Button as={Link} to='/frontend'>Frontend Roadmap</Button>
                </Box>
            </Center>
        </div>
    );
}
