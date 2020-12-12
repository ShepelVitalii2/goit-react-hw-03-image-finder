import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from '../Searchbar';
import apiService from '../ApiService';
import ImageGallery from '../ImageGallery/ImageGallery';
import OnLoadMoreBtnClick from '../Button';
import LoaderSpinner from '../Loader/Loader';
import authContext from '../Context/Context';
import Modal from '../Modal/Modal';
// import Section from '../../Section';
// import { createContext } from 'react';

class ImageFinder extends Component {
  state = {
    pictureName: '',
    picture: null,
    currentPage: 1,
    isLoading: false,
    error: null,
    gallery: [],
    isModalOpen: false,
    selectedImgURL: '',
    selectedLowQImgUrl: '',
    handleImageClick: e => {
      if (e.target.nodeName !== 'IMG') {
        return;
      }

      e.preventDefault();
      const fullImgLink = e.target.getAttribute('data-large');
      this.setState({
        selectedImgURL: fullImgLink,
        isModalOpen: true,
      });
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.pictureName;
    const nextName = this.state.pictureName;

    if (prevName !== nextName) {
      this.fetchPictures();
    }
  }

  fetchPictures = () => {
    const { pictureName, currentPage } = this.state;

    this.setState({ isLoading: true });

    apiService(pictureName, currentPage)
      .then(images => {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.onLoadMoreBtnClick();
        this.setState({ isLoading: false });
      });
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
    // console.log(pictureName);
  };

  handleSubmit = query => {
    if (query !== this.state.pictureName) {
      this.setState({
        gallery: [],
        pictureName: query,
        currentPage: 1,
        error: null,
      });
    }
  };

  onLoadMoreBtnClick = () => {
    if (this.state.currentPage > 2) {
      const options = {
        top: null,
        behavior: 'smooth',
      };

      options.top = window.pageYOffset + document.documentElement.clientHeight;
      setTimeout(() => {
        window.scrollTo(options);
      }, 1000);
    }
  };

  hadleImageClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    e.preventDefault();

    const fullImgLink = e.target.getAttribute('data-large');
    const lowSrc = e.target.getAttribute('src');

    this.setState({
      selectedImgURL: fullImgLink,
      selectedLowQImgUrl: lowSrc,
      isModalOpen: true,
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });

    if (this.state.isModalOpen) {
      document.body.style.overflowY = 'hidden';
    }
  };

  render() {
    const {
      gallery,
      pictureName,
      handleImageClick,
      isModalOpen,
      selectedLowQImgUrl,
      selectedImgURL,
      isLoading,
    } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer />
        {isLoading && <LoaderSpinner />}

        <authContext.Provider value={handleImageClick}>
          {pictureName && <ImageGallery gallery={gallery} />}
        </authContext.Provider>

        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <img
              src={selectedLowQImgUrl}
              data-src={selectedImgURL}
              alt="fullsizeImage"
            ></img>
          </Modal>
        )}
        <div className="BtnWrapper">
          {pictureName && gallery.length > 11 && (
            <OnLoadMoreBtnClick onClick={this.fetchPictures} />
          )}
        </div>
      </div>
    );
  }
}

export default ImageFinder;
