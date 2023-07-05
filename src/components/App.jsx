import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

import styles from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const fetchImages = useCallback(() => {
    const API_KEY = '36713183-ab33de53433f0fab0c63f220d';
    const BASE_URL = 'https://pixabay.com/api/';
    const perPage = 12;

    setIsLoading(true);

    axios
      .get(
        `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
      .then(response => {
        setImages(prevImages => [...prevImages, ...response.data.hits]);
        setCurrentPage(prevPage => prevPage + 1);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, [currentPage, searchQuery]);

  useEffect(() => {
    if (searchQuery !== '') {
      fetchImages();
    }
  }, [searchQuery, fetchImages]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  const loadMoreImages = () => {
    fetchImages();
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={onChangeQuery} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      {images.length > 0 && !isLoading && <Button onClick={loadMoreImages} />}
    </div>
  );
};

export default App;
