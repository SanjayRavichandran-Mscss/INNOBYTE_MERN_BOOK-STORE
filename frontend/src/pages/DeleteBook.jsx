import React,{useState} from 'react'
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar, useSnackbar } from 'notistack';

export const DeleteBook = () => {
  
  const navigate = useNavigate(false);
  const { id } = useParams();
 const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () =>{
    
    axios 
        .delete(`http://localhost:5000/books/${id}`)
        .then(()=>{
          enqueueSnackbar('Book deleted successfully',{ variant:'success'})
          navigate('/');
        })
        .catch((error)=>{
          // alert('An error happened in DeleteBook. please check console');
          enqueueSnackbar('Error',{variant:'error'})
          console.log(error);
        });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>

      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
      <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>

      <button className='p-4 bg-red-600 text-white m-8 w-full'
      onClick={handleDeleteBook}>
        Yes, Delete it
      </button>

      </div>
      </div>
  )
}

export default DeleteBook;