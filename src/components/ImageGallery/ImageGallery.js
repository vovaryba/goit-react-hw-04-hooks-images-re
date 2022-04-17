import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MutatingDots } from 'react-loader-spinner';
import { animateScroll as scroll } from 'react-scroll';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Modal from 'components/Modal';
import imagesAPI from '../../services/images-api';
import s from './ImageGallery.module.css';

const URL = 'https://pixabay.com/api';
const API_KEY = '22634984-1ce924b253c51d48f10b47cfd';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

// TODO: Решить вопрос с обнулением стейта картинок при новом рендере, а так же сброс страницы до 1.

const ImageGallery = ({ request }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [modalAlt, setModalAlt] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!request) {
      return;
    }
    setStatus(Status.PENDING);

    imagesAPI
      .fetchImages(request, page, URL, API_KEY)
      .then(newImages => {
        setImages(prevImages => [...prevImages, ...newImages.hits]);
        setStatus(Status.RESOLVED);
        scrollToBottom();
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [request, page]);

  const updatePage = () => {
    setPage(prevState => prevState + 1);
  };

  //TODO: решить как вытащить большую картинку и теги в модалку не используя стейт.

  const toggleModal = (imageUrl, tags) => {
    setShowModal(!showModal);
    setModalImg(imageUrl);
    setModalAlt(tags);
  };

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  if (status === Status.IDLE) {
    return <p>Please enter the request</p>;
  }

  if (status === Status.PENDING) {
    return (
      <div className={s.loader}>
        <MutatingDots
          height="100"
          width="100"
          color="#3F51B5"
          ariaLabel="loading"
        />
      </div>
    );
  }

  if (status === Status.REJECTED) {
    return <h1>{error.message}</h1>;
  }

  if (status === Status.RESOLVED) {
    console.log(images);
    return (
      <>
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImg} alt={modalAlt} />
          </Modal>
        )}
        {images.length < 1 ? (
          <h2>No such {request}, please try another one.</h2>
        ) : (
          <div className={s.centering}>
            <ul className={s.ImageGallery}>
              <ImageGalleryItem
                images={images}
                showModal={showModal}
                onClose={toggleModal}
              />
            </ul>
            <Button onClick={updatePage} />
          </div>
        )}
      </>
    );
  }
};

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
};

export default ImageGallery;
