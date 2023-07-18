import { Component } from 'react';
import fetchImg from '../../service/pixabay-api';
import { Circles } from 'react-loader-spinner';
import Button from '../Button';
import './ImageGallery.css';
import ImageGalleryItem from '../ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    searchResult: null,
    page: 1,
    isLoading: false,
    totalResult: 0,
    errorMessage: '',
  };

  componentDidUpdate(prevProps) {
    const { searchValue } = this.props;
    const { page } = this.state;

    if (prevProps.searchValue !== searchValue) {
      this.setState({
        isLoading: true,
        searchResult: null,
        errorMessage: '',
      });

      setTimeout(() => {
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
          .finally(() => {
            this.setState({
              isLoading: false,
            });
          });
      }, 2000);
    }
  }

  _handlerLoadMore = async () => {
    await this.setState((prevState) => ({
      page: prevState.page + 1,
      isLoading: true,
    }));

    const { page } = this.state;
    const { searchValue } = this.props;

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
    const { handlerOpenModal } = this.props;
    const { searchResult, totalResult, isLoading, errorMessage } = this.state;

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
              <Button handlerLoadMore={this._handlerLoadMore} />
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

export default ImageGallery;
