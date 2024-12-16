import React, { useEffect, useState } from "react";
import { Box, Text, HStack, VStack } from "@chakra-ui/react";
import SideBarAdmin from "../../components/SideBarAdmin";
import { useHttp } from "../../hooks/http";

const Dashboard = () => {
  const { handleGetRequest } = useHttp();
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

  useEffect(() => {
    handleGetStatistic();
  }, []);

  return (
    <HStack height="100vh" align="stretch" spacing={0}>
      {/* Sidebar */}
      <Box>
        <SideBarAdmin />
      </Box>

      {/* Main Content */}
      <VStack
        flex="1"
        align="start"
        padding="20px 40px"
        spacing={8}
        overflowY="auto"
        height="100vh"
      >
        {/* Header */}
        <Box
          bg="#367236"
          width="100%"
          color="white"
          padding="50px"
          borderRadius="lg"
        >
          <HStack
            justify="center"
            align="center"
            h="100%"
            w="100%"
            spacing={{ base: 8, md: 16 }}
          >
            <Text
              fontSize={{ base: "4xl", md: "8xl" }}
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
            />
            <Text
              fontSize={{ base: "xl", md: "3xl" }}
              fontFamily="'Poppins', cursive"
            >
              Your Adventure Partner Stats Here
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
      </VStack>
    </HStack>
  );
};

export default Dashboard;
