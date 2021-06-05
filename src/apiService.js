'use strict';
const API_KEY = '21948076-53f9c976759f5ce811ed96a6f';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';
const perPage = 12;

export default class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages() {
    return fetch(
      `${BASE_URL}q=${this.searchQuery}&page=${this.page}&per_page=${perPage}&key=${API_KEY}`,
    ).then(response => {
      if (response.ok) {
        this.incrementPage();
        return response.json();
      }
      throw new Error('Error fatching data');
    });

  }
  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(value) {
    this.searchQuery = value;
  }
}