import React from 'react';
import { Flex, Text,HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <Flex bgColor="#1A192F" color="white" height="60px" width="100%" position="fixed" alignItems="center" justify="space-between" zIndex={999}>
            <HStack  px={10}>
                <Link to="/">
                    <Text fontSize="xl" fontWeight="bold">
                        FNS
                    </Text>
                </Link>
                </HStack>
                <HStack align="center" gap="1.6rem">
                    <Link to="/about">
                        <Text fontSize="sm">About</Text>
                    </Link>
                    <Link to="/roadmaps">
                        <Text fontSize="sm">Roadmaps</Text>
                    </Link>
                    <Link to="/devtools">
                        <Text fontSize="sm">Developer Tools</Text>
                    </Link>
                </HStack>
             <HStack px={10}>
             <Link to="/login">
                    <Text>Login</Text>
                </Link>
             </HStack>
        </Flex>
    );
}
