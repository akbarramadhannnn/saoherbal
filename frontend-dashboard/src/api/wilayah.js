import axios from '../lib/axiosDefault';

export const ApiGetListProvinsi = async => {
  const response = axios.get(`/wilayah/provinsi`);
  return response;
};

export const ApiGetListKabupaten = async provinsiId => {
  const response = axios.get(`/wilayah/kabupaten?provinsiId=${provinsiId}`);
  return response;
};
