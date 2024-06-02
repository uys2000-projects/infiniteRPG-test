import axios from "axios";

export const get = (host, path, parameters) => {
  return axios.get(host + path, { params: parameters });
};

export const post = (host, path, data = null) => {
  return axios.post(host + path, data);
};
