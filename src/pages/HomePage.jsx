import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import {
  Box,
  HStack,
  Image,
  VStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import SideBarSection from "../components/SideBarSection";
import { FiPlusCircle } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import emptyImage from "../assets/empty.jpg";
import { useHttp } from "../hooks/http";
import { getDecodeToken } from "../utilities/decodeToken";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleGetTableDataRequest, handlePostRequest } = useHttp();
  const user = getDecodeToken();

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  // Function to fetch query params
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  const getTableData = async ({ keyword }) => {
    const filter = {};

    if (keyword) {
      filter["keyword"] = keyword;
    }

    try {
      const result = await handleGetTableDataRequest({
        path: "/products",
        page: paginationModel.page ?? 0,
        size: paginationModel.pageSize ?? 10,
        filter: filter,
      });

      if (result) {
        console.log(result);
        setProducts(result.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    navigate(`?keyword=${keyword}`); // Updates the URL with the query
    getTableData({ keyword });
  };

  useEffect(() => {
    const queryKeyword = getQueryParam("keyword") || "";
    setKeyword(queryKeyword);
    getTableData({ keyword: queryKeyword });
  }, [location.search]); // Re-run when query parameters change

  const handleAddToCart = async (productId) => {
    const payload = { product_id: productId, user_id: user.id };

    await handlePostRequest({ path: "/cart", body: payload });
    navigate("/cart");
    window.location.reload();
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

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
          {/* Header with Search */}
          <HStack width="100%" justifyContent="space-between">
            <Text
              color={"#367236"}
              fontSize="3xl"
              fontWeight="medium"
              fontFamily="'Covered By Your Grace', cursive"
            >
              UltiGear!
            </Text>
            <InputGroup width={"40%"} borderColor={"black"}>
              <Input
                placeholder="Search on Here"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <InputRightAddon
                bgColor={"#367236"}
                color={"white"}
                onClick={handleSearch}
                cursor="pointer"
              >
                <IoSearch />
              </InputRightAddon>
            </InputGroup>
          </HStack>

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
                borderWidth="3px"
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

          {/* Empty State */}
          {Array.isArray(products) && products.length === 0 && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <img
                src={emptyImage}
                alt="No Products"
                style={{ width: "250px", height: "auto" }}
              />
              <p style={{ fontSize: "18px", color: "#555", marginTop: "10px" }}>
                Product Not Found!
              </p>
            </div>
          )}

          {/* Product Grid */}
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
                <VStack align="start" spacing={1} width="100%" p={3} bg="white">
                  <Text fontSize="sm" fontWeight="medium">
                    {product.name}
                  </Text>
                  <Text color="green.600" fontWeight="bold" fontSize="md">
                    Rp {product.price.toLocaleString()}
                  </Text>
                </VStack>
                <Box
                  as="button"
                  position="absolute"
                  bottom="10px"
                  right="10px"
                  bg="#367236"
                  color="white"
                  width="30px"
                  height="30px"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  onClick={() => handleAddToCart(product._id)}
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
