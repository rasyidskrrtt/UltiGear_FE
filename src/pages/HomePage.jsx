import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import SideBarSection from "../components/SideBarSection";
import { FiPlusCircle } from "react-icons/fi";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http";
import { getDecodeToken } from "../utilities/decodeToken";

const HomePage = () => {
  const navigate = useNavigate();
  const { handleGetTableDataRequest, handlePostRequest } = useHttp();
  const user = getDecodeToken();

  const [products, setProducts] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const handleAddToCart = async (productId) => {
    const payload = {
      product_id: productId,
      user_id: user.id,
    };

    await handlePostRequest({
      path: "/cart",
      body: payload,
    });

    navigate("/cart");
    window.location.reload();
  };

  const getTableData = async ({ search }) => {
    try {
      const result = await handleGetTableDataRequest({
        path: "/products",
        page: paginationModel.page ?? 0,
        size: paginationModel.pageSize ?? 10,
        filter: { search },
      });
      if (result) {
        console.log(result);
        setProducts(result.products);
        // setRowCount(result.totalItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    getTableData({ search: "" });
  }, []);

  return (
    <Layout>
      <HStack align={"stretch"} height={"100vh"} w={"100vw"}>
        <SideBarSection />

        {/* Main Section */}
        <VStack
          flex="1"
          align="start"
          padding="20px"
          spacing={8}
          overflowY="auto"
          height="100vh"
        >
          {/* Header */}
          <Search />

          {/* Banner */}
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
                Your Adventure Partner Start Here
              </Text>
            </HStack>
          </Box>

          {/* Product Card */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(5, 1fr)"
            gap={6}
            width="100%"
          >
            {products.map((product, idx) => (
              <Box
                key={idx}
                position="relative"
                boxShadow="md"
                borderRadius="lg"
                bg="white"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
                overflow="hidden"
              >
                {/* Product Image */}
                <Image
                  src={
                    product.image_url ??
                    "https://via.placeholder.com/200x150?text=Jaket+Himalaya"
                  }
                  alt={product.name}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  bgColor="gray.200"
                  cursor="pointer"
                  onClick={() => handleProductClick(product._id)}
                />

                {/* Product Details */}
                <VStack align="start" spacing={1} width="100%" p={3} bg="white">
                  <Text fontSize="sm" fontWeight="medium">
                    {product.name}
                  </Text>
                  <Text color="green.600" fontWeight="bold" fontSize="md">
                    Rp {product.price.toLocaleString()}{" "}
                    {/* Menampilkan harga dalam format IDR */}
                  </Text>
                </VStack>

                {/* Add to Cart Icon */}
                <Box
                  as="button"
                  position="absolute"
                  bottom="10px"
                  right="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="#367236"
                  color="white"
                  width="30px"
                  height="30px"
                  borderRadius="full"
                  cursor="pointer"
                  boxShadow="lg"
                  transition="all 0.3s ease"
                  _hover={{
                    bg: "green.700",
                    transform: "scale(1.1)",
                    boxShadow: "xl",
                  }}
                  onClick={() => handleAddToCart(product._id)} // Tambahkan ke keranjang dan arahkan ke /cart
                >
                  <FiPlusCircle size="24px" />
                </Box>
              </Box>
            ))}
          </Box>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default HomePage;
