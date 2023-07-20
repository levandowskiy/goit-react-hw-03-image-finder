const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36079636-80c18f2b7171bd6af90a09a2e';

const fetchImg = (searchValue, page) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    searchValue
  )}&page=${page}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    });
};

export default fetchImg;
