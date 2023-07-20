import React, { Component } from 'react';
import { Circles } from 'react-loader-spinner';
import Button from '../Button';
import './ImageGallery.css';
import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from "prop-types";

class ImageGallery extends Component {
  render() {
    const { handlerOpenModal, searchResult, totalResult, isLoading, errorMessage, handlerLoadMore } = this.props;

    return (
      <div className="gallery-wrapper">
        <ul className="gallery">
          {searchResult &&
            searchResult.map((dataItem) => (
              <ImageGalleryItem
                key={dataItem.id}
                handlerOpenModal={handlerOpenModal}
                dataItem={dataItem}
              />
            ))}
        </ul>

        <div className="content-wrapper">
          {searchResult &&
            totalResult !== 0 &&
            !isLoading &&
            searchResult.length < totalResult && (
              <Button handlerLoadMore={handlerLoadMore} />
            )}

          {isLoading && (
            <Circles
              height="60"
              width="60"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}

          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  searchResult: PropTypes.array,
  totalResult: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  handlerOpenModal: PropTypes.func.isRequired,
  handlerLoadMore: PropTypes.func.isRequired,
};

export default ImageGallery;
