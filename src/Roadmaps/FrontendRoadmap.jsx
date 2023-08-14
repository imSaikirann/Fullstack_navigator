import React, { useEffect, useContext, useState } from 'react';
import { Box, Button, Checkbox, Flex, Progress,  } from '@chakra-ui/react';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import {DownIcon} from '../Roadmaps/svgs/Svg'

export default function FrontendRoadmap() {
    const [selectedCourse, setCourse] = useState([]);
    const { userData, setUserData } = useContext(UserContext);

    useEffect(() => {
        axios
            .get('/api/detailedFrontend/')
            .then((response) => {
                console.log(response.data);
                setCourse(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const isCourseCompleted = (courseName) => {
        return userData?.Data?.completedLanguages?.includes(courseName) || false;
    };

    const handleCheckboxChange = async (courseName) => {
        try {
            const updatedCompletedLanguages = [...userData.Data.completedLanguages];

            if (isCourseCompleted(courseName)) {
                const index = updatedCompletedLanguages.indexOf(courseName);
                if (index !== -1) {
                    updatedCompletedLanguages.splice(index, 1);
                }
            } else {
                updatedCompletedLanguages.push(courseName);
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

    const progressValue = ((userData?.Data?.completedLanguages.length)/10)*100 || 0

    return (
        <Box className='home' >
            <Progress value={progressValue}/>
            <h1>Frontend Roadmap</h1>
            <p>
                Welcome to the frontend roadmap! This roadmap will guide you through the essential skills and technologies for becoming a proficient frontend developer.
            </p>
            
            <Box mt="4">
                {selectedCourse && selectedCourse.length > 0 && (
                    <Flex direction="column" align="center">
                        <Flex gap="2px">
                            <Checkbox size="lg"
                                isChecked={isCourseCompleted('internet')}
                                isDisabled={!userData?.Data}
                                onChange={() => handleCheckboxChange('internet')}
                            />
                            <Button size="md">{selectedCourse[0].name}</Button>
                        </Flex>
                        <DownIcon />
                    </Flex>
                )}
            </Box>
            <Box >
                {selectedCourse && selectedCourse.length > 1 && (
                    <Flex direction="column" align="center">
                        <Flex gap="2px">
                            <Checkbox size="lg"
                                isChecked={isCourseCompleted('html')}
                                isDisabled={!userData?.Data}
                                onChange={() => handleCheckboxChange('html')}
                            />
                            <Button size="md">{selectedCourse[1].name}</Button>
                        </Flex>
                        <DownIcon />
                    </Flex>
                )}
            </Box>
        </Box>
    );
}
