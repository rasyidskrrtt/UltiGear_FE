import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Button, HStack, Image, Text, VStack, Divider } from "@chakra-ui/react";
import SideBarSection from "../components/SideBarSection";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http";

const MyOrders = () => {
  const navigate = useNavigate();
  const { handleGetTableDataRequest } = useHttp();

  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const [orders, setOrders] = useState([]);

  const getTableData = async ({ search }) => {
    try {
      const result = await handleGetTableDataRequest({
        path: "/orders",
        page: paginationModel.page ?? 0,
        size: paginationModel.pageSize ?? 10,
        filter: { search },
      });
      if (result) {
        console.log(result);
        setOrders(result.orders);
        // setRowCount(result.totalItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTableData({ search: "" });
  }, []);

  return (
    <Layout>
      <HStack
        align={"stretch"}
        height={"100vh"}
        w={"100vw"}
        flexWrap={{ base: "wrap", md: "nowrap" }}
      >
        <SideBarSection />
        {/* Main Section */}
        <VStack
          flex="1"
          align="start"
          padding={{ base: "5px", md: "20px" }}
          spacing={8}
          overflowY="auto"
          height={{ base: "calc(100vh - 80px)", md: "100vh" }} 
        >
          <Text
            fontSize="4xl"
            fontWeight="semibold"
            alignSelf= {{ base: "center", md: "start" }}
            mt={{ base: "30px", md: "0" }}
            px={{ base: "30px", md: "35px", lg:"70px" }}
            mb="-25px"
          >
            My Orders
          </Text>
          <Divider
              borderColor="black.900"
              mt={2}
              mb={-4}
              width="90%"
              alignSelf="center"
              display={{base: "flex", md: "none"}}
            />
          <HStack
            spacing={4}
            align="stretch"
            w="full"
            px={{ base: "5px", md: "20px", lg: "50px"}}
            flexWrap="wrap"
            flexDirection={{ base: "column", md: "column", lg:"row" }}
          >
            {/* List Orders */}
            <VStack
              flex="2"
              bg="#F7F3F4"
              padding="14px"
              spacing={6}
              height="auto"
              w="full"
            >
              {orders.map((order, index) => (
                <HStack
                  key={index}
                  bg="white"
                  boxShadow="md"
                  borderRadius="md"
                  padding={{ base: "16px", md: "20px" }}
                  spacing={4}
                  align="center"
                  justify="space-between"
                  w="full"
                >
                  <Image
                    src={order.product_id?.image_url}
                    alt={order.product_id?.image_url}
                    boxSize={{ base: "80px", md: "100px", lg:"120px" }}
                    objectFit="cover"
                    borderRadius="md"
                  ></Image>
                  <VStack align="start" flex="1" spacing={1}>
                    <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>{order.product_id?.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {order.product_id?.size[0]}, {order.product_id?.color[0]}
                      {/* {order?.total_price / order.product_id?.price} Items */}
                    </Text>
                    <Text
                      fontWeight="bold"
                      color="#367236"
                      mt={6}
                      fontSize={{ base: "md", md: "lg" }}
                    >
                      Rp {order?.total_price?.toLocaleString("en-US") ?? "0"}
                    </Text>
                  </VStack>
                  <VStack spacing={16}>
                    <Text color="#367236" fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                      {order?.payment_status}
                    </Text>
                    <Text fontSize={{ base: "xx-small", md: "xx-small", lg: "xs"}}>{order?.createdAt}</Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>

            {/* Explore */}
            <VStack
              flex="1"
              bg="#F7F3F4"
              padding="26px"
              mt={4}
              spacing={4}
              w="full"
              height="70%"
              justifyContent="center"
              alignItems="center"
              display={{base: "none", md: "flex", lg: "flex"}}
            >
              <Text fontSize="3xl" align="center" fontWeight="bold">
                Explore More Product
              </Text>
              <Button
                bg="#367236"
                color="white"
                size="lg"
                p={{base: 0, md: 0, lg: 4}}
                display="flex" // Flexbox untuk align content
                justifyContent="center" // Horizontal alignment (tengah)
                alignItems="center"
                w="30%"
                variant="unstyled"
                onClick={() => {
                  navigate("/home");
                }}
              >
                {" "}
                Explore
              </Button>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default MyOrders;
