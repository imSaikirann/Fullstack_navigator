import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  Input,
  Center,
  CardBody,
  CardFooter,
  Box,
  Image,
  Button,
  Divider,
  Heading,
  Text,
  Stack,
  ButtonGroup,
  Spinner,
  Flex,
  SimpleGrid,
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
        setFilteredTools(response.data)
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
    <Box className='home' padding='1rem'>
      <Box p='1rem'>
        <Input
          w='500px'
          h='45px'
          focusBorderColor='transparent'
          bgColor='#C5CCD3'
          placeholder='Search Tools..'
          value={inputTool}
          onChange={(e) => handleChange(e.target.value)}
        />
      </Box>
      <Center minH='100vh'>
        {loading ? (
          <Spinner size='lg' />
        ) : (
          <SimpleGrid columns={4} spacing={4} px='1rem'>
            {filteredTools.map((tool, index) => (
              <Card key={index} maxW='sm' padding='1rem'>
                <CardBody>
                  <Flex justify='center'>
                    <Image
                      src={tool.image}
                      alt='Tool Icon'
                      borderRadius='lg'
                      h='50%'
                      objectFit='cover'
                      w='50%'
                    /> 
                  </Flex>
                  <Stack mt='6' 
                  spacing='3'
                   h='160px'
                    overflow='hidden'>
                    <Heading size='md'>{tool.toolname}</Heading>
                    <Text 
                    fontSize="14px"
                    textOverflow='ellipsis'>{tool.information}</Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
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
