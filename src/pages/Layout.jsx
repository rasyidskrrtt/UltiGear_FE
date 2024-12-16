import { VStack } from '@chakra-ui/react'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <VStack
    bg="#F7F3F4"
    h="100vh"
    w="100%"
  >
    {children}  
  </VStack>
  )
}

export default Layout