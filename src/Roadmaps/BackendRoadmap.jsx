import React, { useEffect, useContext, useState } from 'react';
import {
  Box,
  Progress,
  Button,
  Checkbox,
  Flex,
  Text,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons'
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { Spinner } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { PlainIcon } from './svgs/Svg.jsx'


export default function BackendRoadmap() {
  const { setResource, setRoute } = useContext(UserContext);
  const { setProgress } = useContext(UserContext);

  const { userData, setUserData } = useContext(AuthContext)
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate()

  //fetching roamdmap
  const fetchData = async () => {
    try {
      const timestamp = Date.now();
      const res = await axios.get(`/api/backendRoadmap?timestamp=${timestamp}`);
      setSelectedCourse(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Check if the user is logged in and fetch data
  useEffect(() => {
    fetchData();
  });

  // Update progress bar value
  const progressValue = ((userData?.Data?.bcompletedLanguages.length) / 40) * 100 || 0;
  setProgress(progressValue); // Update the context value

  const isCourseCompleted = (courseName) => {
    // Check if userData exists and has a user property
    if (userData && userData.user && userData.user._id) {
      return userData.Data?.bcompletedLanguages?.includes(courseName) || false;
    }
    // Return false if userData or user._id is not defined
    return false;
  };


  const handleCheckboxChange = async (course) => {
    try {
      const updatedCompletedLanguages = [...userData.Data.bcompletedLanguages];

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
          bcompletedLanguages: updatedCompletedLanguages,
        },
      };
      setUserData(updatedUserData);

      await axios.patch(`/api/updateCheckbox/${userData.user._id}`, {
        bcompletedLanguages: updatedCompletedLanguages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Resource
  const handleResouce = (course) => {
    console.log(course)
    setResource(course);
    localStorage.setItem('resource', JSON.stringify(course)) 
  };

  //Navigating
  const handleNavigate = () => {
    navigate('/login')
    setRoute('/frontend')

  }
  return (
    <>
      <Flex>
        <Box width="50%" padding="1rem 3.9rem">
          <Text fontSize="2rem" fontWeight="bold">
            Backend Roadmap
          </Text>
        </Box>
        <Box width="50%" padding="1rem 1rem">
          <Progress
            borderRadius="10px"
            bgColor="#EDFDF5"

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
          height="1000px"
          padding="2rem" 
          width="90%"
          borderRadius="10px"
          textAlign="center"
        >
          {isLoading ? (
            <Box mt="4" display="flex" justifyContent="center" alignItems="center" height="50%">
              <Spinner size="md" colorScheme='blue' />
            </Box>
          ) : (
            <>
              <Flex direction="column" align="center">                          

                {/*js*/}
                <Popover placement='right-end' offset={[20,45]} >
                  <PopoverTrigger>
                    <Box>
                      <Box gap="2px" w="125px" alignItems="center" >
                        <Button size="md" bgColor='rgb(51, 60, 74)' w="150" marginLeft="0.2rem" >
                          <Text fontSize="small" color="white" fontFamily="sans-serif">
                            Learn a Language
                          </Text>
                        </Button>
                      </Box>
                      <Box marginLeft="12px">
        <ArrowDownIcon w="30px" h="40px" fontWeight="lighter" />
      </Box>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent maxW = '290px' >
                    <PopoverArrow />
                    <PopoverCloseButton />
                            Learn any one Language
                    <PopoverHeader></PopoverHeader>
                    <PopoverBody >
                      {selectedCourse.slice(0, 4).map((course, index) => (
                        <Box key={index} >
                          <Flex direction="column" align="center" >
                            <Box gap="10px" w="300px" alignItems="center" display="flex" flexDirection="row" justifyContent="center" >
                              <Checkbox
                                borderColor="#555555"
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
                              <Link to={`/backend/${course.name}`} >
                                <Button
                                  size="md"
                                  bg='rgb(51, 60, 74)'
                                  w="125px"
                                  marginTop="10px"
                                  onClick={() => handleResouce(course)}>
                                  <Text fontSize="small" color="white" fontFamily="sans-serif">
                                    {course.name}
                                  </Text>
                                </Button>
                              </Link>
                            </Box>
                          </Flex>
                        </Box>
                      ))}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                {/* version control-git & github */}
                <Popover placement='left-start'>
                  <PopoverTrigger>
                    <Box>
                      <Box gap="2px" w="130px" alignItems="center">
                        <Button size="md" bgColor='rgb(51, 60, 74)' w="160px" >
                          <Text fontSize="small" color="white" fontFamily="sans-serif" w="150px" >
                            Version Control system
                          </Text>
                        </Button>
                      </Box>
                      <Box marginLeft="55px">
                        <PlainIcon w="30px" h="40px" fontWeight="lighter" />
                      </Box>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent> 
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Version Control System</PopoverHeader>
                    <PopoverBody>
                      {selectedCourse.slice(4, 6).map((course, index) => (
                        <Box key={index}>
                          <Flex direction="column" align="center">
                            <Box gap="10px" w="300px" alignItems="center" display="flex" flexDirection="row" justifyContent="center" >
                              <Checkbox
                                borderColor="#555555"
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
                              <Link to={`/frontend/${course.name}`}>
                                <Button
                                  size="sm"
                                  bg='rgb(51, 60, 74)'
                                  onClick={() => handleResouce(course)}
                                  marginTop="10px"
                                >
                                  <Text fontSize="small" color="white" fontFamily="sans-serif" w="100px">
                                    {course.name}
                                  </Text>
                                </Button>
                              </Link>
                            </Box>
                          </Flex>
                        </Box>
                      ))}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>


                {/* js frameworks*/}
                <Popover placement='left-start' >
                  <PopoverTrigger>
                    <Box>
                      <Box gap="2px" w="130px" alignItems="center">
                        <Button size="md" bgColor='rgb(51, 60, 74)' w="160px" >
                          <Text fontSize="small" color="white" fontFamily="sans-serif" w="150px" >
                            Relational Database
                          </Text>
                        </Button>
                      </Box>
                      <Box marginLeft="12px">
                        <ArrowDownIcon w="30px" h="40px" fontWeight="lighter" />
                      </Box>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Database management Systems</PopoverHeader>
                    <PopoverBody>
                      {selectedCourse.slice(6, 8).map((course, index) => (
                        <Box key={index}>
                          <Flex direction="column" align="center">
                            <Box gap="10px" w="300px" alignItems="center" display="flex" flexDirection="row" justifyContent="center" >
                              <Checkbox
                                borderColor="#555555"
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
                              <Link to={`/frontend/${course.name}`}>
                                <Button
                                  size="sm"
                                  bg='rgb(51, 60, 74)'
                                  onClick={() => handleResouce(course)}
                                  marginTop="10px"
                                >
                                  <Text fontSize="small" color="white" fontFamily="sans-serif" w="100px">
                                    {course.name}
                                  </Text>
                                </Button>
                              </Link>
                            </Box>
                          </Flex>
                        </Box>
                      ))}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
                {/* css framwroks*/}
                <Popover placement='left-start'>
                  <PopoverTrigger>
                    <Box>
                      <Box gap="2px" w="130px" alignItems="center">
                        <Button size="md" bgColor='rgb(51, 60, 74)' w="160px" >
                          <Text fontSize="small" color="white" fontFamily="sans-serif" w="150px" >
                            NoSQL Database
                          </Text>
                        </Button>
                      </Box>
                      <Box marginLeft="12px">
                        <ArrowDownIcon w="30px" h="40px" fontWeight="lighter" />
                      </Box>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>NoSQL , Realtime , Distributed</PopoverHeader>
                    <PopoverBody>
                      {selectedCourse.slice(8, 11).map((course, index) => (
                        <Box key={index}>
                          <Flex direction="column" align="center">
                            <Box gap="10px" w="300px" alignItems="center" display="flex" flexDirection="row" justifyContent="center" >
                              <Checkbox
                                borderColor="#555555"
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
                              <Link to={`/frontend/${course.name}`}>
                                <Button
                                  size="sm"
                                  bg='rgb(51, 60, 74)'
                                  onClick={() => handleResouce(course)}
                                  marginTop="10px"
                                >
                                  <Text fontSize="small" color="white" fontFamily="sans-serif" w="100px">
                                    {course.name}
                                  </Text>
                                </Button>
                              </Link>
                            </Box>
                          </Flex>
                        </Box>
                      ))}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

{selectedCourse.slice(11,13).map((course, index) => (
  <Box key={index}>
    <Flex direction="column" align="center">
      <Box gap="10px" w="300px" alignItems="center" display="flex" flexDirection="row" justifyContent="center">
        <Checkbox
          borderColor="#555555"
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
        <Link to={`/frontend/${course.name}`}>
          <Button size="md" bgColor='rgb(51, 60, 74)' w="190px" onClick={() => handleResouce(course)}>
            <Text fontSize="small" color="white" fontFamily="sans-serif">
              {course.name}
            </Text>
          </Button>
        </Link>
      </Box>
      <Box marginLeft="12px">
        <ArrowDownIcon w="30px" h="40px" fontWeight="lighter" />
      </Box>
    </Flex>
  </Box>
))}
{selectedCourse.slice(13, 14).map((course, index) => (
  <Box key={index}>
    <Flex direction="column" align="center">
      <Box gap="10px" w="300px" alignItems="center" display="flex" flexDirection="row" justifyContent="center">
        <Checkbox
          borderColor="#555555"
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
        <Link to={`/frontend/${course.name}`}>
          <Button size="md" bgColor='rgb(51, 60, 74)' w="125px" onClick={() => handleResouce(course)}>
            <Text fontSize="small" color="white" fontFamily="sans-serif">
              {course.name}
            </Text>
          </Button>
        </Link>
      </Box>
      <Box marginLeft="12px">
        <ArrowDownIcon w="30px" h="40px" fontWeight="lighter" />
      </Box>
    </Flex>
  </Box>
))}

                  


              </Flex>
            </>
          )}
        </Box>
      </Center >
    </>
  );
}
