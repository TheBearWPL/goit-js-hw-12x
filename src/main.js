import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const loadMoreBtn = document.getElementById('load-more');

const API_KEY = '46626572-71017a8957be8250d73e50a3e';

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = document.getElementById('query').value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  clearGallery();
  page = 1;
  loadMoreBtn.classList.add('hidden');
  showLoader();

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    hideLoader();

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    displayImages(data.hits);

    if (data.hits.length < totalHits) {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    handleError();
  }
});

async function fetchImages(query, page) {
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  const response = await axios.get(URL);
  return response.data;
}

function displayImages(images) {
  gallery.insertAdjacentHTML(
    'beforeend',
    images
      .map(
        img => `
        <a href="${img.largeImageURL}" class="gallery-item">
          <img src="${img.webformatURL}" alt="${img.tags}" />
          <div class="info">
            <p>Likes: ${img.likes}</p>
            <p>Views: ${img.views}</p>
            <p>Comments: ${img.comments}</p>
            <p>Downloads: ${img.downloads}</p>
          </div>
        </a>`
      )
      .join('')
  );

  refreshLightbox();
}

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await fetchImages(query, page);
    displayImages(data.hits);

    if (page * 40 >= totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    scrollToNextBatch();
  } catch (error) {
    handleError();
  } finally {
    hideLoader();
  }
});

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function refreshLightbox() {
  const lightbox = new SimpleLightbox('.gallery-item', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

function scrollToNextBatch() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function handleError() {
  iziToast.error({
    title: 'Error',
    message: 'Something went wrong. Please try again later.',
  });
  hideLoader();
}
