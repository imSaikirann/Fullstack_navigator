import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Input,
  Box,
  Spinner,
  SimpleGrid,
  Stack,
  Button,
  Image,
  Center,
  Heading,
  Text,
  Flex,
  Divider,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';

export default function DeveloperTools() {
  const [tools, setTools] = useState([]);
  const [inputTool, setInputTool] = useState('');
  const [filteredTools, setFilteredTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/devtools');
        setTools(response.data);
        setFilteredTools(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const results = tools.filter((tool) =>
      tool.toolname.toLowerCase().includes(inputTool.toLowerCase())
    );
    setFilteredTools(results);
  }, [inputTool, tools]);

  const handleChange = (value) => {
    setInputTool(value);
  };

  return (
    <Box className='home' padding={['0.5rem', '1rem']}>
      <Box p={['0.5rem', '1rem']}>
        <Input
          w={['100%', '500px']}
          h='45px'
          focusBorderColor='transparent'
          bgColor='#F0F2F3'
          placeholder='Search Tools..'
          value={inputTool}
          onChange={(e) => handleChange(e.target.value)}
        />
      </Box>
      <Center minH='100vh'>
        {loading ? (
          <Spinner size='lg' />
        ) : (
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={['1rem', '2rem']} px={['0.5rem', '1rem']}>
            {filteredTools.map((tool, index) => (
              <Card key={index} maxW='sm' padding={['0.5rem', '1rem']}>
                <CardBody>
                  <Flex justify='center'>
                    <Image
                      src={tool.image}
                      alt='Tool Icon'
                      borderRadius='lg'
                      h={['80px', '100px']}
                      objectFit='cover'
                      w={['80px', '100px']}
                    />
                  </Flex>
                  <Stack mt='6' spacing='3' h={['auto', '160px']} overflow='hidden'>
                    <Heading size='md' color='#1A191E'>
                      {tool.toolname}
                    </Heading>
                    <Text fontSize={['12px', '14px']} textOverflow='ellipsis'>
                      {tool.information}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing='2'>
                    <Button
                      variant='solid'
                      bgColor='#1A191E'
                      _hover={{ style: '#1A191E' }}
                      color='whiteAlpha.900'
                    >
                      <a href={tool.link}>Download</a>
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Center>
    </Box>
  );
}
