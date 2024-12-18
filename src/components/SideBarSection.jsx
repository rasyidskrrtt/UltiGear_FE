import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import { AiFillHome, AiOutlineFileSearch } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { useToken } from "../hooks/token";
import { getDecodeToken } from "../utilities/decodeToken";
import { useHttp } from "../hooks/http";

const SideBarSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleGetRequest } = useHttp();
  const user = getDecodeToken();
  const isActive = (path) => location.pathname === path;
  const { removeToken } = useToken();
  const [isMobile] = useMediaQuery("(max-width: 450px)"); // Deteksi ukuran layar HP

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo_url: "",
  });

  const handleGetDetailProfile = async () => {
    const result = await handleGetRequest({
      path: `/auth/users/my-profile`,
    });
    if (result) {
      console.log(result);
      setProfile(result.user);
    }
  };

  const handleLogut = () => {
    removeToken();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    handleGetDetailProfile();
  }, []);

  return (
    <HStack>
      <Box
        bg="#367236"
        color="white"
        width="100%"
        h={isMobile ? "10vh" : "100vh"}
        position={isMobile ? "fixed" : "sticky"}
        bottom={0}
        left={0}
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
              { label: "Home", icon: <AiFillHome size="24px" />, path: "/home" },
              { label: "Cart", icon: <IoMdCart size="24px" />, path: "/cart" },
              { label: "Orders", icon: <AiOutlineFileSearch size="24px" />, path: "/myorders" },
              { label: "Edit", icon: <MdEdit size="24px" />, path: "/editprofile" },
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
              <Avatar size={"xl"} mb={"4"} src={profile?.photo_url} />
              <Text fontSize={"lg"} mb={"8"}>
                Welcome Back! <br />
                <Text as="span" fontWeight={"bold"}>
                  {profile?.username}
                </Text>
              </Text>
            </Box>
          </VStack>

          {/* Navbar */}
            {/* Tombol Navigasi */}
            {[
              { label: "Home", icon: <AiFillHome size="24px" />, path: "/home" },
              { label: "Cart", icon: <IoMdCart size="24px" />, path: "/cart" },
              { label: "My Orders", icon: <AiOutlineFileSearch size="24px" />, path: "/myorders" },
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
            <Divider
              borderColor="whiteAlpha.900"
              mb={4}
              mt={4}
            />

            {/* Tombol Navigasi Setelah Divider */}
            <Button
              leftIcon={<MdEdit size="24px" />}
              fontSize="lg"
              justifyContent="flex-start"
              bg="#367236"
              color={isActive("/editprofile") ? "#DFA258" : "white"}
              width="100%"
              _hover={{ color: "#DFA258" }}
              _active={{ bg: "#367236" }}
              position="relative"
              pl="6"
              onClick={() => navigate("/editprofile")}
              _before={{
                content: '""',
                position: "absolute",
                height: isActive("/editprofile") ? "50%" : "0",
                width: "4px",
                bg: "#DFA258",
                left: "-20px",
                borderRadius: "0 1.5px 1.5px 0",
                transition: "height 0.3s ease-in-out",
              }}
            >
              Edit Profile
            </Button>

          {/* Logout */}
          <Button
            color={"white"}
            bg={"#DFA258"}
            mt="10"
            alignSelf={"center"}
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

export default SideBarSection;
