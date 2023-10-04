import { adminRequest } from "../../../Helper/interceptor/axois";

//===adddriverpage
export const getCityDetails = async () => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/getcitydetails`,
      method: "GET",
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

//======dashboard

export const adminreports = async (city) => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/adminReportByHub`,
      method: "POST",
      data: { city: city },
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

export const getAllDashboardData = async () => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/getAllData`,
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

//====adminHeader

export const getAdminDetails = async () => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/get-admininfo-id`,

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

export const AddHubDetails = async (formDataToSend) => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/add_driver`,

      method: "POST",
      data: formDataToSend 
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

export const trackusershipment = async (trackinput) => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/trackshipment`,

      method: "POST",
      data: { id: trackinput },
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

export const getshipmentData = async () => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/getshipmentdata`,

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

export const UserDetails = async () => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/get-useDetials`,

      method: "GET",
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

export const Blocktheuser = async (email) => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/blockuser`,

      method: "POST",

      data: { email: email },
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

export const UnBlocktheuser = async (email) => {
  try {
    const response = await adminRequest({
      url: `${process.env.REACT_APP_DOMAIN}/admin/unblockuser`,

      method: "POST",

      data: { email: email },
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
