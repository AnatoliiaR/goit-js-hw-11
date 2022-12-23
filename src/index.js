// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './sass/index.scss'
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchApi } from './js/fetch';
// import NewsApi from './js/fetch';

import { renderImgsListimages } from "././template/cards";
// import cardPhoto from './template/cards.hbs'

const refs = {
    form: document.querySelector('.search-form'),
    btnLoadMore: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery')

}
let searchQuery = '';
let page = 1;
let per_page = 20;

// const newApi = new NewsApi();

refs.form.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoad);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
    scrollZoom: false,
  captions: true,
});

async function onSearch(e) {
    e.preventDefault();

    //  newApi.query = e.currentTarget.elements.searchQuery.value.trim();
    searchQuery = e.currentTarget.elements.searchQuery.value.trim();
page = 1;
    if (searchQuery.length === 0) return Notiflix.Notify.failure('Sorry, error');
     

    
    refs.gallery.innerHTML = "";

    
    await fetchApi(searchQuery, page, per_page).then(renderingCard).catch() 

    // return Notiflix.Notify.failure('Sorry we cant load pictures. Try again!');
  };
    

    



function renderingCard(data) {
    if (data.hits.length === 0) {
        refs.gallery.innerHTML = '';
        refs.btnLoadMore.classList.add('is-hidden');
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    if (data.totalHits <= per_page*page) {
        Notiflix.Notify.failure('We are sorry, but you have reached the end of search results');
        // refs.btnLoadMore.classList.remove('is-hidden');
        refs.gallery.innerHTML = '';
        refs.btnLoadMore.classList.add('is-hidden');
       
        return;
    }

    // if (data.totalHits === 0) {
    //     refs.gallery.innerHTML = '';
    //     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    //     refs.btnLoadMore.classList.add('is-hidden');
    //     //   endCollectionText.classList.add('is-hidden');
    //     return;
            
    // }
    

   
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits}images`);
        const cardsTemplate = data.hits.map(card => renderImgsListimages(card));
        refs.gallery.insertAdjacentHTML('beforeend', cardsTemplate.join(''));
        

        lightbox.refresh();

        refs.btnLoadMore.classList.remove('is-hidden');

    
    

}
    
    
    //  }
//    console.log(data.totalHits);



async function onLoad(e) {    
    page += 1;
    await fetchApi(searchQuery,page,per_page).then(renderingCard);
};
// function error(er) {
//     return Notiflix.Notify.failure('Sorry we cant load pictures. Try again!');
// }




