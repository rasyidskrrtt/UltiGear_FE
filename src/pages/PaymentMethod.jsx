// import React, { useState } from "react";
// import {
//   VStack,
//   Flex,
//   Text,
//   Button,
//   Input,
//   RadioGroup,
//   Radio,
//   Stack,
//   IconButton,
//   Divider,
//   Box,
// } from "@chakra-ui/react";
// import { FaArrowLeft } from "react-icons/fa";
// import Swal from "sweetalert2"; 
// import { useNavigate } from "react-router-dom"; // 

// const PaymentMethode = () => {
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const navigate = useNavigate(); 

//   const handlePayment = () => {
//     if (paymentMethod && accountNumber) {
//       Swal.fire({
//         icon: "success",
//         title: "Payment Successful",
//         text: "Thank you for your payment. Your transaction has been processed successfully.",
//         confirmButtonColor: "#367236",
//       }).then(() => {
//         navigate("/home"); 
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Payment Failed",
//         text: "Please select a payment method and enter your account number.",
//         confirmButtonColor: "#367236",
//       });
//     }
//   };

//   return (
//     <VStack
//       width="100vw"
//       height="100vh"
//       justify="center"
//       align="center"
//       bg="gray.100"
//     >
//       <Box
//         width={{ base: "90%", md: "500px" }}
//         padding={6}
//         boxShadow="lg"
//         borderRadius="lg"
//         bg="white"
//       >
//         {/* Header */}
//         <Flex justifyContent="space-between" alignItems="center" mb={4}>
//           <IconButton
//             icon={<FaArrowLeft />}
//             aria-label="Back"
//             bg="#367236"
//             color="white"
//             _hover={{ backgroundColor: "#28521d" }}
//             onClick={() => navigate("/Product")} 
//           />
//           <Text
//             color="#367236"
//             fontSize="3xl"
//             fontWeight="medium"
//             fontFamily="'Covered By Your Grace', cursive"
//           >
//             Payment Method
//           </Text>
//         </Flex>

//         <Divider borderColor="gray.300" mb={6} />

//         {/* Konten di sisi kiri */}
//         <VStack spacing={6} alignItems="flex-start" width="100%">
         
//           <Box width="100%">
//             <Text fontSize="xl" fontWeight="bold" color="#28521d" mb={2}>
//               Choose Payment
//             </Text>
//             <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
//               <Stack direction="column" spacing={2}>
//                 <Radio value="Dana">Dana</Radio>
//                 <Radio value="Ovo">Ovo</Radio>
//                 <Radio value="Mandiri">Mandiri</Radio>
//               </Stack>
//             </RadioGroup>
//           </Box>

//           {/* Nomor Akun */}
//           <Box width="100%">
//             <Text fontSize="md" fontWeight="medium" color="#28521d" mb={2}>
//               Account Number
//             </Text>
//             <Input
//               placeholder="Enter your account number"
//               value={accountNumber}
//               onChange={(e) => setAccountNumber(e.target.value)}
//             />
//           </Box>

//           {/* Tombol Bayar */}
//           <Button
//             width="100%"
//             backgroundColor="#367236"
//             color="white"
//             _hover={{ backgroundColor: "#28521d" }}
//             onClick={handlePayment}
//           >
//             Pay
//           </Button>
//         </VStack>
//       </Box>
//     </VStack>
//   );
// };

// export default PaymentMethode;