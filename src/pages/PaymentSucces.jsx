// import React from "react";
// import {
//   VStack,
//   Text,
//   Button,
//   Image,
//   Flex,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

// const PaymentSucces = () => {
//   const navigate = useNavigate();

//   const handleDone = () => {
//     navigate("/home"); 
//   };

//   return (
//     <Flex
//       width="100%"
//       height="100vh"
//       justify="center"
//       align="center"
//       bg="white"
//     >
//       <VStack spacing={6} align="center">

//         <Image
//           src="/icon_success.png" 
//           alt="Success Icon"
//           boxSize="100px"
//         />
//         <Text fontSize="2xl" fontWeight="bold" color="#367236">
//           Payment Successful
//         </Text>

//         <Button
//           bg="#367236"
//           color="white"
//           _hover={{ bg: "#28521d" }}
//           onClick={handleDone}
//         >
//           Done
//         </Button>
//       </VStack>
//     </Flex>
//   );
// };

// export default PaymentSucces;