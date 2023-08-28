import React, { useEffect, useContext, useState } from 'react';
import {
  Box,
  Progress,
  Button,
  Checkbox,
  Flex,
  Text,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { Spinner } from '@chakra-ui/react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import {DownIcon} from './svgs/Svg.jsx'


export default function FrontendRoadmap() { 
  const { setResource,setRoute} = useContext(UserContext);
  const{ userData,setUserData} = useContext(AuthContext)   
  const [selectedCourse, setSelectedCourse] = useState([]); 
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const timestamp = Date.now();
        const res = await axios.get(`/api/detailedFrontend?timestamp:{timestamp}`)
        setSelectedCourse(res.data); // Update selectedCourse with fetched data
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } 

    fetchData();
  }, []);

  const isCourseCompleted = (courseName) => {
    return userData?.Data?.completedLanguages?.includes(courseName) || false;
  };

  const handleCheckboxChange = async (course) => {
    try {
      const updatedCompletedLanguages = [...userData.Data.completedLanguages];

      if (isCourseCompleted(course.name)) {
        const index = updatedCompletedLanguages.indexOf(course.name);
        if (index !== -1) {
          updatedCompletedLanguages.splice(index, 1);
        }
      } else {
        updatedCompletedLanguages.push(course.name);
      }

      const updatedUserData = {
        ...userData,
        Data: {
          ...userData.Data,
          completedLanguages: updatedCompletedLanguages,
        },
      };

      setUserData(updatedUserData);

      await axios.patch(`/api/updateCheckbox/${userData.user._id}`, {
        completedLanguages: updatedCompletedLanguages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleResouce = (course) => {
    console.log(course)
    setResource(course);
  };

  const handleNavigate=()=>{
    navigate('/login')
    setRoute('/frontend')
    
  }

  const progressValue = ((userData?.Data?.completedLanguages.length) / 25) * 100 || 0;

  return (
    <>
      <Flex>
        <Box width="50%" padding="1rem 2rem">
          <Text fontSize="xl" fontWeight="bold">
            Frontend Roadmap
          </Text>
        </Box>
        <Box width="50%" padding="1rem 1rem">
          <Progress
            borderRadius="10px"
            colorScheme="purple"
            transition="width 0.3 ease-in-out"
            h="20px"
            value={progressValue}
          />
        </Box>
      </Flex>

      <Center>
        <Box
          className="home"
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="100vh"
          padding="2rem"
          width="90%"
          borderRadius="10px"
          textAlign="center"
        >
          {isLoading ? (
           <Box mt="4" display="flex" justifyContent="center" alignItems="center" height="100%">
           <Spinner size="md" colorScheme='blue'/>
         </Box>
          ) : (
            <>
              <Flex direction="column" align="center">
                {selectedCourse.map((course, index) => (
                  <Box key={index}>
                    <Flex direction="column" align="center">
                      <Flex gap="2px">
                        <Checkbox
                          colorScheme="purple"

                          size="lg"
                          isChecked={isCourseCompleted(course.name)}
                          onChange={() => {
                            if (userData) {
                              handleCheckboxChange(course);
                            } else {
                              handleNavigate();
                            }
                          }}
                          
                        />
                       <Link to={`/frontend/${course.name}`} >
                       <Button size="md" bgColor='rgb(51, 60, 74)' w="175px" onClick={() => handleResouce(course)}>
                          <Text fontSize="small" color="white" fontFamily="sans-serif">
                            {course.name}
                          </Text>
                        </Button>
                       </Link>
                      </Flex>
                      <DownIcon/>

                    </Flex>
                  </Box>
                ))}
              </Flex>
            </>
          )}
        </Box>
      </Center>
    </>
  );
}
