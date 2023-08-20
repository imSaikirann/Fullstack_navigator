import React from 'react';
import { Box, Button, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import TypeWriter from '../Components/TypeWriter';

export default function Home() {
    return (
        <div className="home" >
            <TypeWriter/> 
            <Center h="100vh">
                <Box>
                    <Button as={Link} to='/detailedFrontend'>Frontend Roadmap</Button>
                </Box>
            </Center>
        </div>
    );
}
