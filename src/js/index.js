import AxiosRequestService from './axiosRequest';
import Notiflix from "notiflix";
import Simplelightbox from 'simplelightbox'
import 'simplelightbox/dist/simple-lightbox.min.css';
import createMarkup from './createMarkup';

const searchForm = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBTN = document.querySelector('.load-more');

const searchImg = new AxiosRequestService();
const gallery = new SimpleLightbox('.gallery a', { 
    scrollZoom: false,
    captionsData: 'alt',
    captionDelay: 250,
});
 
searchForm.addEventListener('submt', onSearchImg);
loadMoreBTN.addEventListener('click', onLoadMore);

let totalHits = 0;

async function onSearchImg(event) {
    event.preventDefault();
    clearMarkup();
    const searchValue = event.currentTarget.elements.searchQuery.value.trim();

    if (!searchValue) {
        return
    }

    searchImg.query = searchValue;
    searchImg.resetPage();

    const images = await searchImg.onGetImage();

    if (images.hits.length === 0) {
        Notiflix.Notify.failure{ `Sorry, there are no images matching your search query. Please try again.` };
        return;
    }

    totalHits = images.totalHits;
    Notiflix.Notify.success(`Hooray! We found ${totalHits}totalHits images.`)
}