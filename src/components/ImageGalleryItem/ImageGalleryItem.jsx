import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, onClick }) => (
  <li className={styles.ImageGalleryItem}>
    <img
      className={styles.ImageGalleryItem_image}
      src={webformatURL}
      alt=""
      onClick={onClick}
    />
  </li>
);

export default ImageGalleryItem;
