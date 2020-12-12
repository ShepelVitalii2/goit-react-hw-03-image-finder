import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ gallery }) {
  return (
    <ul className="ImageGallery">
      {gallery.map(image => ImageGalleryItem(image))}
    </ul>
  );
}
