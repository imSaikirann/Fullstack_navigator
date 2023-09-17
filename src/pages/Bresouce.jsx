import React, { useContext, useState } from 'react';
import {
  Button,
  Box,
  Flex,
  Text,
  SimpleGrid,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  DrawerOverlay
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

export default function Resource() {
  const { resource } = useContext(UserContext);
  const { userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const onOpenDrawer = (topic) => {
    setIsDrawerOpen(true);
    setSelectedTopic(topic);
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
      const updatedCompletedLanguages = [...userData.Data.completedLanguages];

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

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <Box>
      <Box>
        <Box padding={['1rem', '2rem', '2rem']}  >
          <Text fontSize={['1.5rem', '2rem', '2rem']} fontWeight="700" py={5} fontStyle="Raleway">
            {resource.name.charAt(0).toUpperCase() + resource.name.slice(1)}
          </Text>
          <Text fontSize={['1rem', '1.1rem', '1.1rem']} fontWeight="500" fontStyle="Raleway">
            {resource.information}
          </Text>
          <Flex flexWrap="wrap" gap="1rem" py="5">
            <Button colorScheme='blue' as='a' href={resource.youtubeLink}>
              Watch on Youtube
            </Button>
            <Button as='a' href={resource.documentationLink}>
              Documentation
            </Button>
          </Flex>
        </Box>

        <Box padding={['1rem', '2rem', '2rem']}>
          <Text fontSize={['1.2rem', '1.5rem', '1.7rem']} fontWeight="500"  >Topics</Text>
          <SimpleGrid columns={[1, 2, 4]} spacing={['1rem', '1rem', '2rem']} py={5}>
            {resource &&
              resource.topics &&
              resource.topics.map((res, index) => (
                <Box key={index}>
                  <Flex
                    flexDirection={['column', 'column', 'row']}
                    alignItems={['start', 'start', 'center']}
                    gap="1rem"
                    justifyContent="space-between"
                  >
                    <Flex alignItems="center" gap="0.5rem">
                      <Checkbox
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
                        w={['100%', '100%', 'auto']}
                        onClick={() => {
                          onOpenDrawer(res);
                        }}
                      >
                        {res.topicName}
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              ))}
          </SimpleGrid>
        </Box>

        <Box padding={['1rem', '2rem', '2rem']}>
          <Text fontSize={['1.5rem', '1.7rem', '1.7rem']} fontWeight="500" marginBottom="15px"  >Github Projects</Text>

          {resource && resource.githubProjects.map((projects, index) => (
            projects.link.trim() !== "" && (
              <Box key={index}>
                <Button marginTop="1rem" as="a" href={projects.link}>
                  <Text>{projects.text}</Text>
                </Button>
              </Box>
            )
          ))}

          {resource && resource.githubProjects.every(projects => projects.link.trim() === "") && (
            <Text fontSize={['1.2rem', '1.2rem', '1.2rem']} fontWeight="sm"  >No Projects</Text>
          )}
        </Box>

        <Box marginTop="1.2rem" padding={['1rem', '1rem', '2rem']}>
          <Text fontSize={['1.5rem', '1.7rem', '1.7rem']} fontWeight="500" marginBottom="15px"  >Website Links</Text>

          {resource && resource.articles.map((article, index) => (
            <Box key={index}>
              <Text as="a" marginTop="1rem" href={article.link} textDecoration="underline"  >{article.text}</Text>
            </Box>
          ))}
        </Box>

        <Box bgColor="#F0F2F3" w={['95%', '98%', '98%']} margin="1rem" marginRight={['1rem', '1rem', '0']} borderRadius="10px" padding={['1rem', '1rem', '2rem']}>
          <Text fontSize={['1.5rem', '1.7rem', '1.7rem']} fontWeight="500" marginBottom="15px"  >Interview Questions</Text>
          {resource && resource.questions.map((question, index) => (
            <Box key={index}>
              <Text fontSize={['1rem', '1.1rem', '1.1rem']}  >{question.text}</Text>
              {index < resource.questions.length - 1 && <Divider borderColor="#00000" my="0.5rem" />}
            </Box>
          ))}
        </Box>
      </Box>

      <Drawer size="md" isOpen={isDrawerOpen} placement='right' onClose={onCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            {selectedTopic && (
              <>
                <Text fontSize={['1.7rem', '1.8rem', '1.8rem']} fontWeight="700" py="3"  >
                  {selectedTopic.topicName}
                </Text>
                <Text fontSize={['0.9rem', '1rem', '1rem']} fontWeight="500" py="3"  >
                  {selectedTopic.information}
                </Text>
                <Box py="2">
                  <Button><Text as="a" href={selectedTopic.youtubeLink}>Watch on Youtube</Text></Button>
                </Box>
                <Box py="5">
                  <Text as="a" href={selectedTopic.article.link} textDecoration="underline"  >
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
