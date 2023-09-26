import axios from "axios";
import { userRequest } from "../../../Helper/interceptor/axois";

export const signwithgoogle = async (formData) => {
  try {
    const response = await axios.post(
      "https://hrlogistics.online/googlelogin",
      formData
    );

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const logintouserhome = async (formData) => {
  try {
    const response = await axios.post(
      "https://hrlogistics.online/login ",
      formData
    );

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const trackshipmentdetails = async (trackid) => {
  try {
    const response = await userRequest({
      url: "https://hrlogistics.online/trackshipment",

      method: "POST",
      data: { id: trackid },
    });
    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const bookshipmentform = async (formdata) => {
  try {
    const response = await userRequest({
      url: "https://hrlogistics.online/bookshipment",
      method: "POST",
      data: formdata
    });
    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getlocation = async () => {
  try {
    const response = await userRequest({
      url: "https://hrlogistics.online/getLocationData",
      method: "get",
    });
    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const editUserdetails = async (input, field) => {
  try {
    const response = await userRequest({
      url: "/updateUserDetails",
      method: "POST",
      data: {
        input: input,

        field: field,
      },
    });
    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getShipmentDetails = async () => {
  try {
    const response = await userRequest({
      url: "https://hrlogistics.online/get-dataprofils",
      method: "POST",
    });
    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};



export const UpdateProfilepic = async (formdata) => {
  try {
    const response = await userRequest({
      url: "https://hrlogistics.online/updateprofileimage",
      method: "POST",
      data:formdata
    });
    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
