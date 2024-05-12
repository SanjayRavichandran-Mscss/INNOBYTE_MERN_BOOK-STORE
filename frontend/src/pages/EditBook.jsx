import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch book details using the book ID
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        const { title, author, publishYear } = response.data 
        
        // Set the initial state of the input fields with the book data
        setTitle(title);
        setAuthor(author);
        setPublishYear(publishYear);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
        // enqueueSnackbar('An error occurred while fetching book details.', { variant: 'error' });
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, enqueueSnackbar]);

  const handleEditBook = async () => {
    const data = {
      title,
      author,
      publishYear: parseInt(publishYear, 10),
    };

    setLoading(true);

    try {
      await axios.put(`http://localhost:5555/books/${id}`, data);
      enqueueSnackbar(`Book "${title}" edited successfully`, { variant: 'success' });
      navigate('/');
    } catch (error) {
      console.error('Failed to edit book:', error);
      // enqueueSnackbar('An error occurred while editing the book.', { variant: 'error' });
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-300 m-8 hover:bg-sky-400 transition duration-300 rounded"
          onClick={handleEditBook}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default EditBook;
