import { CONFIGS } from "../configs";
import { ServiceHttp } from "../services/api";
import { useToast } from "@chakra-ui/react";

export const useHttp = () => {
  const serviceHttp = new ServiceHttp();
  const toast = useToast();

  const handleGetRequest = async ({ path }) => {
    try {
      const result = await serviceHttp.get({
        path,
      });
      return result;
    } catch (error) {
      console.error(error?.message);
      toast({
        title: "Error",
        description: `Error! ${error?.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handlePostRequest = async ({ path, body }) => {
    try {
      const result = await serviceHttp.post({
        path,
        body,
      });

      toast({
        title: "Successful",
        description: "Created Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return result;
    } catch (error) {
      console.error(error?.message);
      toast({
        title: "Error",
        description: `Error! ${error?.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleRemoveRequest = async ({ path }) => {
    try {
      const result = await serviceHttp.remove({
        path,
      });
      toast({
        title: "Successful",
        description: "Deleted Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return result;
    } catch (error) {
      console.error(error?.message);
      toast({
        title: "Error",
        description: `Error! ${error?.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleUpdateRequest = async ({ path, body }) => {
    try {
      const result = await serviceHttp.patch({
        path,
        body,
      });
      toast({
        title: "Successful",
        description: "Updated Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return result;
    } catch (error) {
      console.error(error?.message);
      toast({
        title: "Error",
        description: `Error! ${error?.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleGetTableDataRequest = async (props) => {
    try {
      const result = await serviceHttp.getTableData({
        url: CONFIGS.baseUrl + props.path,
        pagination: true,
        page: props.page || 0,
        size: props.size || 10,
        filters: props.filter,
      });
      return result;
    } catch (error) {
      console.error(error?.message);
      toast({
        title: "Error",
        description: `Error! ${error?.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return {
    handleGetRequest,
    handlePostRequest,
    handleRemoveRequest,
    handleUpdateRequest,
    handleGetTableDataRequest,
  };
};
