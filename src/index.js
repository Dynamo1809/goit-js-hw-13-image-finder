'use strict';
import './sass/main';
import API from './apiService';
import LoadMoreBtn from './loadMoreBtn';
import imageCardTpl from './templates/imageCardTpl.hbs';
import { error } from '@pnotify/core';

const picturesApiService = new API();
const loadMoreBtn = new LoadMoreBtn('.load-more-btn');

const refs = {
  searchForm: document.querySelector('.search-form'),
  searchBtn: document.querySelector('.search-btn'),
  gallery: document.querySelector('.gallery')
}

refs.searchForm.addEventListener('submit',onSearch);
loadMoreBtn.btnRef.addEventListener('click', fatchAndRenderImages);

function onSearch(e) {
  e.preventDefault();
  picturesApiService.resetPage();

  picturesApiService.query = e.currentTarget.elements.query.value.trim();
  if(picturesApiService.query === '') {
    return ;
  }
  
  clearGallery();
  fatchAndRenderImages();
}

function fatchAndRenderImages() {
  picturesApiService.fetchImages()
    .then(createImagesMarkup)
    .catch(onFetchError);
}

function createImagesMarkup({hits}) {
  loadMoreBtn.disable();
  if(!hits.length) {
    error({
          text: `Not found! Try again`,
          mode: 'dark',
          sticker: false,
          width:'280px',
          delay: 500,
        });
    return;
  }else   if(!(hits.length < 12)) {
    loadMoreBtn.enable();
  }
  
  const imagesMarkup = imageCardTpl(hits);
  refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup); 
  refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function onFetchError (err) {
  console.log(err);
}