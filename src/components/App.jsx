import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal';
import fetchImg from '../service/pixabay-api';

class App extends Component {
  state = {
    searchValue: '',
    visibility: false,
    modalImg: '',
    searchResult: null,
    totalResult: 0,
    isLoading: false,
    errorMessage: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;

    if (searchValue !== prevState.searchValue || page !== prevState.page) {
      this.fetchImageData(searchValue, page);
    }
  }

  handlerFormSubmit = (searchValue) => {
    this.setState({
      searchValue,
      page: 1,
    });
  };

  fetchImageData = (searchValue, page) => {
    this.setState({
      isLoading: true,
      errorMessage: '',
    });

    fetchImg(searchValue, page)
      .then((searchResult) => {
        if (searchResult.hits.length === 0) {
          this.setState({
            searchResult: null,
            totalResult: 0,
            errorMessage: 'Запит не знайдено',
          });
        } else {
          this.setState((prevState) => ({
            searchResult: page === 1 ? searchResult.hits : [...prevState.searchResult, ...searchResult.hits],
            totalResult: searchResult.totalHits,
          }));
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({
          searchResult: null,
          totalResult: 0,
          errorMessage: 'Помилка під час виконання запиту',
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  handlerOpenModal = (largeImg) => {
    this.setState({
      visibility: true,
      modalImg: largeImg,
    });
  };

  handlerCloseModal = () => {
    this.setState({
      visibility: false,
    });
  };

  _handlerLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { visibility, searchValue, modalImg, searchResult, totalResult, isLoading, errorMessage } = this.state;
    return (
      <>
        <Searchbar handlerFormSubmit={this.handlerFormSubmit} />
        <ImageGallery
          handlerOpenModal={this.handlerOpenModal}
          searchValue={searchValue}
          searchResult={searchResult}
          totalResult={totalResult}
          isLoading={isLoading}
          errorMessage={errorMessage}
          handlerLoadMore={this._handlerLoadMore}
        />
        {visibility && (
          <Modal
            largeImg={modalImg}
            handlerCloseModal={this.handlerCloseModal}
          />
        )}
      </>
    );
  }
}

export default App;
