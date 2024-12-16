import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  VStack,
  Text,
  Avatar,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import SideBarSection from "../components/SideBarSection";
import Layout from "./Layout";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http";
import { getDecodeToken } from "../utilities/decodeToken";
import UploadImage from "../components/UploadImage";

const EditProfile = () => {
  const { handleUpdateRequest, handleGetRequest } = useHttp();
  const [loading, setLoading] = useState(false);
  const decodedToken = getDecodeToken();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile.name || !profile.email || profile.password.length < 8) {
      const payload = profile;
      await handleUpdateRequest({
        path: "/auth/editProfile/" + decodedToken?.id,
        body: payload,
      });
      return;
    }
  };

  const handleGetDetailProfile = async () => {
    const result = await handleGetRequest({
      path: `/auth/users/my-profile`,
    });
    if (result) {
      console.log(result);
      setProfile(result.user);
    }
  };

  useEffect(() => {
    handleGetDetailProfile();
  }, []);

  if (loading) return "loading...";

  return (
    <Layout>
      <HStack align="stretch" height="100vh" w="100vw">
        <SideBarSection />
        {/* Main Section */}
        <VStack
          flex="1"
          align="center"
          justify="center"
          p="20px"
          spacing="8"
          overflow="auto"
          height="100vh"
        >
          <VStack w="100%" px={8}>
            <Box
              as="form"
              w="100%"
              maxW="350px" 
              p={4} 
              bg="white"
              borderRadius="lg"
              boxShadow="md"
              onSubmit={handleSubmit}
              position="relative"
            >
              <HStack w="100%" mb={4}> {/* Mengurangi margin bottom header */}
                <IconButton
                  variant="unstyled"
                  size="md"
                  onClick={() => navigate("/home")}
                >
                  <FaChevronLeft />
                </IconButton>
                <Text fontSize="lg" fontWeight="bold" align="start" ml={-3}> {/* Mengurangi font size header */}
                  Edit Profile
                </Text>
              </HStack>

              <Flex justify="center" align="center" position="relative">
                <Avatar size="lg" mb={4} src={profile.photo_url} /> {/* Mengurangi ukuran avatar */}
              </Flex>
              <UploadImage
                onUpload={(url) => setProfile({ ...profile, photo_url: url })}
              />

              <VStack spacing={3} mt={4} align="stretch"> {/* Mengurangi spacing antar form */}
                {/* Name Field */}
                <FormControl>
                  <FormLabel fontSize="sm">Name</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    size="sm" 
                    bg="white"
                    borderColor="gray.300"
                  />
                </FormControl>

                {/* Email Field */}
                <FormControl>
                  <FormLabel fontSize="sm">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    size="sm"
                    bg="white"
                    borderColor="gray.300"
                  />
                </FormControl>

                {/* Password Field */}
                <FormControl>
                  <FormLabel fontSize="sm">Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    size="sm"
                    bg="white"
                    borderColor="gray.300"
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    Minimum 8 characters
                  </Text>
                </FormControl>

                {/* Confirm Password Field */}
                <FormControl>
                  <FormLabel fontSize="sm">Confirm Password</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={profile.confirmPassword}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    size="sm"
                    bg="white"
                    borderColor="gray.300"
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    Minimum 8 characters
                  </Text>
                </FormControl>

                {/* Submit Button */}
                <Button
                  type="submit"
                  bg="#DFA258"
                  color="white"
                  w="100%"
                  size="sm"
                  _hover={{ bg: "yellow.700" }}
                  mt={3} 
                >
                  Submit
                </Button>
              </VStack>
            </Box>
          </VStack>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default EditProfile;