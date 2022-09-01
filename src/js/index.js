import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import AxiosRequestService from './axiosRequest';
import createMarkup from './createMarkup';

const findImages = new AxiosRequestService();
const gallery = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.style.display = 'none';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let totalHits = 0;
refs.loadMoreBtn.style.display = 'none';

async function onSearch(event) {
  event.preventDefault();
  clearMarkup();
  const searchValue = event.currentTarget.elements.searchQuery.value.trim();
  if (!searchValue) {
    return;
  }

  findImages.query = searchValue;
  findImages.resetPage();
  const images = await findImages.getImage();
  if (images.hits.length === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  totalHits = images.totalHits;
  Notify.success(`Hooray! We found ${totalHits} images.`);
  totalHits -= images.hits.length;
  const markup = createMarkup(images.hits);
  addToMarkup(markup);
  toggleLoadMoreBtn(totalHits);
  gallery.refresh();
}

async function onLoadMore() {
  const images = await rfindImages.getImage();
  const markup = createMarkup(images.hits);
  totalHits -= images.hits.length;
  addToHTML(markup);

  if (totalHits === 0 || totalHits < 0) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  }

  toggleLoadMoreBtn(totalHits);
  gallery.refresh();
}

function addToMarkup(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

function toggleLoadMoreBtn(hitsValue) {
  if (hitsValue === 0 || hitsValue < 0) {
    refs.loadMoreBtn.style.display = 'none';
  } else {
    refs.loadMoreBtn.style.display = 'block';
  }
}
