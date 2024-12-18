import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import SideBarAdmin from "../../components/SideBarAdmin";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http";

const EditProduct = () => {
  const navigate = useNavigate();
  const [stock, setStock] = useState(0);
  const { handleUpdateRequest, handleGetRequest } = useHttp();
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: stock,
    description: "",
    size: "",
    color: "",
  });

  const handleSubmit = async () => {
    const payload = { ...product, stock };
    await handleUpdateRequest({
      path: "/products/" + productId,
      body: payload,
    });

    window.history.back();
  };

  const handleGetDetailProduct = async () => {
    const result = await handleGetRequest({
      path: `/products/${productId}`,
    });

    setProduct(result);
    setLoading(false);
  };

  useEffect(() => {
    handleGetDetailProduct();
  }, []);

  if (loading) return "loading...";

  return (
    <Layout>
      <HStack height="100%" w="100%" align="stretch" spacing={0}>
        {/* Sidebar */}
        <Box>
          <SideBarAdmin />
        </Box>
        {/* Main Section */}
        <Box p={{base:"30px 20px", md: "14px 20px"}} px={{base:4, md:16}} h="100vh" w="100vw" bg="#F7F3F4" overflow="auto">
          {/* Header Section */}
          <HStack
            justifyContent="space-between"
            mb={4}
            p={4}
            px={{base: 8, md: 10}}
            bg="#367236"
            borderRadius="md"
            boxShadow="sm"
          >
            <Text
              color="white"
              fontSize="4xl"
              fontWeight="sm"
              fontFamily="'Covered By Your Grace', cursive"
            >
              UltiGear!
            </Text>
            <Button
              color="white"
              bg="#DFA258"
              px={4}
              variant="unstyled"
              onClick={() => navigate("/admin/products")}
            >
              Back to Product
            </Button>
          </HStack>
          {/* Form Section */}
          <VStack
            spacing={4}
            align="stretch"
            bg="gray.200"
            p={{base:6, md:10}}
            borderRadius={10}
          >
            <FormControl>
              <HStack>
                <FormLabel w={{base:32, md:48}}>Name</FormLabel>
                <Input
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  value={product.name}
                  placeholder="masukan nama produk"
                  borderColor="black"
                  bg="white"
                />
              </HStack>
            </FormControl>

            {/* Category */}
            <FormControl>
              <HStack>
                <FormLabel w={{base:32, md:48}}>Category</FormLabel>
                <Input
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                  value={product.category}
                  placeholder="masukan kategori produk"
                  borderColor="black"
                  bg="white"
                />
              </HStack>
            </FormControl>

            <FormControl>
              <HStack>
                <FormLabel w={{base:32, md:48}}>Product</FormLabel>
                <Textarea
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                  value={product.description}
                  placeholder="masukan deskripsi produk"
                  borderColor="black"
                  bg="white"
                />
              </HStack>
            </FormControl>

            <FormControl>
              <HStack>
                <FormLabel w={{base:32, md:48}}>Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  borderColor="black"
                  bg="white"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    height: "50px",
                    padding: "10px",
                  }}
                />
              </HStack>
            </FormControl>

            <FormControl>
              <HStack>
                <FormLabel w={{base:32, md:48}}>Price</FormLabel>
                <Input
                  onChange={(e) =>
                    setProduct({ ...product, price: +e.target.value })
                  }
                  value={product.price}
                  type="number"
                  placeholder="masukan Harga produk"
                  borderColor="black"
                  bg="white"
                />
              </HStack>
            </FormControl>

            <FormControl>
              <HStack>
                <FormLabel w={{base:24, md:40}}>Size</FormLabel>
                <HStack spacing={4}>
                  {["S", "M", "L", "XL"].map((size) => (
                    <Button
                      key={size}
                      size={{base: "xs", md:"sm"}}
                      variant="outline"
                      onClick={(e) => setProduct({ ...product, size })}
                      borderColor="black"
                    >
                      {size}
                    </Button>
                  ))}
                </HStack>
              </HStack>
            </FormControl>

            <FormControl>
              <HStack>
                <FormLabel w={{base:24, md:40}}>Color</FormLabel>
                <HStack spacing={{base: 2, md:4}}>
                  {["Red", "Green", "Yellow", "Blue"].map((color) => (
                    <Button
                      key={color}
                      size={{base: "xs", md:"sm"}}
                      variant="outline"
                      colorScheme={color.toLowerCase()}
                      onClick={(e) => setProduct({ ...product, color })}
                    >
                      {color}
                    </Button>
                  ))}
                </HStack>
              </HStack>
            </FormControl>

            <FormControl>
              <HStack>
                <FormLabel w={{base:24, md:40}}>Stock</FormLabel>
                <HStack>
                  <Button
                    bg="#367236"
                    color="white"
                    variant="unstyled"
                    onClick={() => setStock(stock - 1)}
                    size={{base: "xs", md:"sm"}}
                  >
                    -
                  </Button>
                  <NumberInput
                    borderColor="black"
                    w="20"
                    value={stock}
                    onChange={(valueString) =>
                      setStock(parseInt(valueString, 10))
                    }
                    min={0}
                    size={{base: "xs", md:"sm"}}
                  >
                    <NumberInputField />
                  </NumberInput>
                  <Button
                    bg="#367236"
                    color="white"
                    variant="unstyled"
                    onClick={() => setStock(stock + 1)}
                    size={{base: "xs", md:"sm"}}
                  >
                    +
                  </Button>
                </HStack>
              </HStack>
            </FormControl>

            <Button
              color="white"
              bg="#DFA258"
              w={{base: "20%", md: "10%"}}
              variant="unstyled"
              onClick={handleSubmit}
              size="md"
              alignSelf="flex-end"
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </HStack>
    </Layout>
  );
};

export default EditProduct;
