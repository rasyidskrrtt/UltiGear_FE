import { Input } from "@chakra-ui/react";
import { useRef } from "react";
import axios from "axios";
import { CONFIGS } from "../configs";

export default function UploadImage({ onUpload }) {
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      formData.append("file", fileInputRef.current.files[0]);
      const result = await axios.post(`${CONFIGS.baseUrl}/upload`, formData);
      console.log(result.data?.data?.fileUrl);
      onUpload(result.data?.data?.fileUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Input
      type="file"
      ref={fileInputRef}
      //   onClick={() => fileInputRef.current.click()}
      onChange={handleUpload}
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
  );
}
