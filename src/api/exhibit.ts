import axios from "axios";

export const getExhibit = async () => {
  const response = await axios.get(
    `http://api.kcisa.kr/openapi/CNV_060/request`,
    {
      params: {
        serviceKey: process.env.API_KEY,
        numOfRows: 10,
        pageNo: 1,
      },
    }
  );

  return response.data;
};
