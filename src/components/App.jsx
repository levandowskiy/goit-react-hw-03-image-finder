import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal';

class App extends Component {
  state = {
    searchValue: '',
    visibility: false,
    modalImg: '',
  };

  handlerFormSubmit = searchValue => {
    this.setState({
      searchValue,
    });
  };

  handlerOpenModal = largeImg => {
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

  render() {
    const {visibility, searchValue, modalImg, } = this.state;
    return (
      <>
        <Searchbar handlerFormSubmit={this.handlerFormSubmit} />
        <ImageGallery handlerOpenModal={this.handlerOpenModal} searchValue={searchValue} />
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
