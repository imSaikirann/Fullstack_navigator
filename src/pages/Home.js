import React from 'react';
import {  Button, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import TypeWriter from '../Components/TypeWriter';
import { Card,  CardBody, CardFooter, Stack, Heading, Text ,VStack} from '@chakra-ui/react'

export default function Home() {
    return (
        <div className="home" >
            <TypeWriter />
            <Center h="100vh">

                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    background="#EBECF1"
                    w="95%"
                    boxShadow=" rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;"
                    borderRadius="14px"
                    
                >
                    <VStack gap="2rem">
                    <Stack gap="2rem">
                        <CardBody>
                            <Heading size='lg' >Frontend</Heading>

                            <Text py="2" fontSize="1.2rem">
                            The frontend is what users directly interact with on a digital platform. It involves designing and structuring the visual elements, like layout and buttons, that users engage with. Frontend developers use various technologies to bring these designs to life and ensure everything looks and works as intended. It's the part of a website or app that users see and navigate, making it a crucial aspect of the overall user experience.
                            </Text>
                        </CardBody>

                        <CardFooter gap="1rem">
                            <Button  border=" 1px solid #222831" color="#222831" variant ='outline' as="a" href="https://youtu.be/WG5ikvJ2TKA?feature=shared">
                            Watch on YouTube
                            </Button>
                            <Button bgColor='#222831' color="whiteAlpha.900" as={Link} to="/frontend">
                                Frontend Roadmap
                            </Button>
                        </CardFooter>
                        </Stack>
                        <Stack>
                        <CardBody>
                            <Heading size='lg'>Backend</Heading>

                            <Text py='2' fontSize="1.2rem">
                            The backend is the engine behind the scenes, managing data storage, processing, and communication. It creates APIs, handles requests, and ensures data security, supporting the frontend's user-facing experience. As the application's backbone, the backend's efficiency and functionality drive seamless interactions and data management.
                            </Text>
                        </CardBody>

                        <CardFooter gap="1rem">
                            <Button  border=" 1px solid #222831" color="#222831" variant ='outline' as="a" href="https://youtu.be/XBu54nfzxAQ?feature=shared">
                            Watch on YouTube
                            </Button>
                            <Button bgColor='#222831' color="whiteAlpha.900"  as={Link} to="/backend">
                                Backend Roadmap
                            </Button>
                        </CardFooter>
                    </Stack>
                    </VStack>
                </Card>

            </Center>
        </div>
    );
}
