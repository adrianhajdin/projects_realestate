import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const response = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });

  return response.data;
};
