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
      <HStack height="100vh" w="100vw" align="stretch">
        <SideBarAdmin />

        <Box
          p={10}
          h="100vh"
          w="100vw"
          alignContent="center"
          overflowY="scroll"
        >
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
              w="10%"
              variant="unstyled"
              onClick={handleAddProduct}
            >
              New Add
            </Button>
          </HStack>

          {/* Table Section */}
          <Table
            variant="striped"
            colorScheme="black"
            borderRadius="md"
            boxShadow="sm"
          >
            <Thead bg="teal.800">
              <Tr>
                <Th color="white">Name</Th>
                <Th color="white">Category</Th>
                <Th color="white">Description</Th>
                <Th color="white">Image</Th>
                <Th color="white">Price</Th>
                <Th color="white">Size</Th>
                <Th color="white">Color</Th>
                <Th color="white">Stock</Th>
                <Th color="white">Actions</Th>
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
                  <Td>
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
      </HStack>
    </Layout>
  );
};

export default CrudProduct;
