import { hubRequest } from "../../../Helper/interceptor/axois";

export const HubDetails = async () => {
  try {
    const response = await hubRequest({
      url: "/hub/get-driverinfo-id",
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
      url: "/hub/transistshipment",
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
      url: "/hub/approveShipment",
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
      url: "/hub/getjobs",
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
