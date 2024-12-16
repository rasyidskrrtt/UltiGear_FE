import React from "react";
import { Avatar, Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { MdApps } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { getDecodeToken } from "../utilities/decodeToken";
import { useToken } from "../hooks/token";

const SideBarAdmin = () => {
  const user = getDecodeToken();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const { removeToken } = useToken();

  const handleLogut = () => {
    removeToken();
    navigate("/");
    window.location.reload();
  };

  return (
    <HStack>
      <Box
        bg="#367236"
        color="white"
        width="20vw"
        maxWidth="300px"
        h="100vh"
        top="0"
        position="sticky"
        paddingBlock="20px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <VStack align="center" width="100%" paddingInline="30px">
          <Box textAlign="center">
            {/* Static Profile Image */}
            <Avatar
              size={"xl"}
              mb={"4"}
              src="/public/F4-Blck.png"  // Path to the static image in the public folder
            />
            <Text fontSize={"lg"} mb={"8"}>
              Welcome Back! <br />
              <Text as="span" fontWeight={"bold"}>
                {user?.userName}
              </Text>
            </Text>
          </Box>
        </VStack>
        <VStack align={"start"} spacing={"2"} width="100%">
          <Button
            leftIcon={<AiFillHome size="24px" />}
            fontSize="lg"
            justifyContent="flex-start"
            bg="#367236"
            color={isActive("/admin") ? "#DFA258" : "white"}
            width="100%"
            _hover={{ color: "#DFA258" }}
            _active={{ bg: "#367236" }}
            position="relative"
            pl="10"
            onClick={() => navigate("/admin")}
            _before={{
              content: '""',
              position: "absolute",
              height: isActive("/admin") ? "50%" : "0",
              width: "4px",
              bg: "#DFA258",
              left: "0",
              borderRadius: "0 1.5px 1.5px 0",
              transition: "height 0.3s ease-in-out",
            }}
          >
            Dashboard
          </Button>
          <Button
            leftIcon={<MdApps size="24px" />}
            fontSize="lg"
            justifyContent="flex-start"
            bg="#367236"
            color={isActive("/admin/products") ? "#DFA258" : "white"}
            width="100%"
            _hover={{ color: "#DFA258" }}
            _active={{ bg: "#367236" }}
            position="relative"
            pl="10"
            onClick={() => navigate("/admin/products")}
            _before={{
              content: '""',
              position: "absolute",
              height: isActive("/admin/products") ? "50%" : "0",
              width: "4px",
              bg: "#DFA258",
              left: "0",
              borderRadius: "0 1.5px 1.5px 0",
              transition: "height 0.3s ease-in-out",
            }}
          >
            Product
          </Button>
        </VStack>
        <Button
          color={"white"}
          bg={"#DFA258"}
          mt={"16"}
          _hover={{ bg: "yellow.700" }}
          onClick={handleLogut}
        >
          <IoLogOutOutline /> Logout
        </Button>
      </Box>
    </HStack>
  );
};

export default SideBarAdmin;
