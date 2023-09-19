import { adminRequest } from "../../../Helper/interceptor/axois";

//===adddriverpage
export const getCityDetails = async () => {
  try {
    const response = await adminRequest({
      url: "/admin/getcitydetails",
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
        url: "/admin/adminReportByHub",
        method: "POST",
        data: { city: city },
      })
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


      const response = await 
      adminRequest({
        url: "/admin/getAllData",
        method: "POST",
      })
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


      const response = await 
      adminRequest({
        url:"/admin/get-admininfo-id",

        method: "POST",
      })
      if (response.data.success) {
        return response;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw error;    
    }
  };
  

