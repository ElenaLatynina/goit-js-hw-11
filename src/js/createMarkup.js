export default function createMarkup(images) {
    return images.map(image => {
        return `
        <div class="photo-card">
        <a class="photo-card_link" href="${image.largeImageURL}">
         <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /> 
        </a>
            <div class="info">
                <p class="info-item">
                <b>Likes ${images.Likes}</b>
                </p>
                <p class="info-item">
                <b>Views ${images.views}</b>
                </p>
                <p class="info-item">
                <b>Comments ${images.comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads ${images.downloads}</b>
                </p>
            </div>
        </div>
        `;
    })
        .join('');
}