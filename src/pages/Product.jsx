import React, { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Badge,
  Divider,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import SideBarSection from "../components/SideBarSection";
import { useNavigate, useParams } from "react-router-dom";
import { useHttp } from "../hooks/http";
import { getDecodeToken } from "../utilities/decodeToken";

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { handlePostRequest, handleGetRequest } = useHttp();
  const user = getDecodeToken();

  const { productId } = useParams();
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    size: [],
    color: [],
    image_url: "",
  });

  const handlePayment = async () => {
    const totalPrice = product.price * quantity;

    const payload = {
      product_id: product._id,
      user_id: user.id,
      total_price: totalPrice,
      payment_status: "PAID",
    };

    const result = await handlePostRequest({
      path: "/orders",
      body: payload,
    });

    if (result && result.data && result.data?.order?.payment_url) {
      window.open(result.data?.order?.payment_url, "_blank");
      window.history.back();
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    const payload = {
      product_id: product._id,
      user_id: user.id,
    };

    await handlePostRequest({
      path: "/cart",
      body: payload,
    });

    navigate("/cart");
  };

  const handleGetDetailProduct = async () => {
    const result = await handleGetRequest({
      path: `/products/${productId}`,
    });

    if (result?.product) {
      setProduct(result.product);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetDetailProduct();
  }, []);

  return (
    <HStack align="stretch" height="100vh" w="100%" spacing={0}>
      <SideBarSection />
      <Flex flex="1" 
        bg="white"
        align="center" justify="center" padding="5px">
        <VStack align="center" width="80%" spacing={6}>
          <HStack width="100%" justify="space-between">
            <IconButton
              icon={<FaArrowLeft />}
              aria-label="Back to Home"
              bg="#367236"
              color="white"
              _hover={{ backgroundColor: "#28521d" }}
              onClick={() => navigate("/home")}
            />
            <Text
              color="#367236"
              fontSize="3xl"
              fontWeight="medium"
              fontFamily="'Covered By Your Grace', cursive"
            >
              UltiGear!
            </Text>
          </HStack>

          <Divider borderColor="gray.300" />

          <HStack spacing={10} align="start" width="100%"
            flexDirection={{ base: "column", md: "row"}}
          >
            <Image
              src={product.image_url}
              alt="Product Image"
              boxSize={{ base: "200px", md: "300px"}}
              borderRadius="md"
              boxShadow="md"
            />

            <VStack align="start" spacing={4} width="100%">
              <Text fontWeight="bold" fontSize="2xl" color="#367236">
                Rp{product.price.toLocaleString()}
              </Text>
              <Text fontSize="lg" fontWeight="semibold">
                {product.name ?? "_"}
              </Text>
              {/* Menambahkan kategori di bawah nama produk */}
              <Text fontSize="md" color="gray.500">
                Category: {product.category ?? "_"}
              </Text>
              <Text fontSize="md" color="gray.600">
                {product?.description ?? "_"}
              </Text>

              <Divider borderColor="gray.300" />

              <HStack>
                <Text fontSize="sm" color="gray.500">
                  Stock:
                </Text>
                <Badge fontSize="sm" colorScheme="green">
                  {product.stock}
                </Badge>
              </HStack>

              <HStack spacing={4}>
                <Text fontSize="sm" color="gray.500">
                  Size:
                </Text>
                {product?.size.map((item, index) => (
                  <Text fontWeight="bold" key={index}>
                    {item}
                  </Text>
                ))}
                <Text fontSize="sm" color="gray.500">
                  Color:
                </Text>
                {product?.color.map((item) => (
                  <Badge bg="#DFA258" color="white" p={2} borderRadius="md">
                    {item}
                  </Badge>
                ))}
              </HStack>

              <HStack spacing={4}>
                <Text fontSize="sm" color="gray.500">
                  Quantity:
                </Text>
                <HStack spacing={1}>
                  <IconButton
                    icon={<FaMinus />}
                    aria-label="Decrease Quantity"
                    onClick={handleDecrement}
                    isDisabled={quantity <= 1}
                    size="lg"
                    color="#28521d"
                    bgColor="white"
                  />
                  <Text fontWeight="bold" px={2} fontSize="lg">
                    {quantity}
                  </Text>
                  <IconButton
                    icon={<FaPlus />}
                    onClick={handleIncrement}
                    size="lg"
                    color="#28521d"
                    bgColor="white"
                  />
                </HStack>
              </HStack>

              <Divider borderColor="gray.300" />

              <HStack spacing={4} width="100%" mb={20}>
                <Button
                  backgroundColor="white"
                  color="green"
                  flex="1"
                  variant="outline"
                  borderColor="#28521d"
                  _hover={{ bg: "#e8f5e9" }}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  backgroundColor="#367236"
                  color="white"
                  flex="1"
                  _hover={{ backgroundColor: "#28521d" }}
                  onClick={handlePayment}
                >
                  Buy
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </Flex>
    </HStack>
  );
};

export default Product;
