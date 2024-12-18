import React from "react";
import { Avatar, Box, Button, HStack, Text, VStack, useMediaQuery } from "@chakra-ui/react";
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
  const [isMobile] = useMediaQuery("(max-width: 450px)"); // Deteksi ukuran layar HP

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
        width="100%"
        h={isMobile ? "10vh" : "100vh"}
        position={isMobile ? "fixed" : "sticky"}
        left={0}
        bottom={0}
        padding={isMobile ? "15px" : "20px"}
        display="flex"
        flexDirection={isMobile ? "row" : "column"}
        alignItems="center"
        justifyContent={isMobile ? "space-around" : "center"}
        zIndex={10}
      >
        {/* Sidebar Mobile: Horizontal */}
        {isMobile ? (
          <HStack align="flex-end" justify="space-around" w="100%">
            {[
              { label: "Dashboard", icon: <AiFillHome size="24px" />, path: "/admin" },
              { label: "Product", icon: <MdApps size="24px" />, path: "/admin/products" },
            ].map((item) => (
              <VStack
                key={item.label}
                onClick={() => navigate(item.path)}
                cursor="pointer"
                color={isActive(item.path) ? "#DFA258" : "white"}
                _hover={{ color: "#DFA258" }}
              >
                {item.icon}
                <Text fontSize="xs">{item.label}</Text>
              </VStack>
            ))}
          </HStack>
        ) : (
          /* Sidebar Desktop: Vertical */
        <VStack align="start" spacing={4} w="100%">
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
                <Text as="span" fontWeight={"bold"} >
                  {user?.userName}
                </Text>
              </Text>
            </Box>
          </VStack>

          {/* Navbar */}
            {/* Tombol Navigasi */}
            {[
              { label: "Dashboard", icon: <AiFillHome size="24px" />, path: "/admin" },
              { label: "Product", icon: <MdApps size="24px" />, path: "/admin/products" },
            ].map((item) => (
            <Button
              key={item.label}
              leftIcon={item.icon}
              fontSize="lg"
              bg="#367236"
              justifyContent="flex-start"
              color={isActive(item.path) ? "#DFA258" : "white"}
              width="100%"
              _hover={{ color: "#DFA258" }}
              _active={{ bg: "#367236" }}
              position="relative"
              textAlign={"center"}
              pl="6"
              onClick={() => navigate(item.path)}
              _before={{
                content: '""',
                position: "absolute",
                height: isActive(item.path) ? "50%" : "0",
                width: "4px",
                bg: "#DFA258",
                left: "-20px",
                borderRadius: "0 1.5px 1.5px 0",
                transition: "height 0.3s ease-in-out",
              }}
            >
              {item.label}
            </Button>
            ))}

          {/* Logout */}
          <Button
            color="white"
            bg="#DFA258"
            mt="10"
            alignSelf="center"
            _hover={{ bg: "yellow.700" }}
            onClick={handleLogut}
          >
            <IoLogOutOutline /> Logout
          </Button>
        </VStack>
        )}
      </Box>
    </HStack>
  );
};

export default SideBarAdmin;
