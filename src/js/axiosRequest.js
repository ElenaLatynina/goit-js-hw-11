import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '29584253-cd90e7f8e2a20a00eedab1d09';


const parameters = {
  key: '29584253-cd90e7f8e2a20a00eedab1d09',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

export default class AxiosRequestService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }


  async onGetImage() {
    try {
      const url = `${BASE_URL}?q=${this.searchQuery}&page=${this.page}`;
      const response = await axios.get(url, { parameters });
      await this.incrementPage();
      return response.data;
    }
    catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }


  async  incrementPage(){
  this.page += 1;
  }

  async  resetPage() {
  this.page = 1;
  }
    
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  }
