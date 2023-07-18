import React from 'react';

const ImageGalleryItem = ({ dataItem, handlerOpenModal }) => {
  return (
    <li
      onClick={() => {
        handlerOpenModal(dataItem.largeImageURL);
      }}
    >
      <img key={dataItem.id} src={dataItem.webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
