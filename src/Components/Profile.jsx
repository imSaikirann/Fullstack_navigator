import React from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Box, Heading } from '@chakra-ui/react'; // Import Chakra UI components

export default function Profile() {
    const { userData } = React.useContext(AuthContext);
    console.log(userData)
    return (
        <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" className='home'> 
            {userData && (
                <Heading size="lg"> {/* Use Chakra UI Heading component */}
                    {userData.user.email}
                </Heading>
            )}
        </Box>
    );
}
