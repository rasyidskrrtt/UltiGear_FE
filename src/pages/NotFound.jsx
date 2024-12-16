import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgGradient="linear(to-r, teal.500, blue.500)"
      color="white"
    >
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="2xl">
          404 - Page Not Found
        </Heading>
        <Text fontSize="lg">
          Oops! The page you’re looking for doesn’t exist.
        </Text>
        <Button
          colorScheme="teal"
          variant="solid"
          size="lg"
          onClick={() => navigate("/")}
        >
          Go Back to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
