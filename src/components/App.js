import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

const App = () => {
  const [request, setRequest] = useState('');

  const handleFormSubmit = request => {
    setRequest(request);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery request={request} />
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default App;
