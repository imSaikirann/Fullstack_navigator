import React from 'react'
import { Box,Flex } from '@chakra-ui/react'

export default function DevTools() {
  return (
    <div>
      <Flex alignItems="center">
        <Box width="1200px" height="500px" bgColor="blackAlpha.900" color="white">
            Dev tools here
        </Box>
      </Flex>
    </div>
  )
}
