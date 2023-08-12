import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ url, tags, largeImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          onClick={openModal}
          className={css.ImageGalleryItemImage}
          src={url}
          alt={tags}
        />
      </li>
      {isModalOpen && (
        <Modal src={largeImage} alt={tags} onClose={closeModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
