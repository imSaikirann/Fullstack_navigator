import React from 'react';
import { Box, Button, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import TypeWriter from '../Components/TypeWriter';
import { Card, CardBody, CardFooter, Stack, Heading, Text, VStack, Image,Flex } from '@chakra-ui/react'

export default function Home() {
    return (
        <VStack className="home" >
            <TypeWriter />
            <Center h="100vh">

                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    border='0px'
                    w="90%"
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
                                <Button border=" 1px solid #222831" color="#222831" variant='outline' as="a" href="https://youtu.be/WG5ikvJ2TKA?feature=shared">
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
                                <Button border=" 1px solid #222831" color="#222831" variant='outline' as="a" href="https://youtu.be/XBu54nfzxAQ?feature=shared">
                                    Watch on YouTube
                                </Button>
                                <Button bgColor='#222831' color="whiteAlpha.900" as={Link} to="/backend">
                                    Backend Roadmap
                                </Button>
                            </CardFooter>
                        </Stack>
                    </VStack>
                </Card>
                {/*Developer tools*/}

            </Center>

            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                w="90%"
                borderRadius="14px"

                padding="1rem"
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '39%' }}
                    src="tools.jpg"
                    alt='Caffe Latte'
                    borderRadius="14px"

                    boxShadow=" rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;"

                />

                <Stack >
                    <CardBody>
                        <Flex flexDirection="column" gap="2rem">
                            <Box>
                                <Heading fontSize="2rem">Developer Tools</Heading>

                                <Text py='5' fontSize="1.1rem">
                                    Step into our Developer Tools section, your hub for vital resources. Find tools that have been handpicked to make your full-stack development journey smoother. It doesn't matter if you love working on the front-end or prefer the back-end; our collection caters to all areas of development, ensuring you get a well-rounded learning experience.
                                </Text>
                                <Text fontFamily="Raleway" fontSize="1.2rem">Ready to Dive In?</Text>
                            </Box>
                            <Box>
                                <Link to="/developertools">
                                <Button   variant='solid' colorScheme='blue'>
                                    Explore Essential Tools
                                </Button>
                                </Link>
                              
                            </Box>
                        </Flex>
                    </CardBody>

                </Stack>
            </Card>

        </VStack>
    );
}
