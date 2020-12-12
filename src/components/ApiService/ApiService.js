import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '18992222-0ffbc097a98d577b6731791a7';

const apiService = (query, currentPage) => {
  return axios
    .get(
      `${BASE_URL}?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

export default apiService;
