import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export const Searchbar = ({onSubmit}) => {
  const [name, setName] = useState('');

  const handleNameChange = e => {
    setName(e.currentTarget.value.toLowerCase());
  };

   const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '') {
      return toast.error("The field can't be empty");
    }

    onSubmit(name);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          name="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  ); 
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
