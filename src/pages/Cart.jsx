import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Button, HStack, Image, Text, VStack, Divider } from "@chakra-ui/react";
import SideBarSection from "../components/SideBarSection";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http";
import { getDecodeToken } from "../utilities/decodeToken";

const Cart = () => {
  const navigate = useNavigate();
  const { handleGetTableDataRequest } = useHttp();
  const user = getDecodeToken();

  const [carts, setCarts] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getTableData = async ({ search }) => {
    try {
      const result = await handleGetTableDataRequest({
        path: "/cart",
        page: paginationModel.page ?? 0,
        size: paginationModel.pageSize ?? 10,
        filter: { search, user_id: user.id },
      });
      if (result) {
        console.log(result);
        setCarts(result.cartItems);
        // setRowCount(result.totalItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTableData({ search: "" });
  }, []);

  // Example cart items with price and quantity
  const [quantities, setQuantities] = useState([2, 3, 1, 4]); // Initial quantities for 4 items

  // Handle the increase/decrease in quantities
  // const handleQuantityChange = (index, operation) => {
  //   setQuantities((prevQuantities) => {
  //     const newQuantities = [...prevQuantities];
  //     if (operation === "increase") {
  //       newQuantities[index] = newQuantities[index] + 1;
  //     } else if (operation === "decrease" && newQuantities[index] > 1) {
  //       newQuantities[index] = newQuantities[index] - 1;
  //     }
  //     return newQuantities;
  //   });
  // };

  // Calculate total price
  //   const totalPrice = quantities.reduce(
  //     (acc, qty, index) => acc + products[index].price * qty,
  //     0
  //   );

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
          align={{ base: "center", md: "start" }}
          padding={{ base: "5px", md: "20px" }}
          spacing={8}
          overflowY="auto"
          height={{ base: "calc(100vh - 80px)", md: "100vh" }} 
        >
          <Text
            fontSize="4xl"
            fontWeight="semibold"
            mb="-25px"
            mt={{ base: "30px", md: "0" }}
            px={{ base: "30px", md: "35px", lg:"70px"}}
          >
            Cart
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
            px={{ base: "5px", md: "20px", lg: "50px" }}
            flexWrap="wrap"
            flexDirection={{ base: "column", md: "row" }}
          >
            {/* List Keranjang */}
            <VStack
              flex="2"
              bg="#F7F3F4"
              padding="14px"
              spacing={6}
              height="auto"
              w="full"
            >
              {Array.isArray(carts) &&
                carts.map((cart, index) => (
                  <HStack
                    key={cart._id}
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
                      src={cart.product_id.image_url}
                      alt={cart.product_id.name}
                      boxSize={{ base: "80px", md: "100px", lg:"120px" }}
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <VStack align="start" flex="1" spacing={1}>
                      <Text fontSize={{ base: "md", md: "md" }} fontWeight="bold">{cart.product_id.name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {cart.product_id.size[0]}, {cart.product_id.color[0]}
                      </Text>
                      <HStack>
                        <Button
                          size={{ base: "xs", md: "sm" }}
                          fontWeight="bold"
                          bg="#367236"
                          color="white"
                          _hover={{ backgroundColor: "#28521d" }}
                          onClick={() => handleProductClick(cart.product_id?._id)}
                        >
                          Buy
                        </Button>
                      </HStack>
                    </VStack>
                    <Text
                      size={{ base: "xs", md: "sm" }}
                      fontWeight="bold"
                      color="#367236"
                      alignSelf="flex-end"
                      px={2}
                      py={2}
                    >
                      Rp {cart.product_id.price.toLocaleString()}
                    </Text>
                  </HStack>
                ))}

              {!carts && (
                <Text fontSize="4xl" fontWeight="semibold">
                  Cart is Empty
                </Text>
              )}
            </VStack>

            {/* Total Buy */}
            {/* <VStack
              flex="1"
              align="stretch"
              bg="white"
              boxShadow="md"
              borderRadius="md"
              padding="26px"
              mt={4}
              spacing={4}
              w="full"
              height="20%"
            >
              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="bold">
                  Total
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="#367236">
                  Rp {totalPrice.toLocaleString()}
                </Text>
              </HStack>
              <Button
                bg="#367236"
                color="white"
                size="lg"
                variant="unstyled"
                onClick={() => navigate("/paymentMethod")}
              >
                Buy Now
              </Button>
            </VStack> */}
          </HStack>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default Cart;
