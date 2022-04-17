import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, onClose }) => (
  <>
    {images &&
      images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li className={s.ImageGalleryItem} key={id}>
          <img
            className={s.image}
            src={webformatURL}
            alt={tags}
            onClick={() => onClose(largeImageURL, tags)}
          />
        </li>
      ))}
  </>
);

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
