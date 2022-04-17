import PropTypes from 'prop-types';
import SearchForm from 'components/SearchForm';
import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => (
  <header className={s.Searchbar}>
    <SearchForm onSubmit={onSubmit} />
  </header>
);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
