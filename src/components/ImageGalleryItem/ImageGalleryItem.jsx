import React from 'react';
import PropTypes from "prop-types";

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

ImageGalleryItem.propTypes = {
  dataItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};