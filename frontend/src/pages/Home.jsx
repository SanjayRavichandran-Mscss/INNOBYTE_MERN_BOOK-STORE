import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setbooks] = useState([]);

  useEffect(() => {
  
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setbooks(response.data.data);
        
      })
      .catch((error) => {
        console.log(error);
        
      });
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-3xl p-2 text-green-800  text-center font-serif">Student Book Store App</h1>
      <div className="flex justify-beween items-center">
        
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
        <h1 className="text-xl p-2 text-cyan-800 font-extralight">Create Books</h1>
      </div>

      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">No</th>
            <th className="border border-slate-600 rounded-md">Title</th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Author
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Publish Year
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Created At
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Updated At
            </th>
            <th className="border border-slate-600 rounded-md">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book , index) => (
            <tr key={book._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {book.title}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.author}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.publishYear}
              </td>

              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.createdAt}
              </td>

              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.updatedAt}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/books/details/${book._id}`}>
                    {/* <BsInfoCircle className="text-2xl text-green-800" /> */}
                  </Link>

                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                  
                </div>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Home;
