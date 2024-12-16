import React, { useState, useRef } from "react";
import Layout from "../Layout";
import SideBarAdmin from "../../components/SideBarAdmin";
import {
  Box,
  Button,
  Heading,
  HStack,
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
import { IconButton } from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http";
import UploadImage from "../../components/UploadImage";

const AddProduct = () => {
  const navigate = useNavigate();
  const [stock, setStock] = useState(1);
  const { handlePostRequest } = useHttp();
  const [imageUrl, setImageUrl] = useState("");

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
    try {
      const payload = { ...product, stock, imageUrl };

      await handlePostRequest({
        path: "/products",
        body: payload,
      });

      window.history.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <HStack height="100vh" w="100vw" align="stretch">
        {/* Sidebar */}
        <Box>
          <SideBarAdmin />
        </Box>
        {/* Main Section */}
        <Box p={5} px={20} h="100vh" w="100vw" bg="#F7F3F4" overflow="auto">
          {/* Header Section */}
          <HStack
            justifyContent="space-between"
            mb={4}
            p={4}
            px={10}
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
            p={10}
            borderRadius={10}
          >
            {/* Name Product */}
            <FormControl>
              <HStack>
                <FormLabel w={48}>Name</FormLabel>
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
                <FormLabel w={48}>Category</FormLabel>
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

            {/* Description Product */}
            <FormControl>
              <HStack>
                <FormLabel w={48}>Description</FormLabel>
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

            {/* Image Products */}
            <FormControl>
              <HStack>
                <FormLabel w={48}>Image</FormLabel>
                <UploadImage onUpload={setImageUrl} />
              </HStack>
            </FormControl>

            {/* Product Price */}
            <FormControl>
              <HStack>
                <FormLabel w={48}>Price</FormLabel>
                <Input
                  type="number"
                  onChange={(e) =>
                    setProduct({ ...product, price: +e.target.value })
                  }
                  value={product.price}
                  placeholder="masukan Harga produk"
                  borderColor="black"
                  bg="white"
                />
              </HStack>
            </FormControl>

            {/* Size */}
            <FormControl>
              <HStack>
                <FormLabel w={40}>Size</FormLabel>
                <HStack spacing={4}>
                  {["S", "M", "L", "XL"].map((size) => (
                    <Button
                      key={size}
                      size="sm"
                      variant="outline"
                      borderColor="black"
                      onClick={(e) => setProduct({ ...product, size })}
                    >
                      {size}
                    </Button>
                  ))}
                </HStack>
              </HStack>
            </FormControl>

            {/* Color */}
            <FormControl>
              <HStack>
                <FormLabel w={40}>Color</FormLabel>
                <HStack spacing={4}>
                  {["Red", "Green", "Yellow", "Blue"].map((color) => (
                    <Button
                      key={color}
                      size="sm"
                      onClick={(e) => setProduct({ ...product, color })}
                      variant="outline"
                      colorScheme={color.toLowerCase()}
                    >
                      {color}
                    </Button>
                  ))}
                </HStack>
              </HStack>
            </FormControl>

            {/* Product Stock */}
            <FormControl>
              <HStack>
                <FormLabel w={40}>Product Stock</FormLabel>
                <HStack>
                  <Button
                    bg="#367236"
                    color="white"
                    variant="unstyled"
                    onClick={() => setStock(stock - 1)}
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
                  >
                    <NumberInputField />
                  </NumberInput>
                  <Button
                    bg="#367236"
                    color="white"
                    variant="unstyled"
                    onClick={() => setStock(stock + 1)}
                  >
                    +
                  </Button>
                </HStack>
              </HStack>
            </FormControl>

            {/* Submit Button */}
            <Button
              color="white"
              bg="#DFA258"
              w="10%"
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

export default AddProduct;
