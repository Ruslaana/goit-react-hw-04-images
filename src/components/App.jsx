import React, { Component } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

import styles from './App.module.css';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  // onChangeQuery = query => {
  //   this.setState({ searchQuery: query, currentPage: 1, images: [] });
  // };

  onChangeQuery = query => {
    this.setState(prevState => ({
      searchQuery: query,
      currentPage: prevState.searchQuery !== query ? 1 : prevState.currentPage,
      images: prevState.searchQuery !== query ? [] : prevState.images,
    }));
  };

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;
    const API_KEY = '36713183-ab33de53433f0fab0c63f220d';
    const BASE_URL = 'https://pixabay.com/api/';
    const perPage = 12;

    this.setState({ isLoading: true });

    axios
      .get(
        `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  openModal = largeImageURL => {
    this.setState({ showModal: true, largeImageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  loadMoreImages = () => {
    this.fetchImages();
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.loadMoreImages} />
        )}
      </div>
    );
  }
}

export default App;
