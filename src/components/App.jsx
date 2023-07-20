import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal';
import fetchImg from '../service/pixabay-api'; // Підставте правильний шлях до файлу

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

  handlerFormSubmit = (searchValue) => {
    this.setState({
      searchValue,
    });

    this.fetchImageData(searchValue, 1);
  };

  fetchImageData = (searchValue, page) => {
    this.setState({
      isLoading: true,
      searchResult: null,
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
          this.setState({
            searchResult: searchResult.hits,
            totalResult: searchResult.totalHits,
          });
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

  _handlerLoadMore = async () => {
    await this.setState((prevState) => ({
      page: prevState.page + 1,
      isLoading: true,
    }));

    const { page, searchValue } = this.state;
    setTimeout(() => {
      fetchImg(searchValue, page)
        .then((searchResult) => {
          this.setState((prevState) => ({
            searchResult: [...prevState.searchResult, ...searchResult.hits],
          }));
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    }, 2000);
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
