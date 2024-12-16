import axios from "axios";
import { CONFIGS } from "../configs";

export const getHeaders = () => {
  const token = localStorage.getItem(CONFIGS.localStorageKey) || "";
  return {
    Authorization: `Bearer ${token}`,
  };
};

export class ServiceHttp {
  constructor() {
    this.baseUrl = CONFIGS.baseUrl;
  }

  async get({ path }) {
    try {
      const result = await axios.get(this.baseUrl + path, {
        headers: {
          ...getHeaders(),
        },
      });
      return result.data.data;
    } catch (error) {
      console.log(error.response?.data?.message || error.message);

      if (error.response && error.response.status === 401) {
        localStorage.removeItem(CONFIGS.localStorageKey);
        window.location.pathname = "/";
      }

      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async post({ path, body, header }) {
    try {
      const result = await axios.post(this.baseUrl + path, body, {
        headers: {
          ...header,
          ...getHeaders(),
        },
      });
      return result.data;
    } catch (error) {
      console.log(error.response?.data?.message || error.message);

      // if (error.response && error.response.status === 401) {
      //   localStorage.removeItem(CONFIGS.localStorageKey);
      //   window.location.pathname = "/";
      // }

      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async patch({ path, body }) {
    try {
      const result = await axios.put(this.baseUrl + path, body, {
        headers: {
          ...getHeaders(),
        },
      });
      return result.data;
    } catch (error) {
      console.log(error.response?.data?.message || error.message);

      if (error.response && error.response.status === 401) {
        localStorage.removeItem(CONFIGS.localStorageKey);
        window.location.pathname = "/";
      }

      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async remove({ path }) {
    try {
      const result = await axios.delete(this.baseUrl + path, {
        headers: {
          ...getHeaders(),
        },
      });
      return result.data;
    } catch (error) {
      console.log(error.response?.data?.message || error.message);

      if (error.response && error.response.status === 401) {
        localStorage.removeItem(CONFIGS.localStorageKey);
        window.location.pathname = "/";
      }

      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async getTableData(params) {
    const { url, pagination, page, size, filters } = params;
    try {
      const queryFilter = new URLSearchParams(filters).toString();
      const result = await axios.get(
        `${url}?pagination=${pagination}&page=${page}&size=${size}&${queryFilter}`,
        {
          headers: {
            ...getHeaders(),
          },
        }
      );

      return {
        ...result.data.data,
        page: page,
        size: size,
      };
    } catch (error) {
      console.log(error.response?.data?.message || error.message);

      if (error.response && error.response.status === 401) {
        localStorage.removeItem(CONFIGS.localStorageKey);
        window.location.pathname = "/";
      }

      throw new Error(error.response?.data?.message || error.message);
    }
  }
}
