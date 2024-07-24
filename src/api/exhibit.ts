import axios from "axios";

export const getExhibit = async (pageParam: number = 1) => {
  const response = await axios.get(
    `http://api.kcisa.kr/openapi/CNV_060/request`,
    {
      params: {
        serviceKey: process.env.NEXT_PUBLIC_API_KEY,
        numOfRows: 10,
        pageNo: pageParam,
      },
    }
  );

  return response.data;
};
