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


export default function FrontendRoadmap() {
  const { setResource, setRoute } = useContext(UserContext);
  const { setProgress } = useContext(UserContext);

  const { userData, setUserData } = useContext(AuthContext)
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const timestamp = Date.now();
      const res = await axios.get(`/api/detailedFrontend?timestamp=${timestamp}`); 
      setSelectedCourse(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  // Update progress bar value
  const progressValue = Math.round(((userData?.Data?.completedLanguages.length) / 55) * 100) || 0;
  setProgress(progressValue); 

  const isCourseCompleted = (courseName) => {
    if (userData && userData.user && userData.user._id) {
      return userData.Data?.completedLanguages?.includes(courseName) || false;
    }
    return false;
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
      <Flex padding="1rem 2rem">
        <Box width="50%" >
          <Text fontSize="2rem" fontWeight="bold">
            Frontend Roadmap
          </Text>
        </Box>
        <Box width="50%" paddingTop="0.8rem" >
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box marginRight="10px">
              <Text>{progressValue}%</Text>
            </Box>
            <Box flexGrow={1}>
              <Progress
                borderRadius="10px"
                bgColor="#EDFDF5"
                transition="width 0.3s ease-in-out"
                h="20px"
                value={progressValue}
              />
            </Box>
          </Box>

        </Box>
      </Flex>

      <Center>
        <Box
          bgColor="#F0F2F3"
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
                {/*internet,html and css*/}
                {selectedCourse.slice(0, 3).map((course, index) => (
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
                        <Link to={`/frontend/${course.name}`} >
                          <Button size="md" px={9} py="1" bgColor='rgb(51, 60, 74)' _hover={{color:"#000000"}} w="160px" onClick={() => handleResouce(course)}>
                            <Text fontSize="0.9rem" color="white" fontFamily="sans-serif">
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

                {/*js*/}
                <Popover placement='right-end' offset={[20,45]} >
                  <PopoverTrigger>
                    <Box>
                      <Box gap="2px" w="130px" alignItems="center" >
                        <Button size="md" px={9} py="1" bgColor='rgb(51, 60, 74)' w="160px" marginLeft="0.2rem" >
                          <Text fontSize="small" color="white" fontFamily="sans-serif">
                            Javascript
                          </Text>
                        </Button>
                      </Box>
                      <Box marginLeft="55px">
                        <PlainIcon w="30px" h="40px" fontWeight="lighter" />
                      </Box>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent maxW = '290px' >
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Javascript</PopoverHeader>
                    <PopoverBody >
                      {selectedCourse.slice(3, 5).map((course, index) => (
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
                              <Link to={`/frontend/${course.name}`} >
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
                    <PopoverHeader>Code tracking,remote repositiories</PopoverHeader>
                    <PopoverBody>
                      {selectedCourse.slice(5, 7).map((course, index) => (
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

                {/*npm*/}
                {selectedCourse.slice(7, 8).map((course, index) => (
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
                        <Link to={`/frontend/${course.name}`} >
                          <Button size="md" px={9} py="1" bgColor='rgb(51, 60, 74)' w="160px" onClick={() => handleResouce(course)}>
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


                {/* js frameworks*/}
                <Popover placement='left-start' >
                  <PopoverTrigger>
                    <Box>
                      <Box gap="2px" w="130px" alignItems="center">
                        <Button size="md" bgColor='rgb(51, 60, 74)' w="160px" >
                          <Text fontSize="small" color="white" fontFamily="sans-serif" w="150px" >
                            JS Frameworks
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
                    <PopoverHeader>Learn any one Framework</PopoverHeader>
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
                {/* css framwroks*/}
                <Popover placement='left-start'>
                  <PopoverTrigger>
                    <Box>
                      <Box gap="2px" w="130px" alignItems="center">
                        <Button size="md" bgColor='rgb(51, 60, 74)' w="160px" >
                          <Text fontSize="small" color="white" fontFamily="sans-serif" w="150px" >
                            CSS Frameworks
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
                    <PopoverHeader>Learn any one Framework</PopoverHeader>
                    <PopoverBody>
                      {selectedCourse.slice(11, 14).map((course, index) => (
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

{selectedCourse.slice(14,15).map((course, index) => (
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
          <Button size="md" bgColor='rgb(51, 60, 74)' w="180px" onClick={() => handleResouce(course)}>
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
{/* version control-git & github */}
<Popover placement='left-start'>
  <PopoverTrigger>
    <Box>
      <Box gap="2px" w="130px" alignItems="center">
        <Button size="md" bgColor='rgb(51, 60, 74)' w="160px" >
          <Text fontSize="small" color="white" fontFamily="sans-serif" w="150px" >
            Server Side Rendering
          </Text>
        </Button>
      </Box>
    
    </Box>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Server side rendering</PopoverHeader>
    <PopoverBody>
      {selectedCourse.slice(15,16).map((course, index) => (
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


              </Flex>
            </>
          )}
        </Box>
      </Center >
    </>
  );
}
