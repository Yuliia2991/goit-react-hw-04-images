import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from './services/api';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error] = useState(null);
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);

  const handleFormSubmit = name => {
    if (name !== query) {
      setQuery(name);
      setPage(1);
      setImages([]);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus('pending');

    fetchImages(query, page).then(data => {
      if (data.hits.length > 0) {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setStatus('resolved');
        setTotalImages(data.totalHits);
      } else {
        toast.error(`${query} not found`);
        setStatus('idle');
      }
    });
  }, [page, query]);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {(status === 'resolved' || images.length) > 0 && (
        <ImageGallery images={images} />
      )}

      {status === 'pending' && <Loader />}

      {status === 'rejected' && <p>{error.message}</p>}

      {status === 'resolved' && totalImages > 12 && page < totalImages / 12 && (
        <Button onClick={loadMore} />
      )}

      <ToastContainer autoClose={1500} />
    </>
  );
};
