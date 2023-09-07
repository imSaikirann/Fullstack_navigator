import React, { useContext, useState } from 'react';
import {
  Button,
  Box,
  Flex,
  Text,
  SimpleGrid,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

export default function Bresouce() {
  const { resource } = useContext(UserContext);
  const { userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const onOpenDrawer = (topic) => {
    setIsDrawerOpen(true);
    setSelectedTopic(topic);
    console.log(selectedTopic);
  };

  const onCloseDrawer = () => setIsDrawerOpen(false);

  const isCourseCompleted = (topicName) => {
    if (userData && userData.user && userData.user._id) {
      return userData.Data?.completedLanguages?.includes(topicName) || false;
    }
    return false;
  };

  const handleCheckboxChange = async (topicName) => {
    try {
      const updatedCompletedLanguages = [...userData.Data.bcompletedLanguages];

      if (isCourseCompleted(topicName)) {
        const index = updatedCompletedLanguages.indexOf(topicName);
        if (index !== -1) {
          updatedCompletedLanguages.splice(index, 1);
        }
      } else {
        updatedCompletedLanguages.push(topicName);
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

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <Box>
      <Box padding="1.5rem 1.2rem">
        <Text fontSize="2rem" fontWeight="700" py={5}>
          {resource.name.charAt(0).toUpperCase() + resource.name.slice(1)}
        </Text>
        <Text fontSize="1.1rem" fontWeight="500" fontStyle="Raleway">
          {resource.information}
        </Text>
        <Flex gap="1rem" py="5">
          <Button as="a" href={resource.youtubeLink}>
            Watch on Youtube
          </Button>
          <Button as="a" href={resource.documentationLink}>
            Documentation
          </Button>
        </Flex>
      </Box>

      <Box padding="1rem">
        <Text fontSize="1.7rem" fontWeight="500">
          Topics
        </Text>
        <SimpleGrid columns={4} spacing={5} py={5}>
          {resource &&
            resource.topics &&
            resource.topics.map((res, index) => (
              <Box key={index}>
                <Box display="flex" gap="1rem">
                  <Checkbox
                    colorScheme="purple"
                    borderColor="#555555"
                    size="lg"
                    isChecked={isCourseCompleted(res.topicName)}
                    onChange={() => {
                      if (userData) {
                        handleCheckboxChange(res.topicName);
                      } else {
                        handleNavigate();
                      }
                    }}
                  />
                  <Button
                    w="100%"
                    onClick={() => {
                      onOpenDrawer(res);
                    }}
                  >
                    {res.topicName}
                  </Button>
                </Box>
              </Box>
            ))}
        </SimpleGrid>
      </Box>

      <Box padding="1rem">
        <Text fontSize="1.7rem" fontWeight="500" marginBottom="15px">
          Github Projects
        </Text>

        {resource &&
          resource.githubProjects.map((projects, index) => (
            projects.link && (
              <Box key={index}>
                <Button marginTop="1rem" as="a" href={projects.link}>
                  <Text>{projects.text}</Text>
                </Button>
              </Box>
            )
          ))}
      </Box>

      <Box marginTop="1.2rem">
        <Text fontSize="1.7rem" fontWeight="500">
          Website Links
        </Text>

        {resource && resource.articles.map((article, index) => (
          <Box key={index}>
            <Text as="a" marginTop="1rem" href={article.link} textDecoration="underline">
              {article.text}
            </Text>
          </Box>
        ))}
      </Box>

      <Box margin="1rem" bgColor="#C5CCD3" w="98%" borderRadius="10px" padding="1rem">
        <Text fontSize="1.7rem" fontWeight="500" marginBottom="15px">
          Interview Questions
        </Text>
        {resource && resource.questions.map((question, index) => (
          <Box key={index}>
            <Text fontSize="1.1rem">{question.text}</Text>
            {index < resource.questions.length - 1 && <Divider borderColor="#00000" my="0.5rem" />}
          </Box>
        ))}
      </Box>

      <Drawer size="md" isOpen={isDrawerOpen} placement='right' onClose={onCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            {selectedTopic && (
              <>
                <Text fontSize="1.8rem" fontWeight="700" py="3">
                  {selectedTopic.topicName}
                </Text>
                <Text fontSize="1rem" fontWeight="500" py="3">
                  {selectedTopic.information}
                </Text>
                <Box py="2">
                  <Button><Text as="a" href={selectedTopic.youtubeLink}>Watch on Youtube</Text></Button>
                </Box>
                <Box py="5">
                  <Text as="a" href={selectedTopic.article.link} textDecoration="underline" >
                    {selectedTopic.article.text}
                  </Text>
                </Box>
              </>
            )}
          </DrawerBody>
         
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
