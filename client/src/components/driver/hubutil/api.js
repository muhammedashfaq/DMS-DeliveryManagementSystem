import { hubRequest } from "../../../Helper/interceptor/axois";

export const HubDetails = async () => {
  try {
    const response = await hubRequest({
      url: `${process.env.REACT_APP_DOMAIN}/hub/get-driverinfo-id`,
      method: "post",
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

export const transistsend = async (trackid) => {
  try {
    const response = await hubRequest({
      url: `${process.env.REACT_APP_DOMAIN}/hub/transistshipment`,
      method: "post",
      data: { trackid: trackid },
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

export const shipmentAproving = async (trackid) => {
  try {
    const response = await hubRequest({
      url: `${process.env.REACT_APP_DOMAIN}/hub/approveShipment`,
      method: "post",
      data: { trackid: trackid },
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

export const getHubJobs = async (trackid) => {
  try {
    const response = await hubRequest({
      url: `${process.env.REACT_APP_DOMAIN}/hub/getjobs`,
      method: "post",
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
