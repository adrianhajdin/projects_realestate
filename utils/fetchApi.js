import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      // 'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY ,
      'x-rapidapi-key': '22f8a96c7dmsh1b748b2a386a8ccp1a2e9fjsnbdb85cfabb6e',

    },
  });

  return data;
}