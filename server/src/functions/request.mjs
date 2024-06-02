import axios from "axios";

export const get = (host, path, parameters) => {
  return axios.get(host + path, { params: parameters });
};

export const post = (host, path, parameters = null, data = null) => {
  return axios.post(host + path, { params: parameters, data: data });
};
