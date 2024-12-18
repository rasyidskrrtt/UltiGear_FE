import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import SideBarAdmin from "../../components/SideBarAdmin";
import {
  Box,
  Button,
  HStack,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http";

const CrudProduct = () => {
  const navigate = useNavigate();
  const { handleGetTableDataRequest, handleRemoveRequest } = useHttp();

  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const [products, setProducts] = useState([]);

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

  const handleDelete = async (productId) => {
    await handleRemoveRequest({
      path: "/products/" + productId,
    });
    getTableData({ search: "" });
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleAddProduct = () => {
    navigate("/admin/products/create");
  };

  useEffect(() => {
    getTableData({ search: "" });
  }, []);

  return (
    <Layout>
      <HStack height="100vh" w="100%" align="stretch" spacing={0}
        wrap={{ base: "wrap", md: "nowrap" }}
      >
        <SideBarAdmin />

        <Box
          p={{ base: "50px 30px", md: 10 }}
          width="100%"
          overflowY="auto"
          overflowX="auto"
          height={{ base: "calc(100vh - 80px)", md: "100vh" }}
        >
          <HStack
            justifyContent="space-between"
            mb={4}
            p={4}
            px={{ base: 6, md: 10 }}
            bg="#367236"
            borderRadius="md"
            boxShadow="sm"
            wrap={{ base: "wrap", md: "nowrap" }}
            position="sticky"
            top="0"
            zIndex="1" 
          >
            <Text
              color="white"
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="sm"
              fontFamily="'Covered By Your Grace', cursive"
            >
              UltiGear!
            </Text>
            <Button
              color="white"
              bg="#DFA258"
              w={{ base: "30%", md: "20%", lg: "10%"}}
              variant="unstyled"
              onClick={handleAddProduct}
            >
              New Add
            </Button>
          </HStack>

          {/* Table Section */}
          <Box
            overflowX="auto" 
            w="100%" 
            h="100%"
            overflowY="auto"
            transform='scale(1)'
            transformOrigin="top left"
          >
          <Table
            variant="striped"
            colorScheme="black"
            borderRadius="md"
            boxShadow="sm"
          >
            <Thead bg="teal.800" position="sticky" top="0" zIndex="1">
              <Tr position="sticky" top="0" zIndex="1">
                <Th color="white" position="sticky" top="0" zIndex="1" >Name</Th>
                <Th color="white" position="sticky" top="0" zIndex="1" >Category</Th>
                <Th color="white" position="sticky" top="0" zIndex="1" >Description</Th>
                <Th color="white" position="sticky" top="0" zIndex="1" >Image</Th>
                <Th color="white" position="sticky" top="0" zIndex="1" >Price</Th>
                <Th color="white" position="sticky" top="0" zIndex="1" >Size</Th>
                <Th color="white" position="sticky" top="0" zIndex="1" >Color</Th>
                <Th color="white" position="sticky" top="0" zIndex="1" >Stock</Th>
                <Th color="white" textAlign="center" position="sticky" top="0" zIndex="1" >Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id}>
                  <Td>{product.name}</Td>
                  <Td>{product.category}</Td>
                  <Td>{product.description}</Td>
                  <Td>
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      boxSize="40px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Td>
                  <Td>{product.price}</Td>
                  <Td>{product.size}</Td>
                  <Td>{product.color}</Td>
                  <Td>{product.stock}</Td>
                  <Td textAlign="center">
                    <HStack spacing={2}>
                      <Button
                        bg="#367236"
                        color="white"
                        size="sm"
                        variant="unstyled"
                        px={4}
                        onClick={() => handleEdit(product._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        bg="#C81D20"
                        color="white"
                        size="sm"
                        variant="unstyled"
                        px={4}
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </Box>
        </Box>
      </HStack>
    </Layout>
  );
};

export default CrudProduct;
