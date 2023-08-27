import React, { useState } from 'react';
import { Box, Button, Input, Center } from '@chakra-ui/react';
import { useSignup } from '../hooks/useSignup'; 


export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

     const { signup } = useSignup();

    const handleSignup = async () => { 
        await signup(email, password);
    };

    return (
        <Box className='home'>
            <Center h="100vh">
                <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="#1A192F" border="none" color="white">
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} mb={3} />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} mb={3} />
                    <Button onClick={handleSignup} colorScheme="black">Signup</Button>
                </Box>
            </Center>
        </Box>
    );
}
