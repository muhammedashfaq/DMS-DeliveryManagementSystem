import { adminRequest } from "../../../Helper/interceptor/axois";

//===adddriverpage
export const getCityDetails = async () => {
  try {
    const response = await adminRequest({
      url: "https://hrlogistics.online/admin/getcitydetails",
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
      url: "https://hrlogistics.online/admin/adminReportByHub",
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
      url: "https://hrlogistics.online/admin/getAllData",
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
      url: "https://hrlogistics.online/admin/get-admininfo-id",

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
      url: "https://hrlogistics.online/admin/add_driver",

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
      url: "https://hrlogistics.online/trackshipment",

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
      url: "https://hrlogistics.online/admin/getshipmentdata",

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
      url: "https://hrlogistics.online/admin/get-useDetials",

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
      url: "https://hrlogistics.online/admin/blockuser",

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
      url: "https://hrlogistics.online/admin/unblockuser",

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
