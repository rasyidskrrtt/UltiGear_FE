import { useToken } from "../hooks/token";
import { jwtDecode } from "jwt-decode";

export function getDecodeToken() {
  const { getToken } = useToken();
  const token = getToken();
  return token ? jwtDecode(token) : null;
}
