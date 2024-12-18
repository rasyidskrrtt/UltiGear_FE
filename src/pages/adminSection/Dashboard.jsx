import React, { useEffect, useState } from "react";
import { Box, Text, HStack, VStack, Button } from "@chakra-ui/react";
import SideBarAdmin from "../../components/SideBarAdmin";
import { useHttp } from "../../hooks/http";
import { useToken } from "../../hooks/token";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

const Dashboard = () => {
  const { handleGetRequest } = useHttp();
  const navigate = useNavigate();
  const { removeToken } = useToken();
  const [total, setTotal] = useState({
    totalProducts: 0,
    totalOrders: 0,
  });

  const handleGetStatistic = async () => {
    const result = await handleGetRequest({
      path: `/statistic`,
    });

    if (result) {
      setTotal(result);
    }
  };

  const handleLogut = () => {
    removeToken();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    handleGetStatistic();
  }, []);

  return (
    <HStack height="100vh" align="stretch" w="100%" spacing={0}
    >
      {/* Sidebar */}
      <SideBarAdmin />

      {/* Main Content */}
      <VStack
        flex="1"
        align="start"
        padding={{ base: "50px 30px", md: "40px" }} 
        spacing={8}
        overflowY="auto"
        height={{ base: "calc(100vh - 80px)", md: "100vh" }}
      >
        {/* Header */}
        <Box
          bg="#367236"
          width="100%"
          color="white"
          padding={{ base: "30px", md: "50px" }}
          borderRadius="lg"
        >
          <HStack
            justify="center"
            align="center"
            h="100%"
            w="100%"
            spacing={{ base: 2, md: 12, lg: 16 }}
            flexDirection={{ base: "column", md: "row"}}
          >
            <Text
              fontSize={{ base: "7xl", md: "6xl", lg: "8xl"}}
              fontWeight="medium"
              fontStyle="italic"
              fontFamily="'Covered By Your Grace', cursive"
              lineHeight="1"
            >
              UltiGear!
            </Text>
            <Box
              orientation="vertical"
              borderColor="white"
              height="100%"
              borderWidth={{ base: "2px", md: "3px" }}
              borderRadius="5px"
              display={{base: "none", md: "flex"}}
            />
            <Text
              fontSize={{ base: "sm", md: "md", lg: "3xl"}}
              fontFamily="'Poppins', cursive"
            >
              Your Adventure Partner Starts Here
            </Text>
          </HStack>
        </Box>

        {/* Dashboard Content */}
        <Box
          display="grid"
          gridTemplateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
          width="100%"
        >
          {/* Product Stats */}
          <Box
            position="relative"
            boxShadow="xl"
            borderRadius="2xl"
            bg="linear-gradient(135deg, #367236, #DFA258)"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            p={8}
            h="200px"
          >
            <Box
              bg="white"
              borderRadius="full"
              w={20}
              h={20}
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="lg"
            >
              <Text fontSize="4xl" fontWeight="bold" color="#367236">
                {total.totalProducts}
              </Text>
            </Box>
            <Text
              mt={4}
              fontSize="xl"
              fontWeight="bold"
              color="white"
              textTransform="uppercase"
            >
              Products
            </Text>
          </Box>

          {/* Order Stats */}
          <Box
            position="relative"
            boxShadow="xl"
            borderRadius="2xl"
            bg="linear-gradient(135deg, #DFA258, #367236)"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            p={8}
            h="200px"
          >
            <Box
              bg="white"
              borderRadius="full"
              w={20}
              h={20}
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="lg"
            >
              <Text fontSize="4xl" fontWeight="bold" color="#DFA258">
                {total.totalOrders}
              </Text>
            </Box>
            <Text
              mt={4}
              fontSize="xl"
              fontWeight="bold"
              color="white"
              textTransform="uppercase"
            >
              Orders
            </Text>
          </Box>
        </Box>

        {/* Logout */}
        <Button
          color="white"
          bg="red.600"
          alignSelf="center"
          mt={5}
          display={{ base: "flex", md: "none" }}
          _hover={{ bg: "yellow.700" }}
          onClick={handleLogut}
          w="40%"
        >
          <IoLogOutOutline /> Logout
        </Button>
      </VStack>
    </HStack>
  );
};

export default Dashboard;
