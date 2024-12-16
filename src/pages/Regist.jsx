import React, { useState } from "react";
import Layout from "./Layout";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  InputGroup,
  InputRightElement,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http";

const Regist = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { handlePostRequest } = useHttp();

  // Regex for email validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (username.length < 4) {
      toast({
        title: "Invalid Username",
        description: "Username must be at least 4 characters long.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Password and Confirm Password must match.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      const payload = {
        email,
        username,
        password,
        confirmPassword,
      };

      const result = await handlePostRequest({
        path: "/auth/register",
        body: payload,
      });

      if (result?.data !== null) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <HStack w={"100vw"} h={"100%"}>
        {/* Side Section */}
        <Box
          w={"30%"}
          bg={"#367236"}
          h={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            color={"white"}
            fontSize="7xl"
            fontWeight="medium"
            fontFamily="'Covered By Your Grace', cursive"
          >
            UltiGear!
          </Text>
        </Box>

        {/* Form Section */}
        <VStack w={{ lg: "35vw", base: "70vw" }} p={"12"} mx={"auto"}>
          <HStack justify="space-between" w="100%">
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              Create Account
            </Text>
            <Button
              bg={"F7F3F4"}
              color={"#367236"}
              variant={"link"}
              fontWeight={"bold"}
              _hover={{ color: "teal.600" }}
              onClick={() => navigate("/")}
            >
              Login
            </Button>
          </HStack>

          <Box w={"100%"} mt={"4"}>
            <Text textAlign={"left"} mb={"1"}>
              Username
            </Text>
            <InputGroup>
              <Input
                placeholder="Enter your Username"
                borderColor={"black"}
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              {username.length >= 4 && (
                <InputRightElement>
                  <Icon as={FaCheck} color="green.500" />
                </InputRightElement>
              )}
            </InputGroup>
          </Box>

          <Box w={"100%"} mt={"4"}>
            <Text textAlign={"left"} mb={"1"}>
              Email
            </Text>
            <InputGroup>
              <Input
                placeholder="Enter your email"
                borderColor={"black"}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {validateEmail(email) && (
                <InputRightElement>
                  <Icon as={FaCheck} color="green.500" />
                </InputRightElement>
              )}
            </InputGroup>
          </Box>

          <Box w={"100%"} mt={"4"}>
            <Text textAlign={"left"} mb={"1"}>
              Password
            </Text>
            <InputGroup>
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                borderColor={"black"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <Button
                  size="sm"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                >
                  {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Box w={"100%"} mt={"4"}>
            <Text textAlign={"left"} mb={"1"}>
              Confirm Password
            </Text>
            <InputGroup>
              <Input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Enter your password again"
                borderColor={"black"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement>
                <Button
                  size="sm"
                  onClick={() => setConfirmPasswordVisible((prev) => !prev)}
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                >
                  {confirmPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Button
            bgColor={"#367236"}
            mt={"4"}
            color={"#F7F3F4"}
            w={"24"}
            _hover={{ bg: "#285b28" }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default Regist;
