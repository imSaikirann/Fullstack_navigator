import React, { useContext, useState } from 'react';
import { Button, Flex, Box, Tooltip, Popover, PopoverTrigger, Center, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import Data from '../Data/FrrontendBasic.json'
import ResourcePage from '../components/ResourcePage';
import { AppContext } from '../Context/AppContext';
import { Link } from 'react-router-dom';

export default function BasicFrontend() {
    const { selectedLang,setSelectedLang } = useContext(AppContext)
    const handleData = (data)=>{
        setSelectedLang(data)
        console.log(data)
    }
  return (
    <Center height="100vh">
    <Box align="center">
      <Flex direction="column" align="center" maxW="500px" m="0 auto">
        <Button as ={Link} to ="/rp" mb={2} onClick={()=>handleData(Data.languages[0])}>{Data.languages[0].name}</Button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="35" height="35" fill="#232326" mb={2}>
          <path d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z" />
        </svg>
        <Button as ={Link} to ="/rp" mb={2} onClick={()=>handleData(Data.languages[1])} >{Data.languages[1].name}</Button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="35" height="35" fill="#232326" mb={2}>
          <path d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z" />
        </svg>
        <Button>Javascipt</Button>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="35" height="35" fill="black">
          <path d="M8.5 15.5h-1V.5h1z" style={{ fillRule: 'evenodd' }} />
        </svg>
        <Button colorScheme="blue" width="75px" mb={2}>
          Git
        </Button>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="35" height="35" fill="black">
          <path d="M8.5 15.5h-1V.5h1z" style={{ fillRule: 'evenodd' }} />
        </svg>
     
        <Popover placement="left-start">
          <PopoverTrigger>
        
            <Button width="200px">JavaScript Frameworks</Button>
   
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton color="white" />
            <PopoverHeader bgColor="blackAlpha.900" color="whiteAlpha.900" borderRadius="5px">Frameworks List</PopoverHeader>
            <PopoverBody bgColor="black" borderRadius="5px">
              <Flex direction="column">
                <Button mb={2}>React</Button>
                <Button mb={2}>Angular</Button>
                <Button mb={2}>Vue</Button>
                
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="35" height="35" fill="#232326" mb={2}>
          <path d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z" />
        </svg>
        <Button mb={2}>React</Button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="35" height="35" fill="#232326" mb={2}>
          <path d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z" />
        </svg>

        <Button width="200px">Building projects</Button>
      </Flex>
    </Box>
    </Center>
  );
}
