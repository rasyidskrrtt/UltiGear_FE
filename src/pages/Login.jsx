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
import { useToken } from "../hooks/token";
import { getDecodeToken } from "../utilities/decodeToken";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { handlePostRequest } = useHttp();
  const { setToken } = useToken();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
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

    try {
      const payload = {
        email,
        password,
      };

      const result = await handlePostRequest({
        path: "/auth/login",
        body: payload,
      });

      if (result?.data?.token) {
        setToken(result?.data.token);

        const decodedToken = getDecodeToken();

        if (decodedToken?.userRole?.toUpperCase() === "ADMIN") {
          navigate("/admin/");
        } else {
          navigate("/home");
        }
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <HStack w={"100vw"}>
        {/* Side Section */}
        <Box
          w={"30%"}
          bg={"#367236"}
          h={"100vh"}
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
              Welcome to UltiGear!
            </Text>
            <Button
              bg={"F7F3F4"}
              color={"#367236"}
              variant={"link"}
              fontWeight={"bold"}
              _hover={{ color: "teal.600" }}
              onClick={() => navigate("/regist")}
            >
              Sign Up
            </Button>
          </HStack>

          <Box w={"100%"} mt={"4"}>
            <Text textAlign={"left"} mb={"1"}>
              Email
            </Text>
            <InputGroup>
              <Input
                placeholder="Enter your email"
                borderColor={"black"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* {isEmailValid && ( */}
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

          <Button
            bgColor={"#367236"}
            mt={"4"}
            color={"#F7F3F4"}
            w={"24"}
            _hover={{ bg: "#285b28" }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default Login;
