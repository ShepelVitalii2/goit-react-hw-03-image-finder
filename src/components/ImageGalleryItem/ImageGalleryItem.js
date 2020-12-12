import React from 'react';
import authContext from '../Context/Context';

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  previewURL,
}) {
  return (
    <li className="ImageGalleryItem" key={`id-${id}`}>
      <authContext.Consumer>
        {hadleImageClick => (
          <img
            src={previewURL}
            data-src={webformatURL}
            alt="searchedPicture"
            data-large={largeImageURL}
            className="ImageGalleryItem-image lazyload blur-up"
            onClick={hadleImageClick}
          />
        )}
      </authContext.Consumer>
    </li>
  );
}
