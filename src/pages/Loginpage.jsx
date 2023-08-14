import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Box, Button, Input, Center } from '@chakra-ui/react';
import { UserContext } from '../Context/UserContext';

export default function Loginpage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserData } = useContext(UserContext);

    const handleLogin = () => {
        axios.post('/api/user/login', { email, password })
            .then((response) => {
                console.log(response.data);
                setUserData(response.data);
            });
    };

    return (
        <Box className='home'>
        <Center h="100vh">
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="#1A192F" border="none" color="white">
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} mb={3} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} mb={3} />
                <Button onClick={handleLogin} colorScheme="blue">Login</Button>
            </Box>
        </Center>
        </Box>
    );
}
