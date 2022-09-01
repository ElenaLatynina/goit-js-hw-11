import AxiosRequestService from './axiosRequest';
import Notiflix from "notiflix";
import Simplelightbox from 'simplelightbox'
import 'simplelightbox/dist/simple-lightbox.min.css';
import createMarkup from './createMarkup';

const searchForm = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBTN = document.querySelector('.load-more');

const searchImg = new AxiosRequestService();
let gallery= new SimpleLightbox('.gallery a', { 
    scrollZoom: false,
    captionsData: 'alt',
    captionDelay: 250,
});
 
searchForm.addEventListener('submt', onSearchImg);
loadMoreBTN.addEventListener('click', onPressLoadMore);

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
        Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        return;
    }

    totalHits = images.totalHits;
    Notiflix.Notify.success(`Hooray! We found ${totalHits}totalHits images.`);

    totalHits -= images.hits.length;
    const markup = createMarkup(images.hits);

    onCreateGallery(markup);
    onToggleBtn(totalHits);
    gallery.refresh();

    }
        
function clearMarkup() {
    galleryList.innerHTML = '';
}

function onCreateGallery(markup) {
    galleryList.insertAdjacentHTML('beforeend', markup)
    
}

async function onPressLoadMore() { 
    const images = await searchImg.onGetImage();
    const markup = onCreateGallery(images.hits);
    totalHits -= images.hits.length;
    onCreateGallery(markup);

    if (totalHits === 0 || totalHits < 0) {
        Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
        return;
    }

    onToggleBtn(totalHits);

    gallery.refresh();
    
}

function onToggleBtn(hitsValue) {
    if (hitsValue === 0 || hitsValue < 0) {
        loadMoreBTN.style.display = 'none';
    }
    else {
        loadMoreBTN.style.display = 'block';
    }
}