import axios from "../lib/axiosImage";

export const ApiUploadSingleImage = async (data) => {
  const response = await axios.post(`/upload-single-image`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const ApiGeneratePdfInvoiceTransaction = async (payload) => {
  const response = await axios.post(`/generate-pdf-invoice`, payload);
  return response;
};
