export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const res = await fetch(
       url,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPID_API_KEY ,
          },
        }
      );
      const data = await res.json();
      return data;
}