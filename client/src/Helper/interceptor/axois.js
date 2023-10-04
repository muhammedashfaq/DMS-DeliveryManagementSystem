import axios from "axios";
const user = axios.create({ baseURL: process.env.REACT_APP_DOMAIN });


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



export const adminRequest = ({ ...options }) => {
  user.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "admintoken"
  )}`;

  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log("axios interceptor", error);
    return error;
  };
  return user(options).then(onSuccess).catch(onError);
};



export const hubRequest = ({ ...options }) => {
  user.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "drivertoken"
  )}`;

  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log("axios interceptor", error);
    return error;
  };
  return user(options).then(onSuccess).catch(onError);
};


