import { useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './SearchForm.module.css';

const SearchForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      request: '',
    },
  });
  const onSubmitForm = data => {
    onSubmit(data.request);
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className={s.form}
        autoComplete="off"
      >
        <button type="submit" className={s.button}>
          <BsSearch />
        </button>
        <input
          className={s.input}
          type="text"
          name="request"
          autoFocus
          placeholder="Search images and photos"
          {...register('request', {
            required: true,
          })}
        />
        {errors.request && toast.error('Please enter the request')}
      </form>
    </>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
