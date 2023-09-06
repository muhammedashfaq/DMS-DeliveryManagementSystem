import axios from "axios";


const user = axios.create({ baseURL: "http://localhost:3000/" });
export const userRequest = ({ ...options }) => {
  user.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;

  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log("axios interceptor", error);
    return error;
  };
  return user(options).then(onSuccess).catch(onError);
};




