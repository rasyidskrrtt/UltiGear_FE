import {
    HStack,
    Input,
    InputGroup,
    InputRightAddon,
    Text,
  } from "@chakra-ui/react";
  import React from "react";
  import { IoSearch } from "react-icons/io5";
  
  const Search = ({ onSearch }) => {
    return (
      <HStack width="100%" justifyContent="space-between ">
        <Text
          color={"#367236"}
          fontSize="3xl"
          fontWeight="medium"
          fontFamily="'Covered By Your Grace', cursive"
        >
          UltiGear!
        </Text>
        <InputGroup width={"40%"} borderColor={"black"}>
          <Input placeholder="Search on Here" />
          <InputRightAddon bgColor={"#367236"} color={"white"}>
            {" "}
            <IoSearch />{" "}
          </InputRightAddon>
        </InputGroup>
      </HStack>
    );
  };
  
  export default Search;
  