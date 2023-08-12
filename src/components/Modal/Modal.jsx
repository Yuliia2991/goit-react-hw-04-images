import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ src, alt, onClose }) => {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
